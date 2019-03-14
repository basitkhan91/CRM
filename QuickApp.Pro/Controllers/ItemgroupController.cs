
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
namespace QuickApp.Pro.Controllers
{


    [Route("api/[controller]")]
    public class ItemgroupController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public ItemgroupController(IUnitOfWork unitOfWork, ILogger<ItemgroupController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ItemgroupViewModel>))]
        public IActionResult Get()
        {
            var allitemgroupinfo = _unitOfWork.Itemgroup.GetItemgroups(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ItemgroupViewModel>>(allitemgroupinfo));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ItemGroup", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("itemgrouppost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ItemgroupViewModel itemgroupViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemgroupViewModel == null)
                    return BadRequest($"{nameof(itemgroupViewModel)} cannot be null");

                DAL.Models.Itemgroup itemgroupobject = new DAL.Models.Itemgroup();
                itemgroupobject.ItemGroupCode = itemgroupViewModel.ItemGroupCode;
                itemgroupobject.Description = itemgroupViewModel.Description;
                itemgroupobject.MasterCompanyId = itemgroupViewModel.MasterCompanyId;
                itemgroupobject.Memo = itemgroupViewModel.Memo;
                itemgroupobject.IsActive = itemgroupViewModel.IsActive;
                itemgroupobject.CreatedDate = DateTime.Now;
                itemgroupobject.UpdatedDate = DateTime.Now;
                itemgroupobject.CreatedBy = itemgroupViewModel.CreatedBy;
                itemgroupobject.UpdatedBy = itemgroupViewModel.UpdatedBy;
                _unitOfWork.Itemgroup.Add(itemgroupobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("itemgrouppost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ItemgroupViewModel itemgroupViewModel)
        {

            if (ModelState.IsValid)
            {
                if (itemgroupViewModel == null)
                    return BadRequest($"{nameof(itemgroupViewModel)} cannot be null");
                var existingResult = _unitOfWork.Itemgroup.GetSingleOrDefault(c => c.ItemGroupId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = itemgroupViewModel.UpdatedBy;
                existingResult.ItemGroupCode = itemgroupViewModel.ItemGroupCode;
                existingResult.Memo = itemgroupViewModel.Memo;
                existingResult.Description = itemgroupViewModel.Description;
                existingResult.IsActive = itemgroupViewModel.IsActive;
                existingResult.MasterCompanyId = itemgroupViewModel.MasterCompanyId;
                _unitOfWork.Itemgroup.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("itemgrouppost/{id}")]
        [Produces(typeof(ItemgroupViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Itemgroup.GetSingleOrDefault(c => c.ItemGroupId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Itemgroup.Update(existingResult);

            //_unitOfWork.Itemgroup.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }
    }
}