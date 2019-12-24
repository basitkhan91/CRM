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
    [Route("api/JobType")]

    public class JobTypeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public JobTypeController(IUnitOfWork unitOfWork, ILogger<JobTitleController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }


        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<JobTypeViewModel>))]
        public IActionResult Get()
        {
            var alljobTypes = _unitOfWork.JobType.GetAllJobTypes(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<JobTypeViewModel>>(alljobTypes));

        }

        [HttpPost("jobTypepost")]

        public IActionResult CreateAction([FromBody] JobTypeViewModel jobTypeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (jobTypeViewModel == null)
                    return BadRequest($"{nameof(jobTypeViewModel)} cannot be null");

                DAL.Models.JobType jobTypeObj = new DAL.Models.JobType();
                jobTypeObj.JobTypeMemo = jobTypeViewModel.JobTypeMemo;
                jobTypeObj.JobTypeName = jobTypeViewModel.JobTypeName;
                jobTypeObj.MasterCompanyId = jobTypeViewModel.MasterCompanyId;
               
                jobTypeObj.IsActive = jobTypeViewModel.IsActive;
                jobTypeObj.CreatedDate = DateTime.Now;
                jobTypeObj.UpdatedDate = DateTime.Now;
                jobTypeObj.CreatedBy = jobTypeViewModel.CreatedBy;
                jobTypeObj.UpdatedBy = jobTypeViewModel.UpdatedBy;
                _unitOfWork.JobType.Add(jobTypeObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

       

        [HttpPut("jobTypepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] JobTypeViewModel jobTypeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (jobTypeViewModel == null)
                    return BadRequest($"{nameof(JobTypeViewModel)} cannot be null");

                var existingResult = _unitOfWork.JobType.GetSingleOrDefault(c => c.JobTypeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();

                existingResult.JobTypeMemo = jobTypeViewModel.JobTypeMemo;
                existingResult.JobTypeName = jobTypeViewModel.JobTypeName;
                existingResult.MasterCompanyId = jobTypeViewModel.MasterCompanyId;
                existingResult.IsActive = jobTypeViewModel.IsActive;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = jobTypeViewModel.UpdatedBy;
                existingResult.IsActive = jobTypeViewModel.IsActive;

                _context.JobType.Update(existingResult);
                _context.SaveChanges();

                //_unitOfWork.JobType.Update(existingResult);
                //_unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }

        [HttpDelete("jobTypepost/{id}")]
        [Produces(typeof(ActionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.JobType.GetSingleOrDefault(c => c.JobTypeId == id);

            existingResult.IsDeleted = true;

            //_unitOfWork.JobType.Update(existingResult);
            //_unitOfWork.SaveChanges();

            _context.JobType.Update(existingResult);
            _context.SaveChanges();


            return Ok(id);
        }


        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<JobTypeAudit>()
                .Find(x => x.JobTypeId == id)
                .OrderByDescending(x => x.JobTypeAuditId);

            var auditResult = new List<AuditResult<JobTypeAudit>>();

            auditResult.Add(new AuditResult<JobTypeAudit> { AreaName = "Job Type", Result = audits.ToList() });

            return Ok(auditResult);
        }

    }


}