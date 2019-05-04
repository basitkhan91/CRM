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
    public class ChargeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ChargeController(IUnitOfWork unitOfWork, ILogger<ChargeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<ChargeViewModel>))]
        public IActionResult Get()
        {
           


            try
            {
                var result = _unitOfWork.Charge.GetAllChargeData();
               

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetCurrency")]
        [Produces(typeof(List<ChargeViewModel>))]
        public IActionResult getCurrencyData()
        {
            try
            {
                var result = _unitOfWork.Charge.getCurrencyData(); 
               

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetPurchaseOrder")]
        [Produces(typeof(List<ChargeViewModel>))]
        public IActionResult getPurchaseOrderNumbers()
        {
            try
            {
                var result = _unitOfWork.Charge.getPurchaseOrderNumbers(); 


                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetVendorNames")]
        [Produces(typeof(List<ChargeViewModel>))]
        public IActionResult getVendorNmaes()
        {
            try
            {
                var result = _unitOfWork.Charge.getVendorNmaes(); 


                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("GetIntegrationPortalNames")]
        [Produces(typeof(List<ChargeViewModel>))]
        public IActionResult IntegrationPortal()
        {
            try
            {
                var result = _unitOfWork.Charge.IntegrationPortal(); 


                return Ok(result);
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
            var result = _unitOfWork.AuditHistory.GetAllHistory("Charge", id); //.GetAllCustomersData();


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

        [HttpPost("ChargePost")]
        
        public IActionResult CreateAction([FromBody] ChargeViewModel chargeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (chargeViewModel == null)
                    return BadRequest($"{nameof(chargeViewModel)} cannot be null");

                DAL.Models.Charge curreobj = new DAL.Models.Charge();
                curreobj.ChargeName = chargeViewModel.ChargeName;
                curreobj.Cost = chargeViewModel.Cost;
                curreobj.Description = chargeViewModel.Description;
                curreobj.BillableAmount = chargeViewModel.BillableAmount;
                curreobj.CurrencyId = chargeViewModel.CurrencyId;
                curreobj.GeneralLedgerId = chargeViewModel.GeneralLedgerId;
                curreobj.IntegrationPortalId = chargeViewModel.IntegrationPortalId;
                curreobj.PurchaseOrderId = chargeViewModel.PurchaseOrderId;
                curreobj.Quantity = chargeViewModel.Quantity;
                curreobj.VendorId = chargeViewModel.VendorId;
                curreobj.ManagementStructureId = chargeViewModel.ManagementStructureId;
                curreobj.Memo = chargeViewModel.Memo;
                curreobj.IsActive = chargeViewModel.IsActive;
                curreobj.MarkUp = chargeViewModel.MarkUp; 
                curreobj.CreatedDate = DateTime.Now;
                curreobj.UpdatedDate = DateTime.Now;
                curreobj.CreatedBy = chargeViewModel.CreatedBy;
                curreobj.UpdatedBy = chargeViewModel.UpdatedBy;
                curreobj.MasterCompanyId = 1;
                _unitOfWork.Charge.Add(curreobj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("ChargePost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ChargeViewModel chargeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (chargeViewModel == null)
                    return BadRequest($"{nameof(chargeViewModel)} cannot be null");

                var existingResult = _unitOfWork.Charge.GetSingleOrDefault(c => c.ChargeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = chargeViewModel.UpdatedBy;
                existingResult.ChargeName = chargeViewModel.ChargeName;
                existingResult.Cost = chargeViewModel.Cost;
                existingResult.BillableAmount = chargeViewModel.BillableAmount;
                existingResult.CurrencyId = chargeViewModel.CurrencyId;
                existingResult.Description = chargeViewModel.Description;
                existingResult.FunctionalCurrencyId = chargeViewModel.FunctionalCurrencyId;
                existingResult.CurrencyId = chargeViewModel.CurrencyId;
                existingResult.GeneralLedgerId = chargeViewModel.GeneralLedgerId;
                existingResult.IntegrationPortalId = chargeViewModel.IntegrationPortalId;
                existingResult.PurchaseOrderId = chargeViewModel.PurchaseOrderId;
                existingResult.Quantity = chargeViewModel.Quantity;
                existingResult.VendorId = chargeViewModel.VendorId;
                existingResult.Memo = chargeViewModel.Memo;
                existingResult.MarkUp = chargeViewModel.MarkUp;
                existingResult.IsActive = chargeViewModel.IsActive;
                existingResult.ManagementStructureId = chargeViewModel.ManagementStructureId;

                _unitOfWork.Charge.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("ChargePost/{id}")]
        [Produces(typeof(ChargeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Charge.GetSingleOrDefault(c => c.ChargeId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Charge.Update(existingResult);

            //_unitOfWork.Charge.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ChargeAudit>()
                .Find(x => x.ChargeId == id)
                .OrderByDescending(x => x.ChargeAuditId);

            var auditResult = new List<AuditResult<ChargeAudit>>();

            auditResult.Add(new AuditResult<ChargeAudit> { AreaName = "Charge Audit", Result = audits.ToList() });

            return Ok(auditResult);
        }

    }


}