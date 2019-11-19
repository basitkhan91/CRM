using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class ATASubChapter2Controller : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public ATASubChapter2Controller(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ATASubChapter2ViewModel>))]
        public IActionResult Get()
        {
            //var result = _unitOfWork.ATASubChapter2s.GetAllATAMainnData(); //.GetAllCustomersData();
            var result = _context.ATASubChapter2.Where(a => a.IsDelete == false).OrderByDescending(c => c.ATASubChapter2Id).ToList();
            return Ok(result);

            //try
            //{
            //    var resul1 = Mapper.Map<IEnumerable<ATASubChapter2ViewModel>>(result);

            //    return Ok(resul1);
            //}
            //catch (Exception ex)
            //{

            //    throw;
            //}



        }

        [HttpGet("ataauditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ATAMain", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }



        }

        [HttpPost("actions")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ATASubChapter2ViewModel ataSubChapter2ViewModel)
        {
            if (ModelState.IsValid)
            {
                if (ataSubChapter2ViewModel == null)
                    return BadRequest($"{nameof(ataSubChapter2ViewModel)} cannot be null");

                DAL.Models.ATASubChapter2 ataSubChapter2object = new DAL.Models.ATASubChapter2();
                //ataMainobject.ATAChapterCategory = ataSubChapter1ViewModel.ATAChapterCategory;
                //ataMainobject.ATAChapterName = ataSubChapter1ViewModel.ATAChapterName;
                ataSubChapter2object.Memo = ataSubChapter2ViewModel.Memo;
                ataSubChapter2object.MasterCompanyId = ataSubChapter2ViewModel.MasterCompanyId;
                ataSubChapter2object.IsActive = ataSubChapter2ViewModel.IsActive;
                ataSubChapter2object.CreatedDate = DateTime.Now;
                ataSubChapter2object.UpdatedDate = DateTime.Now;
                ataSubChapter2object.CreatedBy = ataSubChapter2ViewModel.CreatedBy;
                ataSubChapter2object.UpdatedBy = ataSubChapter2ViewModel.UpdatedBy;
                _unitOfWork.ATASubChapter2s.Add(ataSubChapter2object);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("actions/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ATASubChapter2ViewModel ataSubChapter2ViewModel)
        {

            if (ModelState.IsValid)
            {
                if (ataSubChapter2ViewModel == null)
                    return BadRequest($"{nameof(ataSubChapter2ViewModel)} cannot be null");

                var existingResult = _unitOfWork.ATASubChapter2s.GetSingleOrDefault(c => c.ATASubChapter2Id == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = ataSubChapter2ViewModel.UpdatedBy;
                //existingResult.ATAChapterName = ataSubChapter1ViewModel.ATAChapterName;
                existingResult.Memo = ataSubChapter2ViewModel.Memo;
                //existingResult.ATAChapterCategory = ataSubChapter1ViewModel.ATAChapterCategory;
                existingResult.IsActive = ataSubChapter2ViewModel.IsActive;
                existingResult.MasterCompanyId = ataSubChapter2ViewModel.MasterCompanyId;

                _unitOfWork.ATASubChapter2s.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("actions/{id}")]
        [Produces(typeof(ATASubChapter2ViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ATASubChapter2s.GetSingleOrDefault(c => c.ATASubChapter2Id == id);
            existingResult.IsDelete = true;
            _unitOfWork.ATASubChapter2s.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

    }
}
