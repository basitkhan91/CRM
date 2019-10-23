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
    public class PriorityController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public PriorityController(IUnitOfWork unitOfWork, ILogger<StageCodeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<PriorityViewModel>))]
        public IActionResult Get()
        {
            var allGatecodeinfo = _unitOfWork.Priority.GetPriorities(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<PriorityViewModel>>(allGatecodeinfo));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Priority", id); //.GetAllCustomersData();


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

        [HttpPost("priority")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] PriorityViewModel priorityViewModel)
        {
            if (ModelState.IsValid)
            {
                if (priorityViewModel == null)
                    return BadRequest($"{nameof(priorityViewModel)} cannot be null");

                DAL.Models.Priority priorityobject = new DAL.Models.Priority();
                priorityobject.Description = priorityViewModel.Description;
                priorityobject.MasterCompanyId = 1;
                priorityobject.IsActive = priorityViewModel.IsActive;
                priorityobject.IsDelete = priorityViewModel.IsDelete;
                priorityobject.Memo = priorityViewModel.Memo;
                priorityobject.CreatedDate = DateTime.Now;
                priorityobject.UpdatedDate = DateTime.Now;
                priorityobject.CreatedBy = priorityViewModel.CreatedBy;
                priorityobject.UpdatedBy = priorityViewModel.UpdatedBy;
                _unitOfWork.Priority.Add(priorityobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("priority/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] PriorityViewModel priorityViewModel)
        {

            if (ModelState.IsValid)
            {
                if (priorityViewModel == null)
                    return BadRequest($"{nameof(priorityViewModel)} cannot be null");

                var existingResult = _unitOfWork.Priority.GetSingleOrDefault(c => c.PriorityId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = priorityViewModel.UpdatedBy;
                existingResult.Description = priorityViewModel.Description;
                existingResult.Memo = priorityViewModel.Memo;
                existingResult.IsActive = priorityViewModel.IsActive;
                existingResult.MasterCompanyId = priorityViewModel.MasterCompanyId;

                _unitOfWork.Priority.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("priority/{id}")]
        [Produces(typeof(PriorityViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Priority.GetSingleOrDefault(c => c.PriorityId == id);
            existingResult.IsDelete =true;
            _unitOfWork.Priority.Update(existingResult);
            //_unitOfWork.Priority.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<PriorityAudit>()
                .Find(x => x.PriorityId == id)
                .OrderByDescending(x => x.PriorityAuditId);

            var auditResult = new List<AuditResult<PriorityAudit>>();

            auditResult.Add(new AuditResult<PriorityAudit> { AreaName = "priority", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpGet("priorityhistory")]
        public IActionResult GetPriorityHistory(long priorityId)
        {
            var reult = _unitOfWork.Priority.GetPriorityHistory(priorityId);
            return Ok(reult);
        }


    }




}