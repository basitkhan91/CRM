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

    [Route("api/Action")]
    public class ActionController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        
        public ActionController(IUnitOfWork unitOfWork, ILogger<ActionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ActionViewModel>))]
        public IActionResult Get()
        {
            var allActions = _unitOfWork.Actions.GetAllActionData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ActionViewModel>>(allActions));

        }

        [HttpGet("auditHistoryById/{id}", Name = "GetAuditHostoryById")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Action", id); //.GetAllCustomersData();


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

        [HttpPost("actions")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ActionViewModel actionViewModel)
        {
            if (ModelState.IsValid)
            {
                if (actionViewModel == null)
                    return BadRequest($"{nameof(actionViewModel)} cannot be null");

                DAL.Models.Action actionobject = new DAL.Models.Action();
                actionobject.Description = actionViewModel.Description;
                actionobject.Memo = actionViewModel.Memo;
                actionobject.MasterCompanyId = actionViewModel.MasterCompanyId;
                actionobject.IsActive = actionViewModel.IsActive;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = actionViewModel.CreatedBy;
                actionobject.UpdatedBy = actionViewModel.UpdatedBy;
                _unitOfWork.Actions.Add(actionobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("actions/{id}")]
        public IActionResult UpdateAction(long id,[FromBody] ActionViewModel actionViewModel)
        {

            if (ModelState.IsValid)
            {
                if (actionViewModel == null)
                    return BadRequest($"{nameof(actionViewModel)} cannot be null");

                var existingResult = _unitOfWork.Actions.GetSingleOrDefault(c => c.ActionId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = actionViewModel.UpdatedBy;
                existingResult.Memo = actionViewModel.Memo;
                existingResult.Description = actionViewModel.Description;
                existingResult.IsActive = actionViewModel.IsActive;
                existingResult.MasterCompanyId = actionViewModel.MasterCompanyId;

                _unitOfWork.Actions.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
             

            return Ok(ModelState);
        }


        [HttpDelete("actions/{id}")]
        [Produces(typeof(ActionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Actions.GetSingleOrDefault(c => c.ActionId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Actions.Update(existingResult);

            //_unitOfWork.Actions.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ActionAudit>()
                .Find(X => X.ActionId == id)
                .OrderByDescending(X => X.ActionAuditId)
                .ToList();

            var auditResult = new List<AuditResult<ActionAudit>>();
            auditResult
                .Add(new AuditResult<ActionAudit> { AreaName = "Action", Memo = "Memo", Result = audits });

            return Ok(auditResult);

        }

    }




}