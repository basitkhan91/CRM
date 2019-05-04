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
    public class ReasonController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ReasonController(IUnitOfWork unitOfWork, ILogger<ReasonController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ReasonViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Reasons.GetAllReasonData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<ReasonViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Reason", id); //.GetAllCustomersData();


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
        [HttpPost("reason")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ReasonViewModel reasonViewModel)
        {
            if (ModelState.IsValid)
            {
                if (reasonViewModel == null)
                    return BadRequest($"{nameof(reasonViewModel)} cannot be null");

                DAL.Models.Reason reasonobject = new DAL.Models.Reason();
                reasonobject.ReasonForRemoval = reasonViewModel.ReasonForRemoval;
                reasonobject.ReasonCode = reasonViewModel.ReasonCode;
                reasonobject.MasterCompanyId = reasonViewModel.MasterCompanyId;
                reasonobject.Memo = reasonViewModel.Memo;
                reasonobject.IsActive = reasonViewModel.IsActive;
                reasonobject.CreatedDate = DateTime.Now;
                reasonobject.UpdatedDate = DateTime.Now;
                reasonobject.CreatedBy = reasonViewModel.CreatedBy;
                reasonobject.UpdatedBy = reasonViewModel.UpdatedBy;
                _unitOfWork.Reasons.Add(reasonobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("reason/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ReasonViewModel reasonViewModel)
        {

            if (ModelState.IsValid)
            {
                if (reasonViewModel == null)
                    return BadRequest($"{nameof(reasonViewModel)} cannot be null");

                var existingResult = _unitOfWork.Reasons.GetSingleOrDefault(c => c.ReasonId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = reasonViewModel.UpdatedBy;
                existingResult.ReasonForRemoval = reasonViewModel.ReasonForRemoval;
                existingResult.ReasonCode = reasonViewModel.ReasonCode;
                existingResult.Memo = reasonViewModel.Memo;
                existingResult.IsActive = reasonViewModel.IsActive;
                existingResult.MasterCompanyId = reasonViewModel.MasterCompanyId;

                _unitOfWork.Reasons.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("reason/{id}")]
        [Produces(typeof(ReasonViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Reasons.GetSingleOrDefault(c => c.ReasonId == id);

            existingResult.IsDelete = true;
            _unitOfWork.Reasons.Update(existingResult);

            //_unitOfWork.Reasons.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }


        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ReasonAudit>()
                .Find(x => x.ReasonId == id)
                .OrderByDescending(x => x.ReasonAuditId);

            var auditResult = new List<AuditResult<ReasonAudit>>();

            auditResult.Add(new AuditResult<ReasonAudit> { AreaName = "Reason", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }




}



  