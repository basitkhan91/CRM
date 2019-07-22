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
    public class VendorClassificationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public VendorClassificationController(IUnitOfWork unitOfWork, ILogger<VendorClassificationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<VendorClassificationViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.VendorClassifications.GetAllVendorClassificationData(); //.GetAllCustomersData();
            try
            {
                var resul1 = Mapper.Map<IEnumerable<VendorClassificationViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }
        [HttpGet("GetActive")]
        [Produces(typeof(List<VendorClassificationViewModel>))]
        public IActionResult GetActive()
        {
            var result = _unitOfWork.VendorClassifications.GetAllActiveVendorClassificationData(); //.GetAllCustomersData();
            try
            {
                var resul1 = Mapper.Map<IEnumerable<VendorClassificationViewModel>>(result);

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("VendorClassification", id); //.GetAllCustomersData();


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
        [HttpPost("vendorclassification")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] VendorClassificationViewModel vendorClassificationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (vendorClassificationViewModel == null)
                    return BadRequest($"{nameof(vendorClassificationViewModel)} cannot be null");

                DAL.Models.VendorClassification vendorClassificationobject = new DAL.Models.VendorClassification();
                vendorClassificationobject.ClassificationName = vendorClassificationViewModel.ClassificationName;
                vendorClassificationobject.MasterCompanyId = vendorClassificationViewModel.MasterCompanyId;
                vendorClassificationobject.Memo = vendorClassificationViewModel.Memo;
                vendorClassificationobject.IsActive = vendorClassificationViewModel.IsActive;
                vendorClassificationobject.CreatedDate = DateTime.Now;
                vendorClassificationobject.UpdatedDate = DateTime.Now;
                vendorClassificationobject.CreatedBy = vendorClassificationViewModel.CreatedBy;
                vendorClassificationobject.UpdatedBy = vendorClassificationViewModel.UpdatedBy;
                _unitOfWork.VendorClassifications.Add(vendorClassificationobject);
                _unitOfWork.SaveChanges();
                return Ok(vendorClassificationobject);

            }

            return Ok(ModelState);
        }

        [HttpPut("vendorclassification/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] VendorClassificationViewModel vendorClassificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (vendorClassificationViewModel == null)
                    return BadRequest($"{nameof(vendorClassificationViewModel)} cannot be null");

                var existingResult = _unitOfWork.VendorClassifications.GetSingleOrDefault(c => c.VendorClassificationId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = vendorClassificationViewModel.UpdatedBy;
                existingResult.Memo = vendorClassificationViewModel.Memo;
                existingResult.ClassificationName = vendorClassificationViewModel.ClassificationName;
                existingResult.IsActive = vendorClassificationViewModel.IsActive;
                existingResult.MasterCompanyId = vendorClassificationViewModel.MasterCompanyId;

                _unitOfWork.VendorClassifications.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("vendorclassification/{id}")]
        [Produces(typeof(VendorClassificationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.VendorClassifications.GetSingleOrDefault(c => c.VendorClassificationId == id);
            existingResult.IsDelete = true;
            _unitOfWork.VendorClassifications.Update(existingResult);
            //_unitOfWork.VendorClassifications.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }


        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<VendorClassificationAudit>()
                .Find(x => x.VendorClassificationId == id)
                .OrderByDescending(x => x.VendorClassificationAuditId);

            var auditResult = new List<AuditResult<VendorClassificationAudit>>();

            auditResult.Add(new AuditResult<VendorClassificationAudit> { AreaName = "Vendor Classification", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }

}


