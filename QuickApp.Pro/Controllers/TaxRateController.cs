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
    public class TaxRateController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        public TaxRateController(IUnitOfWork unitOfWork, ILogger<TaxRateController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        //[HttpGet("Get")]
        //[Produces(typeof(List<TaxRateViewModel>))]
        //public IActionResult Get()
        //{
        //    var result = _unitOfWork.TaxRates.GetAllTaxRateData(); //.GetAllCustomersData();


        //    try
        //    {
        //        var resul1 = Mapper.Map<IEnumerable<TaxRateViewModel>>(result);

        //        return Ok(resul1);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }



        //}
        [HttpGet("Get")]
        [Produces(typeof(List<TaxRateViewModel>))]
        public IActionResult Get()
        {
            var allTaxrateInfo = _unitOfWork.TaxRate.GetAllTaxRateData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<TaxRateViewModel>>(allTaxrateInfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("TaxRate", id); //.GetAllCustomersData();


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
        [HttpPost("taxrate")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] TaxRateViewModel taxrateViewModel)
        {
            if (ModelState.IsValid)
            {
                if (taxrateViewModel == null)
                    return BadRequest($"{nameof(taxrateViewModel)} cannot be null");

                DAL.Models.TaxRates taxrateobject = new DAL.Models.TaxRates();              
                taxrateobject.TaxTypeId = taxrateViewModel.TaxTypeId;
                taxrateobject.TaxRate = taxrateViewModel.TaxRate;
                taxrateobject.Memo = taxrateViewModel.Memo;
                taxrateobject.MasterCompanyId = taxrateViewModel.MasterCompanyId;
                taxrateobject.IsActive = taxrateViewModel.IsActive;
                taxrateobject.CreatedDate = DateTime.Now;
                taxrateobject.UpdatedDate = DateTime.Now;
                taxrateobject.CreatedBy = taxrateViewModel.CreatedBy;
                taxrateobject.UpdatedBy = taxrateViewModel.UpdatedBy;
                _unitOfWork.TaxRate.Add(taxrateobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("taxrate/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] TaxRateViewModel taxrateViewModel)
        {

            if (ModelState.IsValid)
            {
                if (taxrateViewModel == null)
                    return BadRequest($"{nameof(taxrateViewModel)} cannot be null");

                var existingResult = _unitOfWork.TaxRate.GetSingleOrDefault(c => c.TaxRateId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = taxrateViewModel.UpdatedBy;
                existingResult.TaxTypeId = taxrateViewModel.TaxTypeId;
                existingResult.Memo = taxrateViewModel.Memo;
                existingResult.TaxRate = taxrateViewModel.TaxRate;
                existingResult.IsActive = taxrateViewModel.IsActive;
                existingResult.MasterCompanyId = taxrateViewModel.MasterCompanyId;

                _unitOfWork.TaxRate.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("taxrate/{id}")]
        [Produces(typeof(TaxRateViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.TaxRate.GetSingleOrDefault(c => c.TaxRateId == id);
            existingResult.IsDelete = true;
            _unitOfWork.TaxRate.Update(existingResult);

            //_unitOfWork.TaxRates.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<TaxRatesAudit>()
                .Find(x => x.TaxRateId == id)
                .OrderByDescending(x => x.TaxRateAuditId);

            var auditResult = new List<AuditResult<TaxRatesAudit>>();

            auditResult.Add(new AuditResult<TaxRatesAudit> { AreaName = "Tax Rate ", Result = audits.ToList() });

            return Ok(auditResult);
        }

        
        [HttpPost("pagination")]
        public IActionResult GetTaxRate([FromBody]TaxRatePaginationViewModel paginate)
        {
            IQueryable<TaxRatePaginationViewModel> queryable = null;
            List<TaxRatePaginationViewModel> taxRateList = new List<TaxRatePaginationViewModel>();
            TaxRatePaginationViewModel taxRate = null;
            if (!string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.TaxTypeId)
                || !string.IsNullOrEmpty(Convert.ToString(paginate.TaxRateId))
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var taxRates = _unitOfWork.taxRate;
                var taxRates = _unitOfWork.TaxRate.GetAllTaxRateData();
                foreach (var item in taxRates)
                {
                    taxRate = new TaxRatePaginationViewModel();
                    taxRate.TaxRateId = item.TaxRateId;
                    taxRate.TaxRate = item.TaxRate;
                    taxRate.TaxTypeId = item.TaxTypeId;
                    taxRate.Memo = item.Memo;
                    taxRate.Memo = item.Memo;
                    taxRate.CreatedDate = item.CreatedDate;
                    taxRate.CreatedBy = item.CreatedBy;
                    taxRate.UpdatedDate = item.UpdatedDate;
                    taxRate.UpdatedBy = item.UpdatedBy;
                    taxRate.IsActive = item.IsActive;
                    taxRateList.Add(taxRate);
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    taxRateList = taxRateList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.TaxTypeId))
                {
                    taxRateList = taxRateList.Where(c => c.TaxTypeId != null && c.TaxTypeId.ToUpper().Contains(paginate.TaxTypeId.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    taxRateList = taxRateList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    taxRateList = taxRateList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
            }
            else
            {
                var taxRates = _unitOfWork.TaxRate.GetAllTaxRateData();
                foreach (var item in taxRates)
                {
                    taxRate = new TaxRatePaginationViewModel();
                    taxRate.TaxRateId = item.TaxRateId;
                    taxRate.TaxTypeId = item.TaxTypeId;
                    taxRate.TaxRate = item.TaxRate;
                    taxRate.Memo = item.Memo;
                    taxRate.Memo = item.Memo;
                    taxRate.CreatedDate = item.CreatedDate;
                    taxRate.CreatedBy = item.CreatedBy;
                    taxRate.UpdatedDate = item.UpdatedDate;
                    taxRate.UpdatedBy = item.UpdatedBy;
                    taxRate.IsActive = item.IsActive;
                    taxRateList.Add(taxRate);
                }

            }
            queryable = taxRateList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                var data = DAL.Common.PaginatedList<TaxRatePaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(data);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }
    }

}
