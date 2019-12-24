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
    public class EmployeeExpertiseController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public EmployeeExpertiseController(IUnitOfWork unitOfWork, ILogger<EmployeeExpertiseController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<EmployeeExpertiseViewModel>))]
        public IActionResult Get()
        {
            var allEmployeeExpertiseinfo = _unitOfWork.EmployeeExpertise.getAllEmployeeExpertiseInfo(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<EmployeeExpertiseViewModel>>(allEmployeeExpertiseinfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("EmployeeExpertise", id); //.GetAllCustomersData();


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
        [HttpPost("EmployeeExpertiseepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] EmployeeExpertiseViewModel employeeexpertiseViewModel)
        {
            if (ModelState.IsValid)
            {
                if (employeeexpertiseViewModel == null)
                    return BadRequest($"{nameof(employeeexpertiseViewModel)} cannot be null");
                DAL.Models.EmployeeExpertise employeeexpertiseobject = new DAL.Models.EmployeeExpertise();
                employeeexpertiseobject.Description = employeeexpertiseViewModel.Description;
                employeeexpertiseobject.MasterCompanyId = employeeexpertiseViewModel.MasterCompanyId;
                employeeexpertiseobject.IsActive = employeeexpertiseViewModel.IsActive;
				employeeexpertiseobject.IsDelete = false;
                employeeexpertiseobject.Memo = employeeexpertiseViewModel.Memo;
                employeeexpertiseobject.CreatedDate = DateTime.Now;
                employeeexpertiseobject.UpdatedDate = DateTime.Now;
                employeeexpertiseobject.CreatedBy = employeeexpertiseViewModel.CreatedBy;
                employeeexpertiseobject.UpdatedBy = employeeexpertiseViewModel.UpdatedBy;
                _unitOfWork.EmployeeExpertise.Add(employeeexpertiseobject);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }
        [HttpPut("EmployeeExpertiseepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] EmployeeExpertiseViewModel EmployeeExpertiseViewModel)
        {

            if (ModelState.IsValid)
            {
                if (EmployeeExpertiseViewModel == null)
                    return BadRequest($"{nameof(EmployeeExpertiseViewModel)} cannot be null");
                var existingResult = _unitOfWork.EmployeeExpertise.GetSingleOrDefault(c => c.EmployeeExpertiseId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = EmployeeExpertiseViewModel.UpdatedBy;
                existingResult.Description = EmployeeExpertiseViewModel.Description;
                existingResult.Memo = EmployeeExpertiseViewModel.Memo;
                existingResult.IsActive = EmployeeExpertiseViewModel.IsActive;
				existingResult.IsDelete = EmployeeExpertiseViewModel.IsDelete;
				existingResult.MasterCompanyId = EmployeeExpertiseViewModel.MasterCompanyId;
               _unitOfWork.EmployeeExpertise.Update(existingResult);
               _unitOfWork.SaveChanges();

            }
           return Ok(ModelState);
        }
        [HttpDelete("EmployeeExpertiseepost/{id}")]
        [Produces(typeof(EmployeeExpertiseViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.EmployeeExpertise.GetSingleOrDefault(c => c.EmployeeExpertiseId == id);

            existingResult.IsDelete = true;
            _unitOfWork.EmployeeExpertise.Update(existingResult);
            //_unitOfWork.EmployeeExpertise.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<EmployeeExpertiseAudit>()
                .Find(x => x.EmployeeExpertiseId == id)
                .OrderByDescending(x => x.EmployeeExpertiseAuditId);

            var auditResult = new List<AuditResult<EmployeeExpertiseAudit>>();

            auditResult.Add(new AuditResult<EmployeeExpertiseAudit> { AreaName = "Employee Expertise", Result = audits.ToList() });

            return Ok(auditResult);
        }


        [HttpPost("uploaduomcustomdata")]
        public IActionResult EmployeeExpertiseCustomData()
        {
            var result = _unitOfWork.EmployeeExpertise.UploadEmployeeExpertiseCustomData(Request.Form.Files[0]);
            return Ok(result);
        }

    }
}
