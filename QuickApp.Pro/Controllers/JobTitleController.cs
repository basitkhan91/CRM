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

    [Route("api/JobTitle")]
    public class JobTitleController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        private readonly ApplicationDbContext _context;

        public JobTitleController(IUnitOfWork unitOfWork, ILogger<JobTitleController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<JobTitleViewModel>))]
        public IActionResult Get()
        {
            var alljobTitles = _unitOfWork.JobTitle.GetAllJobTitles(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<JobTitleViewModel>>(alljobTitles));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("JobTitle", id); //.GetAllCustomersData();


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



        //}

        [HttpPost("jobTitlepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] JobTitleViewModel jobTitleViewModel)
        {
            if (ModelState.IsValid)
            {
                if (jobTitleViewModel == null)
                    return BadRequest($"{nameof(jobTitleViewModel)} cannot be null");

                DAL.Models.JobTitle jobTitleObj = new DAL.Models.JobTitle();
                jobTitleObj.Description = jobTitleViewModel.Description;
                jobTitleObj.MasterCompanyId = jobTitleViewModel.MasterCompanyId;
                jobTitleObj.IsActive = jobTitleViewModel.IsActive;
                jobTitleObj.IsDeleted = false;
                jobTitleObj.Memo = jobTitleViewModel.Memo;
                jobTitleObj.CreatedDate = DateTime.Now;
                jobTitleObj.UpdatedDate = DateTime.Now;
                jobTitleObj.CreatedBy = jobTitleViewModel.CreatedBy;
                jobTitleObj.UpdatedBy = jobTitleViewModel.UpdatedBy;
                _unitOfWork.JobTitle.Add(jobTitleObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("jobTitlepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] JobTitleViewModel jobTitleViewModel)
        {

            if (ModelState.IsValid)
            {
                if (jobTitleViewModel == null)
                    return BadRequest($"{nameof(jobTitleViewModel)} cannot be null");

                var existingResult = _unitOfWork.JobTitle.GetSingleOrDefault(c => c.JobTitleId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = jobTitleViewModel.UpdatedBy;
                existingResult.Description = jobTitleViewModel.Description;
                existingResult.IsActive = jobTitleViewModel.IsActive;
                existingResult.Memo = jobTitleViewModel.Memo;
                existingResult.MasterCompanyId = jobTitleViewModel.MasterCompanyId;

                //_unitOfWork.JobTitle.Update(existingResult);
                //_unitOfWork.SaveChanges();
                _context.JobTitle.Update(existingResult);
                _context.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("jobTitlepost/{id}")]
        [Produces(typeof(ActionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.JobTitle.GetSingleOrDefault(c => c.JobTitleId == id);

            existingResult.IsDeleted = true;
            //_unitOfWork.JobTitle.Update(existingResult);

            //_unitOfWork.JobTitle.Remove(existingResult);

            //_unitOfWork.SaveChanges();

            _context.JobTitle.Update(existingResult);
            _context.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<JobTitleAudit>()
                .Find(x => x.JobTitleId == id)
                .OrderByDescending(x => x.JobTitleAuditId);

            var auditResult = new List<AuditResult<JobTitleAudit>>();

            auditResult.Add(new AuditResult<JobTitleAudit> { AreaName = "Job title", Result = audits.ToList() });

            return Ok(auditResult);
        }



    }




}