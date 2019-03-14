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
    public class ItemClassificationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public ItemClassificationController(IUnitOfWork unitOfWork, ILogger<ItemClassificationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ItemClassifcationViewModel>))]
        public IActionResult Get()
        {
            var allitemclassinfo = _unitOfWork.ItemClassification.getItemClassification(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ItemClassifcationViewModel>>(allitemclassinfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ItemClassification", id); //.GetAllCustomersData();


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


        [HttpPost("itemclasspost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ItemClassifcationViewModel itemclassificationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemclassificationViewModel == null)
                    return BadRequest($"{nameof(itemclassificationViewModel)} cannot be null");

                DAL.Models.ItemClassfication itemclassificationobject = new DAL.Models.ItemClassfication();
                itemclassificationobject.Description = itemclassificationViewModel.Description;
                itemclassificationobject.ItemClassificationCode = itemclassificationViewModel.ItemClassificationCode;
                itemclassificationobject.ItemType = itemclassificationViewModel.ItemType;
                itemclassificationobject.MasterCompanyId = itemclassificationViewModel.MasterCompanyId;
                itemclassificationobject.Memo = itemclassificationViewModel.Memo;
                itemclassificationobject.IsActive = itemclassificationViewModel.IsActive;
                itemclassificationobject.CreatedDate = DateTime.Now;
                itemclassificationobject.UpdatedDate = DateTime.Now;
                itemclassificationobject.CreatedBy = itemclassificationViewModel.CreatedBy;
                itemclassificationobject.UpdatedBy = itemclassificationViewModel.UpdatedBy;
                _unitOfWork.ItemClassification.Add(itemclassificationobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
       
        [HttpPut("itemclasspost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ItemClassifcationViewModel itemclassificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (itemclassificationViewModel == null)
                    return BadRequest($"{nameof(itemclassificationViewModel)} cannot be null");
                var existingResult = _unitOfWork.ItemClassification.GetSingleOrDefault(c => c.ItemClassificationId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = itemclassificationViewModel.UpdatedBy;
                existingResult.ItemClassificationCode = itemclassificationViewModel.ItemClassificationCode;
                existingResult.Description = itemclassificationViewModel.Description;
                existingResult.Memo = itemclassificationViewModel.Memo;
                existingResult.ItemType = itemclassificationViewModel.ItemType;
                existingResult.IsActive = itemclassificationViewModel.IsActive;
                existingResult.MasterCompanyId = itemclassificationViewModel.MasterCompanyId;
                _unitOfWork.ItemClassification.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("itemclasspost/{id}")]
        [Produces(typeof(ItemClassifcationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ItemClassification.GetSingleOrDefault(c => c.ItemClassificationId == id);

            existingResult.IsDelete = true;
            _unitOfWork.ItemClassification.Update(existingResult);
            //_unitOfWork.ItemClassification.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }
    }
}