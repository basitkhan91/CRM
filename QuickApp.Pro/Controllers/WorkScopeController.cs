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
    public class WorkScopeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public WorkScopeController(IUnitOfWork unitOfWork, ILogger<WorkScopeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<WorkScopeViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.WorkScope.GetAllWorkScopeData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<WorkScopeViewModel>>(result);

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("WorkScope", id); //.GetAllCustomersData();


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
        [HttpPost("workscope")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] WorkScopeViewModel workscopeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (workscopeViewModel == null)
                    return BadRequest($"{nameof(workscopeViewModel)} cannot be null");

                DAL.Models.WorkScope workscopeobject = new DAL.Models.WorkScope();
                workscopeobject.Description = workscopeViewModel.Description;
                workscopeobject.WorkScopeCode = workscopeViewModel.WorkScopeCode;
                workscopeobject.Memo = workscopeViewModel.Memo;
                workscopeobject.MasterCompanyId = workscopeViewModel.MasterCompanyId;
                workscopeobject.IsActive = workscopeViewModel.IsActive;
                workscopeobject.CreatedDate = DateTime.Now;
                workscopeobject.UpdatedDate = DateTime.Now;
                workscopeobject.CreatedBy = workscopeViewModel.CreatedBy;
                workscopeobject.UpdatedBy = workscopeViewModel.UpdatedBy;
                _unitOfWork.WorkScope.Add(workscopeobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("workscope/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] WorkScopeViewModel workscopeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (workscopeViewModel == null)
                    return BadRequest($"{nameof(workscopeViewModel)} cannot be null");

                var existingResult = _unitOfWork.WorkScope.GetSingleOrDefault(c => c.WorkScopeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = workscopeViewModel.UpdatedBy;
                existingResult.Description = workscopeViewModel.Description;
                existingResult.WorkScopeCode = workscopeViewModel.WorkScopeCode;
                existingResult.Memo = workscopeViewModel.Memo;
                existingResult.IsActive = workscopeViewModel.IsActive;
                existingResult.MasterCompanyId = workscopeViewModel.MasterCompanyId;

                _unitOfWork.WorkScope.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("workscope/{id}")]
        [Produces(typeof(WorkScopeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.WorkScope.GetSingleOrDefault(c => c.WorkScopeId == id);

            existingResult.IsDelete = true;
            _unitOfWork.WorkScope.Update(existingResult);

            //_unitOfWork.WorkScope.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }


        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<WorkScopeAudit>()
                .Find(x => x.WorkScopeId == id)
                .OrderByDescending(x => x.WorkScopeAuditId);

            var auditResult = new List<AuditResult<WorkScopeAudit>>();

            auditResult.Add(new AuditResult<WorkScopeAudit> { AreaName = "WorkScope Status", Result = audits.ToList() });

            return Ok(auditResult);
        }

    }




}
