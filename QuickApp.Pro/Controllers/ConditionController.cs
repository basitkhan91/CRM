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
    public class ConditionController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ConditionController(IUnitOfWork unitOfWork, ILogger<ConditionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<ConditionViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Conditions.GetAllConditionData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<ConditionViewModel>>(result);

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("Condition", id); //.GetAllCustomersData();


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
        [HttpPost("ConditionPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ConditionViewModel conditionViewModel)
        {
            if (ModelState.IsValid)
            {
                if (conditionViewModel == null)
                    return BadRequest($"{nameof(conditionViewModel)} cannot be null");
                Condition conditionObj = new Condition();
                conditionObj.Description = conditionViewModel.Description;
                conditionObj.MasterCompanyId = conditionViewModel.MasterCompanyId;
                conditionObj.IsActive = conditionViewModel.IsActive;
                conditionObj.Memo = conditionViewModel.Memo;
                conditionObj.CreatedDate = DateTime.Now;
                conditionObj.UpdatedDate = DateTime.Now;
                conditionObj.CreatedBy = conditionViewModel.CreatedBy;
                conditionObj.UpdatedBy = conditionViewModel.UpdatedBy;
                _unitOfWork.Conditions.Add(conditionObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("ConditionPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ConditionViewModel conditionViewModel)
        {

            if (ModelState.IsValid)
            {
                if (conditionViewModel == null)
                    return BadRequest($"{nameof(conditionViewModel)} cannot be null");

                var existingResult = _unitOfWork.Conditions.GetSingleOrDefault(c => c.ConditionId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = conditionViewModel.UpdatedBy;
                existingResult.Description = conditionViewModel.Description;
                existingResult.IsActive = conditionViewModel.IsActive;
                existingResult.Memo = conditionViewModel.Memo;
                existingResult.MasterCompanyId = conditionViewModel.MasterCompanyId;

                _unitOfWork.Conditions.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("ConditionPost/{id}")]
        [Produces(typeof(ConditionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Conditions.GetSingleOrDefault(c => c.ConditionId == id);

             existingResult.IsDelete = true;
            _unitOfWork.Conditions.Update(existingResult);

            //_unitOfWork.Conditions.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }
        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ConditionAudit>()
                .Find(x => x.ConditionId == id)
                .OrderByDescending(x => x.ConditionAuditId);

            var auditResult = new List<AuditResult<ConditionAudit>>();

            auditResult.Add(new AuditResult<ConditionAudit> { AreaName = "Condition", Result = audits.ToList() });

            return Ok(auditResult);
        }


    }


}
