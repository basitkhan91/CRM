using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
                throw ex;
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
                throw ex;
            }
        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("VendorClassification", id);
            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);
                return Ok(resul1);
            }
            catch (Exception ex)
            {
                throw ex;
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
                vendorClassificationobject.IsDeleted = vendorClassificationViewModel.IsDeleted;
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
            Console.WriteLine("Hi");
            if (ModelState.IsValid)
            {
                if (vendorClassificationViewModel == null)
                    return BadRequest($"{nameof(vendorClassificationViewModel)} cannot be null");

                var existingResult = _unitOfWork.VendorClassifications.GetSingleOrDefault(c => c.VendorClassificationId == id);
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
            existingResult.IsDeleted = true;
            _unitOfWork.VendorClassifications.Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            try
            {
                var result = _unitOfWork.VendorClassifications.GetVendorClassificationAuditDetails(id);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(VendorClassificationSPModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);//FirstCharToUpper(property.Name);
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            dynamicGridData.ColumnData = _unitOfWork.VendorClassifications.GetAll().Where(u => u.IsDeleted == false);
            dynamicGridData.TotalRecords = dynamicGridData.ColumnData.Count();


            return Ok(dynamicGridData);
        }
    }

}


