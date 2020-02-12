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
    public class CurrencyController :  Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public CurrencyController(IUnitOfWork unitOfWork, ILogger<CurrencyController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<CurrencyViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Currencys.GetAllCurrencyData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<CurrencyViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("auditHistoryById/{id}")]
        //[Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            //var result = _unitOfWork.AuditHistory.GetAllHistory("Currency", id); //.GetAllCustomersData();


            //try
            //{
            //    var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

            //    return Ok(resul1);
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}

            try
            {
                var result = _unitOfWork.Currencys.GetCurrencyAuditDetails(id); //.GetAllCustomersData();


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("CurrencyPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] CurrencyViewModel currencyViewModel)
        {
            if (ModelState.IsValid)
            {
                if (currencyViewModel == null)
                    return BadRequest($"{nameof(currencyViewModel)} cannot be null");
                DAL.Models.Currency curreobj = new DAL.Models.Currency();
                curreobj.Code = currencyViewModel.Code;
                curreobj.Symbol = currencyViewModel.Symbol;
                curreobj.DisplayName = currencyViewModel.DisplayName;
                curreobj.MasterCompanyId = currencyViewModel.MasterCompanyId;
                curreobj.Memo = currencyViewModel.Memo;
                curreobj.IsActive = currencyViewModel.IsActive;
                curreobj.CreatedDate = DateTime.Now;
                curreobj.UpdatedDate = DateTime.Now;
                curreobj.CreatedBy = currencyViewModel.CreatedBy;
                curreobj.UpdatedBy = currencyViewModel.UpdatedBy;
                curreobj.IsDeleted = false;
                _unitOfWork.Currencys.Add(curreobj);
                _unitOfWork.SaveChanges();
                return Ok(curreobj);
            }

            return Ok(ModelState);
        }
        [HttpPut("CurrencyPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] CurrencyViewModel currencyViewModel)
        {

            if (ModelState.IsValid)
            {
                if (currencyViewModel == null)
                    return BadRequest($"{nameof(currencyViewModel)} cannot be null");

                var existingResult = _unitOfWork.Currencys.GetSingleOrDefault(c => c.CurrencyId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = currencyViewModel.UpdatedBy;
                existingResult.Code = currencyViewModel.Code;
                existingResult.Symbol = currencyViewModel.Symbol;
                existingResult.DisplayName = currencyViewModel.DisplayName;
                existingResult.Memo = currencyViewModel.Memo;
                existingResult.IsActive = currencyViewModel.IsActive;
                existingResult.MasterCompanyId = currencyViewModel.MasterCompanyId;

                _unitOfWork.Currencys.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("CurrencyPost/{id}")]
        [Produces(typeof(CurrencyViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Currencys.GetSingleOrDefault(c => c.CurrencyId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Currencys.Update(existingResult);

            //_unitOfWork.Currencys.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<CurrencyAudit>()
                .Find(x => x.CurrencyId == id)
                .OrderByDescending(x => x.CurrencyAuditId);

            var auditResult = new List<AuditResult<CurrencyAudit>>();

            auditResult.Add(new AuditResult<CurrencyAudit> { AreaName = "Currency ", Result = audits.ToList() });

            return Ok(auditResult);
        }
        
        [HttpPost("pagination")]
        public IActionResult GetCurrency([FromBody]CurrencyPaginationViewModel paginate)
        {
            GetData getData = new GetData();
            IQueryable<CurrencyPaginationViewModel> queryable = null;
            List<CurrencyPaginationViewModel> currencyList = new List<CurrencyPaginationViewModel>();
            CurrencyPaginationViewModel currency = null;
            if (!string.IsNullOrEmpty(paginate.Code)
                || !string.IsNullOrEmpty(paginate.Symbol)
                || !string.IsNullOrEmpty(paginate.DisplayName)
                 || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var currencys = _unitOfWork.currency;
                var currencys = _unitOfWork.Currencys.GetAllCurrencyData();
                foreach (var item in currencys)
                {
                    currency = new CurrencyPaginationViewModel();
                    currency.CurrencyId = item.CurrencyId;
                    currency.Code = item.Code;
                    currency.Symbol = item.Symbol;
                    currency.DisplayName = item.DisplayName;
                    currency.Memo = item.Memo;
                    currency.CreatedDate = item.CreatedDate;
                    currency.CreatedBy = item.CreatedBy;
                    currency.UpdatedDate = item.UpdatedDate;
                    currency.UpdatedBy = item.UpdatedBy;
                    currency.IsActive = item.IsActive;
                    currencyList.Add(currency);
                }
                if (!string.IsNullOrEmpty(paginate.Code))
                {
                    currencyList = currencyList.Where(c => c.Code != null && c.Code.ToUpper().Contains(paginate.Code.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Symbol))
                {
                    currencyList = currencyList.Where(c => c.Symbol != null && c.Symbol.ToUpper().Contains(paginate.Symbol.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.DisplayName))
                {
                    currencyList = currencyList.Where(c => c.DisplayName != null && c.DisplayName.ToUpper().Contains(paginate.DisplayName.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    currencyList = currencyList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }

                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    currencyList = currencyList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    currencyList = currencyList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = currencyList.Count();
            }
            else
            {
                var currencys = _unitOfWork.Currencys.GetAllCurrencyData();
                foreach (var item in currencys)
                {
                    currency = new CurrencyPaginationViewModel();
                    currency.CurrencyId = item.CurrencyId;
                    currency.Code = item.Code;
                    currency.Symbol = item.Symbol;
                    currency.DisplayName = item.DisplayName;
                    currency.Memo = item.Memo;
                    currency.CreatedDate = item.CreatedDate;
                    currency.CreatedBy = item.CreatedBy;
                    currency.UpdatedDate = item.UpdatedDate;
                    currency.UpdatedBy = item.UpdatedBy;
                    currency.IsActive = item.IsActive;
                    currencyList.Add(currency);
                    getData.TotalRecordsCount = currencyList.Count();
                }
            }
            queryable = currencyList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.CurrencyList = DAL.Common.PaginatedList<CurrencyPaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<CurrencyPaginationViewModel> CurrencyList { get; set; }
        }

        #region Individual grids code

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(CurrencyModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<CurrencyModel> dynamicGridData = new DynamicGridData<CurrencyModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<CurrencyModel> currencyList = new List<CurrencyModel>();
            CurrencyModel currency = null;
            var currencys = _unitOfWork.Currencys.GetAllCurrencyData();
            foreach (var item in currencys)
            {
                currency = new CurrencyModel();
                currency.CurrencyId = item.CurrencyId;
                currency.Code = item.Code;
                currency.Symbol = item.Symbol;
                currency.DisplayName = item.DisplayName;
                currency.Memo = item.Memo;
                currency.CreatedDate = item.CreatedDate;
                currency.CreatedBy = item.CreatedBy;
                currency.UpdatedDate = item.UpdatedDate;
                currency.UpdatedBy = item.UpdatedBy;
                //currency.IsActive = item.IsActive;
                currencyList.Add(currency);
            }
            dynamicGridData.ColumnData = currencyList;
            return Ok(dynamicGridData);
        }
        #endregion


        [HttpPost("uploaduomcustomdata")]
        public IActionResult CurrencyCustomData()
        {
            var result = _unitOfWork.Currencys.UploadCurrencyCustomData(Request.Form.Files[0]);
            return Ok(result);
        }
    }
}
