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
    public class ActionAttributeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public ActionAttributeController(IUnitOfWork unitOfWork, ILogger<ActionAttributeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<ActionAttributeViewModel>))]
        public IActionResult Get()
        {
            var allActionattributes = _unitOfWork.ActionAttribute.GetActionAttributes(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ActionAttributeViewModel>>(allActionattributes));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ActionAttribute", id); //.GetAllCustomersData();


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

        [HttpPost("actionsattributepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ActionAttributeViewModel actionAttributeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (actionAttributeViewModel == null)
                    return BadRequest($"{nameof(actionAttributeViewModel)} cannot be null");

                DAL.Models.ActionAttribute actionattributeobject = new DAL.Models.ActionAttribute();
                actionattributeobject.Description = actionAttributeViewModel.Description;
                actionattributeobject.Memo = actionAttributeViewModel.Memo;
                actionattributeobject.MasterCompanyId = actionAttributeViewModel.MasterCompanyId;
                actionattributeobject.IsActive = actionAttributeViewModel.IsActive;
                actionattributeobject.IsDelete = false;
                actionattributeobject.CreatedDate = DateTime.Now;
                actionattributeobject.UpdatedDate = DateTime.Now;
                actionattributeobject.CreatedBy = actionAttributeViewModel.CreatedBy;
                actionattributeobject.UpdatedBy = actionAttributeViewModel.UpdatedBy;
                _unitOfWork.ActionAttribute.Add(actionattributeobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("actionsattributepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ActionAttributeViewModel actionAttributeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (actionAttributeViewModel == null)
                    return BadRequest($"{nameof(actionAttributeViewModel)} cannot be null");

                var existingResult = _unitOfWork.ActionAttribute.GetSingleOrDefault(c => c.ActionAttributeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = actionAttributeViewModel.UpdatedBy;
                existingResult.Memo = actionAttributeViewModel.Memo;
                existingResult.Description = actionAttributeViewModel.Description;
                existingResult.IsActive = actionAttributeViewModel.IsActive;
                existingResult.MasterCompanyId = actionAttributeViewModel.MasterCompanyId;

                _unitOfWork.ActionAttribute.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("actionsattributepost/{id}")]
        [Produces(typeof(ActionAttributeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ActionAttribute.GetSingleOrDefault(c => c.ActionAttributeId == id);
            existingResult.IsDelete = true;
            _unitOfWork.ActionAttribute.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult GetActionAttributeAuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ActionAttributeAudit>()
                  .Find(X => X.ActionAttributeId == id)
                  .OrderByDescending(X => X.ActionAttributeAuditId)
                  .ToList();

            var auditResult = new List<AuditResult<ActionAttributeAudit>>();
            auditResult.Add(
                new AuditResult<ActionAttributeAudit>
                {
                    AreaName = "Action Attribute",
                    Memo = "Action Attribute",
                    Result = audits
                });
            return Ok(auditResult);
        }

    }
}