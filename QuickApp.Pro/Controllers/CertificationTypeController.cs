using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using QuickApp.Pro.ViewModels;
using DAL.Models;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CertificationTypeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public CertificationTypeController(IUnitOfWork unitOfWork, ILogger<CertificationTypeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<EmployeeLicenseTypeViewModel>))]
        public IActionResult Get()
        {
            var GetAllCertificationTypeData = _unitOfWork.employeeLicenseType.GetEmployeeLicenseType();
            return Ok(Mapper.Map<IEnumerable<EmployeeLicenseTypeViewModel>>(GetAllCertificationTypeData));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GLAccountClass", id);

            try
            {
                var resul1 = Mapper.Map<IEnumerable<EmployeeLicenseTypeViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("certificationtypepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] EmployeeLicenseTypeViewModel employeeLicenseTypeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (employeeLicenseTypeViewModel == null)
                    return BadRequest($"{nameof(employeeLicenseTypeViewModel)} cannot be null");

                DAL.Models.EmployeeLicenseType glaccountclassobject = new DAL.Models.EmployeeLicenseType();
                glaccountclassobject.EmployeeLicenseTypeId = employeeLicenseTypeViewModel.EmployeeLicenseTypeId;
                glaccountclassobject.Description = employeeLicenseTypeViewModel.Description;
                glaccountclassobject.MasterCompanyId = employeeLicenseTypeViewModel.MasterCompanyId;
                glaccountclassobject.IsActive = true;
                glaccountclassobject.CreatedDate = DateTime.Now;
                glaccountclassobject.UpdatedDate = DateTime.Now;
                glaccountclassobject.CreatedBy = employeeLicenseTypeViewModel.CreatedBy;
                glaccountclassobject.UpdatedBy = employeeLicenseTypeViewModel.UpdatedBy;
                _unitOfWork.employeeLicenseType.Add(glaccountclassobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("certificationtypepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] EmployeeLicenseTypeViewModel employeeLicenseTypeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (employeeLicenseTypeViewModel == null)
                    return BadRequest($"{nameof(employeeLicenseTypeViewModel)} cannot be null");

                var existingResult = _unitOfWork.employeeLicenseType.GetSingleOrDefault(c => c.EmployeeLicenseTypeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = employeeLicenseTypeViewModel.UpdatedBy;
                existingResult.EmployeeLicenseTypeId = employeeLicenseTypeViewModel.EmployeeLicenseTypeId;
                existingResult.Description = employeeLicenseTypeViewModel.Description;
                existingResult.IsActive = employeeLicenseTypeViewModel.IsActive;
                existingResult.MasterCompanyId = employeeLicenseTypeViewModel.MasterCompanyId;

                _unitOfWork.employeeLicenseType.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("certificationtypepost/{id}")]
        [Produces(typeof(EmployeeLicenseTypeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.employeeLicenseType.GetSingleOrDefault(c => c.EmployeeLicenseTypeId == id);
            existingResult.IsDelete = true;
            _unitOfWork.employeeLicenseType.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<EmployeeLicenseTypeAudit>()
                .Find(x => x.EmployeeLicenseTypeId == id)
                .OrderByDescending(x => x.EmployeeLicenseTypeAuditId);

            var auditResult = new List<AuditResult<EmployeeLicenseTypeAudit>>();

            auditResult.Add(new AuditResult<EmployeeLicenseTypeAudit> { AreaName = "Employee licenece Status", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }
    
}
