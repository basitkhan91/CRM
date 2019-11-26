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
    public class ProvisionController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ProvisionController(IUnitOfWork unitOfWork, ILogger<ProvisionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ProvisionViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Provisions.GetAllProvisionData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<ProvisionViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Provision", id); //.GetAllCustomersData();


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
        [HttpPost("Provision")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ProvisionViewModel provisionViewModel)
        {
            if (ModelState.IsValid)
            {
                if (provisionViewModel == null)
                    return BadRequest($"{nameof(provisionViewModel)} cannot be null");

                DAL.Models.Provision provisionobject = new DAL.Models.Provision();
                provisionobject.Description = provisionViewModel.Description;
                provisionobject.MasterCompanyId = provisionViewModel.MasterCompanyId;
                provisionobject.Memo = provisionViewModel.Memo;
                provisionobject.IsActive = provisionViewModel.IsActive;
                provisionobject.CreatedDate = DateTime.Now;
                provisionobject.UpdatedDate = DateTime.Now;
                provisionobject.CreatedBy = provisionViewModel.CreatedBy;
                provisionobject.UpdatedBy = provisionViewModel.UpdatedBy;
                
                _unitOfWork.Provisions.Add(provisionobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("Provision/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ProvisionViewModel provisionViewModel)
        {

            if (ModelState.IsValid)
            {
                if (provisionViewModel == null)
                    return BadRequest($"{nameof(provisionViewModel)} cannot be null");

                var existingResult = _unitOfWork.Provisions.GetSingleOrDefault(c => c.ProvisionId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = provisionViewModel.UpdatedBy;
                existingResult.Description = provisionViewModel.Description;
                existingResult.Memo = provisionViewModel.Memo;
                existingResult.IsActive = provisionViewModel.IsActive;
                existingResult.MasterCompanyId = provisionViewModel.MasterCompanyId;

                _unitOfWork.Provisions.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("Provision/{id}")]
        [Produces(typeof(ProvisionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Provisions.GetSingleOrDefault(c => c.ProvisionId == id);

            existingResult.IsDelete = true;
            _unitOfWork.Provisions.Update(existingResult);

            //_unitOfWork.Provisions.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ProvisionAudit>()
                .Find(x => x.ProvisionId == id)
                .OrderByDescending(x => x.ProvisionAuditId);

            var auditResult = new List<AuditResult<ProvisionAudit>>();

            auditResult.Add(new AuditResult<ProvisionAudit> { AreaName = "provision", Result = audits.ToList() });

            return Ok(auditResult);
            
        }

        [HttpGet("provisionhistory")]
        public IActionResult GetProvisionHistory(long provisionId)
        {
            var reult = _unitOfWork.Provisions.GetProvisionHistory(provisionId);
            return Ok(reult);
        }

        [HttpPost("uploadProvisionCustomdata")]
        public IActionResult uploadProvisionCustomdata()
        {
            _unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("DepreciationConvention"), Request.Form.Files[0]);
            return Ok();
        }

    }




}


  