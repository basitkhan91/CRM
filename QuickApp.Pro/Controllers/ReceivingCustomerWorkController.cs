using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class ReceivingCustomerWorkController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public ReceivingCustomerWorkController(IUnitOfWork unitOfWork, ILogger<ReceivingCustomerWorkController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.receivingCustomerWork.GetAllreceivingCustomerWork(); //.GetAllCustomersData();

            try
            {
                var resul1 = Mapper.Map<IEnumerable<ReceivingCustomerWorkViewModel>>(result);

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
            var result = _unitOfWork.AuditHistory.GetAllHistory("ReceivingCustomerWork", id); //.GetAllCustomersData();


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


        [HttpPost("receivingCustomerWork")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ReceivingCustomerWorkViewModel receivingCustomerWorkViewModel)
        {
            if (ModelState.IsValid)
            {
                if (receivingCustomerWorkViewModel == null)
                    return BadRequest($"{nameof(receivingCustomerWorkViewModel)} cannot be null");
                DAL.Models.ReceivingCustomerWork curreobj = new DAL.Models.ReceivingCustomerWork();
                curreobj.MasterCompanyId = 1;
                curreobj.CustomerId = receivingCustomerWorkViewModel.CustomerId;
                //curreobj.PartId = receivingCustomerWorkViewModel.PartId; ;
                curreobj.EmployeeId = receivingCustomerWorkViewModel.EmployeeId;
                curreobj.Quantity = receivingCustomerWorkViewModel.Quantity;
                curreobj.CustomerReference = receivingCustomerWorkViewModel.CustomerReference;
                curreobj.CustomerContactId = receivingCustomerWorkViewModel.CustomerContactId;
                curreobj.ChangePartNumber = receivingCustomerWorkViewModel.ChangePartNumber;
                curreobj.PartCertificationNumber = receivingCustomerWorkViewModel.PartCertificationNumber;
                curreobj.IsSerialized = receivingCustomerWorkViewModel.IsSerialized;
                curreobj.SerialNumber = receivingCustomerWorkViewModel.SerialNumber;
                curreobj.ConditionCodeId = receivingCustomerWorkViewModel.ConditionCodeId;
                curreobj.WarehouseId = receivingCustomerWorkViewModel.WarehouseId;
                curreobj.MasterCompanyId = receivingCustomerWorkViewModel.MasterCompanyId;
                curreobj.Owner = receivingCustomerWorkViewModel.Owner;
                curreobj.IsCustomerStock = receivingCustomerWorkViewModel.IsCustomerStock;
                curreobj.ExpirationDate = receivingCustomerWorkViewModel.ExpirationDate;
                curreobj.TagDate = receivingCustomerWorkViewModel.TagDate;
                curreobj.TagType = receivingCustomerWorkViewModel.TagType;
                curreobj.ReasonForRemoval = receivingCustomerWorkViewModel.ReasonForRemoval;
                curreobj.ObtainFrom = receivingCustomerWorkViewModel.ObtainFrom;
                curreobj.ManufacturingTrace = receivingCustomerWorkViewModel.ManufacturingTrace;
                curreobj.ManufacturingLotNumber = receivingCustomerWorkViewModel.ManufacturingLotNumber;
                curreobj.ManufacturerLotNumber = receivingCustomerWorkViewModel.ManufacturerLotNumber;
                curreobj.TimeLife = receivingCustomerWorkViewModel.TimeLife;
                curreobj.LocationId = receivingCustomerWorkViewModel.LocationId;
                curreobj.SiteId = receivingCustomerWorkViewModel.SiteId;
                curreobj.ShelfId = receivingCustomerWorkViewModel.ShelfId;
                curreobj.BinId = receivingCustomerWorkViewModel.BinId;
                curreobj.IsExpirationDate = receivingCustomerWorkViewModel.IsExpirationDate;
                curreobj.PartNumber = receivingCustomerWorkViewModel.PartNumber;
                curreobj.ObtainFromCustomerId = receivingCustomerWorkViewModel.ObtainFromCustomerId;
                curreobj.ObtainFromVendorId = receivingCustomerWorkViewModel.ObtainFromVendorId;
                curreobj.ObtainFromOther = receivingCustomerWorkViewModel.ObtainFromOther;
                curreobj.MasterCompanyId = 1;
                curreobj.IsActive = receivingCustomerWorkViewModel.IsActive;
                curreobj.CreatedDate = DateTime.Now;
                curreobj.UpdatedDate = DateTime.Now;
                curreobj.CreatedBy = receivingCustomerWorkViewModel.CreatedBy;
                curreobj.UpdatedBy = receivingCustomerWorkViewModel.UpdatedBy;
              
                if (receivingCustomerWorkViewModel.CustomerContactId == null)
                {
                    curreobj.CustomerContactId = null;
                }
                if (receivingCustomerWorkViewModel.EmployeeId == null)
                {
                    curreobj.EmployeeId = null;
                }
                if (receivingCustomerWorkViewModel.StatusId == null)
                {

                    curreobj.StatusId = null;
                }
                if (receivingCustomerWorkViewModel.CustomerId == null)
                {

                    curreobj.CustomerId = null;
                }
                if (receivingCustomerWorkViewModel.CustomerClassificationId == null)
                {

                    curreobj.CustomerClassificationId = null;
                }
                if (receivingCustomerWorkViewModel.ScopeId == null)
                {

                    curreobj.ScopeId = null;
                }
                if (receivingCustomerWorkViewModel.PriorityId == null)
                {

                    curreobj.PriorityId = null;
                }
                if (receivingCustomerWorkViewModel.ConditionCodeId == null)
                {

                    curreobj.ConditionCodeId = null;
                }
                if (receivingCustomerWorkViewModel.WarehouseId == null)
                {

                    curreobj.WarehouseId = null;
                }
                if (receivingCustomerWorkViewModel.LocationId == null)
                {

                    curreobj.LocationId = null;
                }
                if (receivingCustomerWorkViewModel.TraceableToCustomerId == null)
                {

                    curreobj.TraceableToCustomerId = null;
                }
                if (receivingCustomerWorkViewModel.TraceableToVendorId == null)
                {

                    curreobj.TraceableToVendorId = null;
                }
                if (receivingCustomerWorkViewModel.CompanyId == null)
                {

                    curreobj.CompanyId = null;
                }
                if (receivingCustomerWorkViewModel.BusinessUnitId == null)
                {

                    curreobj.BusinessUnitId = null;
                }
                if (receivingCustomerWorkViewModel.DivisionId == null)
                {

                    curreobj.DivisionId = null;
                }
                if (receivingCustomerWorkViewModel.DepartmentId == null)
                {

                    curreobj.DepartmentId = null;
                }
                //if (receivingCustomerWorkViewModel.MasterCompanyId == null)
                //{

                //    curreobj.MasterCompanyId = null;
                //}

                _unitOfWork.receivingCustomerWork.Add(curreobj);
                _unitOfWork.SaveChanges();
                //var exists = _context.ReceivingCustomerWork.Where(a => a.ReceivingCustomerWorkId == curreobj.ReceivingCustomerWorkId).SingleOrDefault();
                //exists.ReceivingCustomerNumber = "REC" + curreobj.ReceivingCustomerWorkId;
                //_context.ReceivingCustomerWork.Update(exists);
                //_context.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("UpdatereceivingCustomerWork/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ReceivingCustomerWorkViewModel receivingCustomerWorkViewModel)
        {

            if (ModelState.IsValid)
            {
                if (receivingCustomerWorkViewModel == null)
                    return BadRequest($"{nameof(receivingCustomerWorkViewModel)} cannot be null");
                DAL.Models.ReceivingCustomerWork curreobj = new DAL.Models.ReceivingCustomerWork();
                curreobj.MasterCompanyId = 1;
                curreobj.CustomerId = receivingCustomerWorkViewModel.CustomerId;
                //curreobj.PartId = receivingCustomerWorkViewModel.PartId; ;
                curreobj.EmployeeId = receivingCustomerWorkViewModel.EmployeeId;
                curreobj.Quantity = receivingCustomerWorkViewModel.Quantity;
                curreobj.CustomerReference = receivingCustomerWorkViewModel.CustomerReference;
                curreobj.CustomerContactId = receivingCustomerWorkViewModel.CustomerContactId;
                curreobj.ChangePartNumber = receivingCustomerWorkViewModel.ChangePartNumber;
                curreobj.PartCertificationNumber = receivingCustomerWorkViewModel.PartCertificationNumber;
                curreobj.IsSerialized = receivingCustomerWorkViewModel.IsSerialized;
                curreobj.SerialNumber = receivingCustomerWorkViewModel.SerialNumber;
                curreobj.ConditionCodeId = receivingCustomerWorkViewModel.ConditionCodeId;
                curreobj.WarehouseId = receivingCustomerWorkViewModel.WarehouseId;
                curreobj.MasterCompanyId = receivingCustomerWorkViewModel.MasterCompanyId;
                curreobj.Owner = receivingCustomerWorkViewModel.Owner;
                curreobj.IsCustomerStock = receivingCustomerWorkViewModel.IsCustomerStock;
                curreobj.ExpirationDate = receivingCustomerWorkViewModel.ExpirationDate;
                curreobj.TagDate = receivingCustomerWorkViewModel.TagDate;
                curreobj.TagType = receivingCustomerWorkViewModel.TagType;
                curreobj.ReasonForRemoval = receivingCustomerWorkViewModel.ReasonForRemoval;
                curreobj.ObtainFrom = receivingCustomerWorkViewModel.ObtainFrom;
                curreobj.ManufacturingTrace = receivingCustomerWorkViewModel.ManufacturingTrace;
                curreobj.ManufacturingLotNumber = receivingCustomerWorkViewModel.ManufacturingLotNumber;
                curreobj.ManufacturerLotNumber = receivingCustomerWorkViewModel.ManufacturerLotNumber;
                curreobj.TimeLife = receivingCustomerWorkViewModel.TimeLife;
                curreobj.LocationId = receivingCustomerWorkViewModel.LocationId;
                curreobj.SiteId = receivingCustomerWorkViewModel.SiteId;
                curreobj.ShelfId = receivingCustomerWorkViewModel.ShelfId;
                curreobj.BinId = receivingCustomerWorkViewModel.BinId;
                curreobj.IsExpirationDate = receivingCustomerWorkViewModel.IsExpirationDate;
                curreobj.PartNumber = receivingCustomerWorkViewModel.PartNumber;
                curreobj.ObtainFromCustomerId = receivingCustomerWorkViewModel.ObtainFromCustomerId;
                curreobj.ObtainFromVendorId = receivingCustomerWorkViewModel.ObtainFromVendorId;
                curreobj.ObtainFromOther = receivingCustomerWorkViewModel.ObtainFromOther;
                curreobj.MasterCompanyId = 1;
                curreobj.IsActive = receivingCustomerWorkViewModel.IsActive;
                curreobj.CreatedDate = DateTime.Now;
                curreobj.UpdatedDate = DateTime.Now;
                curreobj.CreatedBy = receivingCustomerWorkViewModel.CreatedBy;
                curreobj.UpdatedBy = receivingCustomerWorkViewModel.UpdatedBy;
                if (receivingCustomerWorkViewModel.CustomerContactId == null)
                {
                    curreobj.CustomerContactId = null;
                }
                if (receivingCustomerWorkViewModel.EmployeeId == null)
                {
                    curreobj.EmployeeId = null;
                }
                if (receivingCustomerWorkViewModel.StatusId == null)
                {

                    curreobj.StatusId = null;
                }
                if (receivingCustomerWorkViewModel.CustomerId == null)
                {

                    curreobj.CustomerId = null;
                }
                if (receivingCustomerWorkViewModel.CustomerClassificationId == null)
                {

                    curreobj.CustomerClassificationId = null;
                }
                if (receivingCustomerWorkViewModel.ScopeId == null)
                {

                    curreobj.ScopeId = null;
                }
                if (receivingCustomerWorkViewModel.PriorityId == null)
                {

                    curreobj.PriorityId = null;
                }
                if (receivingCustomerWorkViewModel.ConditionCodeId == null)
                {

                    curreobj.ConditionCodeId = null;
                }
                if (receivingCustomerWorkViewModel.WarehouseId == null)
                {

                    curreobj.WarehouseId = null;
                }
                if (receivingCustomerWorkViewModel.LocationId == null)
                {

                    curreobj.LocationId = null;
                }
                if (receivingCustomerWorkViewModel.TraceableToCustomerId == null)
                {

                    curreobj.TraceableToCustomerId = null;
                }
                if (receivingCustomerWorkViewModel.TraceableToVendorId == null)
                {

                    curreobj.TraceableToVendorId = null;
                }
                if (receivingCustomerWorkViewModel.CompanyId == null)
                {

                    curreobj.CompanyId = null;
                }
                if (receivingCustomerWorkViewModel.BusinessUnitId == null)
                {

                    curreobj.BusinessUnitId = null;
                }
                if (receivingCustomerWorkViewModel.DivisionId == null)
                {

                    curreobj.DivisionId = null;
                }
                if (receivingCustomerWorkViewModel.DepartmentId == null)
                {

                    curreobj.DepartmentId = null;
                }
                //if (receivingCustomerWorkViewModel.MasterCompanyId == null)
                //{

                //    curreobj.MasterCompanyId = null;
                //}

                _unitOfWork.receivingCustomerWork.Add(curreobj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpDelete("deletereceivingCustomerWork/{id}")]
        [Produces(typeof(ReceivingCustomerWorkViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.receivingCustomerWork.GetSingleOrDefault(c => c.ReceivingCustomerWorkId == id);

            existingResult.IsDelete = true;
            _unitOfWork.receivingCustomerWork.Update(existingResult);

            //_unitOfWork.JobTitle.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }
    }
   
}
