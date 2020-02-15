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
        public class IntegrationController : Controller
        {
            private IUnitOfWork _unitOfWork;
            readonly ILogger _logger;
            readonly IEmailer _emailer;
            private const string GetActionByIdActionName = "GetActionById";

            public IntegrationController(IUnitOfWork unitOfWork, ILogger<IntegrationController> logger, IEmailer emailer)
            {
                _unitOfWork = unitOfWork;
                _logger = logger;
                _emailer = emailer;
            }

            // GET: api/values
            [HttpGet("Get")]
            [Produces(typeof(List<IntegrationViewModel>))]
            public IActionResult Get(int id)
            {
                var allIntegrationinfo = _unitOfWork.Integration.getIntegrationData(id); //.GetAllCustomersData();
               return Ok(allIntegrationinfo);

            }
        [HttpGet("GetAll")]
        [Produces(typeof(List<IntegrationViewModel>))]
        public IActionResult GetAll()
        {
            var allIntegrationinfo = _unitOfWork.Integration.getIntegrationAllData(); //.GetAllCustomersData();
            return Ok(allIntegrationinfo);

        }
        /// <summary>
        /// Method that gets basic info namely id and name only
        /// </summary>
        /// <returns>List with basic info</returns>
        [HttpGet("basic")]
        [Produces(typeof(List<IntegrationBaseViewModel>))]
        public IActionResult GetBasicList()
        {
            var basicIntegrationList = _unitOfWork.Integration.GetIntegrationLite();
            var mappedList = Mapper.Map<IEnumerable<IntegrationBaseViewModel>>(basicIntegrationList);
            return Ok(mappedList);
        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<IntegrationPortalAudit>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            //var result = _unitOfWork.AuditHistory.GetAllHistory("IntegrationPortal", id); //.GetAllCustomersData();


            try
            {
                var result = _unitOfWork.Integration.GetIntegrationPortalAuditDetails(id);
                return Ok(result);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }
        [HttpPost("IntegrationPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] IntegrationViewModel integrationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (integrationViewModel == null)
                    return BadRequest($"{nameof(integrationViewModel)} cannot be null");

                DAL.Models.IntegrationPortal integrationobj = new DAL.Models.IntegrationPortal();
                integrationobj.Description = integrationViewModel.Description;
                integrationobj.PortalUrl = integrationViewModel.PortalUrl;
                integrationobj.Memo = integrationViewModel.Memo;
                integrationobj.IsActive = integrationViewModel.IsActive;
                integrationobj.IsDeleted = false;
                integrationobj.CreatedDate = DateTime.Now;
                integrationobj.UpdatedDate = DateTime.Now;
                integrationobj.CreatedBy = integrationViewModel.CreatedBy;
                integrationobj.UpdatedBy = integrationViewModel.UpdatedBy;
                integrationobj.MasterCompanyId = integrationViewModel.MasterCompanyId;
                _unitOfWork.Integration.Add(integrationobj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("IntegrationPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] IntegrationViewModel integrationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (integrationViewModel == null)
                    return BadRequest($"{nameof(IntegrationViewModel)} cannot be null");
                var existingResult = _unitOfWork.Integration.GetSingleOrDefault(c => c.IntegrationPortalId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = integrationViewModel.UpdatedBy;
                existingResult.Description = integrationViewModel.Description;
                existingResult.Memo = integrationViewModel.Memo;
                existingResult.PortalUrl = integrationViewModel.PortalUrl;
                existingResult.IsActive = integrationViewModel.IsActive;
               _unitOfWork.Integration.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("IntegrationPost/{id}")]
        [Produces(typeof(IntegrationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Integration.GetSingleOrDefault(c => c.IntegrationPortalId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Integration.Update(existingResult);

            //_unitOfWork.Integration.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<IntegrationPortalAudit>()
                .Find(x => x.IntegrationPortalId == id)
                .OrderByDescending(x => x.IntegrationPortalAuditId);

            var auditResult = new List<AuditResult<IntegrationPortalAudit>>();

            auditResult.Add(new AuditResult<IntegrationPortalAudit> { AreaName = "Integration Portal", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("UploadIntegrationCustomData")]
        public IActionResult UploadIntegrationCustomData()
        {

            _unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("Integration"), Request.Form.Files[0]);
            return Ok();
        }

    }
}

