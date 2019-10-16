using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using IdentityServer4.Extensions;
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
        private readonly ApplicationDbContext _context;
        public ChargeController(IUnitOfWork unitOfWork, ILogger<ChargeController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<ChargeViewModel>))]
        public IActionResult Get()
        {
          
                var result = _unitOfWork.Charge.GetAllChargeData();
                return Ok(result);
  
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
                curreobj.GLAccountId = chargeViewModel.GeneralLedgerId;
                curreobj.IntegrationPortalId = chargeViewModel.IntegrationPortalId;
                curreobj.PurchaseOrderId = chargeViewModel.PurchaseOrderId;
                curreobj.Quantity = chargeViewModel.Quantity;
                curreobj.VendorId = chargeViewModel.VendorId;
                curreobj.ManagementStructureId = chargeViewModel.ManagementStructureId;
                curreobj.Memo = chargeViewModel.Memo;
                curreobj.IsActive = chargeViewModel.IsActive;
                curreobj.MarkUpPercentage = chargeViewModel.MarkUp; 
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
                existingResult.GLAccountId = chargeViewModel.GeneralLedgerId;
                existingResult.IntegrationPortalId = chargeViewModel.IntegrationPortalId;
                existingResult.PurchaseOrderId = chargeViewModel.PurchaseOrderId;
                existingResult.Quantity = chargeViewModel.Quantity;
                existingResult.VendorId = chargeViewModel.VendorId;
                existingResult.Memo = chargeViewModel.Memo;
                existingResult.MarkUpPercentage = chargeViewModel.MarkUp;
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
            existingResult.IsDeleted = true;
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

        [HttpPost("pagination")]
        public IActionResult GetAircraftManufacturer([FromBody]ChargePaginationViewModel paginate)
        {
            GetData getData = new GetData();
            IQueryable<ChargePaginationViewModel> queryable = null;
            List<ChargePaginationViewModel> chargeList = new List<ChargePaginationViewModel>();
            ChargePaginationViewModel charge = null;
            if (!string.IsNullOrEmpty(Convert.ToString(paginate.ChargeId))
                || !string.IsNullOrEmpty(paginate.ChargeName)
                || !string.IsNullOrEmpty(Convert.ToString(paginate.Cost))
                || !string.IsNullOrEmpty(Convert.ToString(paginate.MarkUpPercentage))
                || !string.IsNullOrEmpty(Convert.ToString(paginate.BillableAmount))
                || !string.IsNullOrEmpty(Convert.ToString(paginate.Quantity))
                || !string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var charges = _unitOfWork.charge;
                var charges = (from ch in _context.Charge
                               join ms in _context.ManagementStructure on ch.ManagementStructureId equals ms.ManagementStructureId
                               join cu in _context.Currency on ch.CurrencyId equals cu.CurrencyId
                               join ve in _context.Vendor on ch.VendorId equals ve.VendorId
                               join po in _context.PurchaseOrder on ch.PurchaseOrderId equals po.PurchaseOrderId
                               join ip in _context.IntegrationPortal on ch.IntegrationPortalId equals ip.IntegrationPortalId
                               select new
                               {
                                   ch.ChargeId,
                                   ch.ChargeName,
                                   ch.Quantity,
                                   ch.Description,
                                   ch.CurrencyId,
                                   ch.Cost,
                                   ch.MarkUpPercentage,
                                   ch.PurchaseOrderId,
                                   ch.VendorId,
                                   ch.IntegrationPortalId,
                                   ch.GLAccountId,
                                   ch.Memo,
                                   ch.IsActive,
                                   ch.ManagementStructureId,
                                   ch.BillableAmount,
                                   ms.Code,
                                   cu.Symbol,
                                   po.PurchaseOrderNumber,
                                   ve.VendorName,
                                   ch.CreatedBy,
                                   ch.CreatedDate,
                                   ch.UpdatedBy,
                                   ch.UpdatedDate,
                                   
                                   IntegrationPortalDescription = ip.Description,
                               }).ToList();
                foreach (var item in charges)
                {
                    charge = new ChargePaginationViewModel();
                    charge.ChargeId = item.ChargeId;
                    charge.ChargeName = item.ChargeName;
                    charge.Description = item.Description;
                    charge.CurrencyId = item.CurrencyId;
                    charge.Cost = item.Cost;
                    charge.MarkUpPercentage = item.MarkUpPercentage;
                    charge.PurchaseOrderId = item.PurchaseOrderId;
                    charge.VendorId = item.VendorId;
                    charge.GLAccountId = item.GLAccountId;
                    charge.Memo = item.Memo;
                    charge.IsActive = item.IsActive;
                    charge.BillableAmount = item.BillableAmount;
                    charge.Quantity = item.Quantity;
                    charge.Description = item.Description;
                    charge.Memo = item.Memo;
                    charge.IntegrationPortalId = item.IntegrationPortalId;
                    charge.CreatedDate = item.CreatedDate;
                    charge.CreatedBy = item.CreatedBy;
                    charge.UpdatedDate = item.UpdatedDate;
                    charge.UpdatedBy = item.UpdatedBy;
                    charge.IsActive = item.IsActive;
                    chargeList.Add(charge);
                }
                if (paginate.ChargeId != null)
                {
                    chargeList = chargeList.Where(c => c.ChargeId != null && (c.ChargeId == paginate.ChargeId)).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.ChargeName))
                {
                    chargeList = chargeList.Where(c => c.ChargeName != null && c.ChargeName.ToUpper().Contains(paginate.ChargeName.ToUpper().Trim())).ToList();
                }
                if (paginate.Cost != null)
                {
                    chargeList = chargeList.Where(c => c.Cost != null && (c.Cost == paginate.Cost)).ToList();
                }
                if (paginate.MarkUpPercentage != null)
                {
                    chargeList = chargeList.Where(c => c.MarkUpPercentage != null && (c.MarkUpPercentage == paginate.MarkUpPercentage)).ToList();
                }
                if (paginate.BillableAmount != null)
                {
                    chargeList = chargeList.Where(c => c.BillableAmount != null && (c.BillableAmount == paginate.BillableAmount)).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    chargeList = chargeList.Where(c => c.Description != null && c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    chargeList = chargeList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }

                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    chargeList = chargeList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    chargeList = chargeList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = chargeList.Count();
            }
            else
            {
                var charges = (from ch in _context.Charge
                               join ms in _context.ManagementStructure on ch.ManagementStructureId equals ms.ManagementStructureId
                               join cu in _context.Currency on ch.CurrencyId equals cu.CurrencyId
                               join ve in _context.Vendor on ch.VendorId equals ve.VendorId
                               join po in _context.PurchaseOrder on ch.PurchaseOrderId equals po.PurchaseOrderId
                               join ip in _context.IntegrationPortal on ch.IntegrationPortalId equals ip.IntegrationPortalId
                               select new
                               {
                                   ch.ChargeId,
                                   ch.ChargeName,
                                   ch.Quantity,
                                   ch.Description,
                                   ch.CurrencyId,
                                   ch.Cost,
                                   ch.MarkUpPercentage,
                                   ch.PurchaseOrderId,
                                   ch.VendorId,
                                   ch.IntegrationPortalId,
                                   ch.GLAccountId,
                                   ch.Memo,
                                   ch.IsActive,
                                   ch.ManagementStructureId,
                                   ch.BillableAmount,
                                   ms.Code,
                                   cu.Symbol,
                                   po.PurchaseOrderNumber,
                                   ve.VendorName,
                                   ch.CreatedBy,
                                   ch.CreatedDate,
                                   ch.UpdatedBy,
                                   ch.UpdatedDate,

                                   IntegrationPortalDescription = ip.Description,
                               }).ToList();
                foreach (var item in charges)
                {
                    charge = new ChargePaginationViewModel();
                    charge.ChargeId = item.ChargeId;
                    charge.ChargeName = item.ChargeName;
                    charge.Description = item.Description;
                    charge.CurrencyId = item.CurrencyId;
                    charge.Cost = item.Cost;
                    charge.MarkUpPercentage = item.MarkUpPercentage;
                    charge.PurchaseOrderId = item.PurchaseOrderId;
                    charge.VendorId = item.VendorId;
                    charge.GLAccountId = item.GLAccountId;
                    charge.Memo = item.Memo;
                    charge.IsActive = item.IsActive;
                    charge.BillableAmount = item.BillableAmount;
                    charge.Quantity = item.Quantity;
                    charge.Description = item.Description;
                    charge.Memo = item.Memo;
                    charge.IntegrationPortalId = item.IntegrationPortalId;
                    charge.CreatedDate = item.CreatedDate;
                    charge.CreatedBy = item.CreatedBy;
                    charge.UpdatedDate = item.UpdatedDate;
                    charge.UpdatedBy = item.UpdatedBy;
                    charge.IsActive = item.IsActive;
                    chargeList.Add(charge);
                    getData.TotalRecordsCount = chargeList.Count();
                }
            }
            queryable = chargeList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.ChargeList = DAL.Common.PaginatedList<ChargePaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<ChargePaginationViewModel> ChargeList { get; set; }
        }
    }

}