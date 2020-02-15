using AutoMapper;
using DAL;
using DAL.Models.Sales;
using DAL.Models.Sales.SalesOrderQuote;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using QuickApp.Pro.ViewModels.SalesViews;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using QuickApp.Pro.Extensions;
using DAL.Common;

namespace QuickApp.Pro.Controllers
{
    [Produces("application/json")]
    [Route("api/SalesQuote")]
    public partial class SalesQuoteController : Controller
    {
        private IUnitOfWork UnitOfWork { get; set; }
        private ILogger Logger { get; set; }
        private IEmailer Emailer { get; set; }
        private ApplicationDbContext Context { get; set; }

        public SalesQuoteController(IUnitOfWork unitOfWork
            , ILogger<SalesQuoteController> logger
            , IEmailer emailer, ApplicationDbContext context)
        {
            this.UnitOfWork = unitOfWork;
            this.Logger = logger;
            this.Emailer = emailer;
            this.Context = context;

        }
        // POST: api/salesquote/search
        /// <summary>
        /// Currenty we will return all the sales quote data
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        [HttpPost("search")]

        public IActionResult Search([FromBody] SalesQuoteSearchParameters parameters)
        {
            IEnumerable<SalesQuoteListView> list = Enumerable.Empty<SalesQuoteListView>();

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = new GetSearchData<SalesQuoteListView>();

            list = from q in this.Context.SalesOrderQuote
                   join s in this.Context.MasterSalesOrderQuoteStatus
                   on q.StatusId equals s.Id
                   join c in this.Context.Customer
                   on q.CustomerId equals c.CustomerId
                   join p in this.Context.SalesOrderQuotePart
                   on q.SalesOrderQuoteId equals p.SalesOrderQuoteId
                   where q.IsDeleted == false && p.IsDeleted == false

                   group p by new
                   {
                       SalesOrderQuoteId = p.SalesOrderQuoteId,
                       OpenDate = q.OpenDate,
                       CustomerId = c.CustomerId,
                       Name = c.Name,
                       CustomerCode = c.CustomerCode,
                       Status = s.Name,
                       NetSales = p.NetSales,
                       UnitCost = p.UnitCost
                   } into gp

                   select new SalesQuoteListView
                   {
                       SalesQuoteId = gp.Key.SalesOrderQuoteId,
                       QuoteDate = gp.Key.OpenDate,
                       CustomerId = gp.Key.CustomerId,
                       CustomerName = gp.Key.Name,
                       CustomerCode = gp.Key.CustomerCode,
                       Status = gp.Key.Status,
                       SalesPrice = gp.Sum(s => s.NetSales),
                       Cost = gp.Sum(c => c.UnitCost),
                       NumberOfItems = gp.Count()
                   };


            if (parameters.ColumnFilters != null)
            {
                list = Filter(list, parameters.ColumnFilters);
            }

            if (parameters.sortOrder != 0 && !string.IsNullOrWhiteSpace(parameters.sortField))
            {
                var sortDirection = parameters.sortOrder == -1 ? "desc" : "asc";
                list = list.Sort<SalesQuoteListView>(parameters.sortField, sortDirection);
            }

            result.TotalRecordsCount = list.Count();

            if (parameters.rows > 0)
            {
                var pageListPerPage = parameters.rows;
                var pageIndex = parameters.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                result.Data = DAL.Common.PaginatedList<SalesQuoteListView>.Create(list.AsQueryable(), pageCount, pageListPerPage);
            }



            return Ok(result);
        }

        // GET: api/SalesQuote/5
        [HttpGet("new/{customerId}")]
        public IActionResult New(long customerId)
        {
            var model = new SalesQuoteViewModel
            {
                CustomerId = customerId,
                StatusId = 1,
            };

            model = BindDefaultDataSources(model);


            return Ok(model);
        }

        // POST: api/SalesQuote/get/{id}
        [HttpGet("get/{id}")]
        public IActionResult Get(long id)
        {

            SalesOrderQuote quote = this.UnitOfWork.SalesOrderQuote.Get(id);

            DAL.Models.Currency currency = this.UnitOfWork.Currencys.Get(quote.CurrencyId);

            if (quote == null) return NotFound($"{id} doesnot exist.");

            IEnumerable<SalesOrderQuoteApproverList> approverList = this.UnitOfWork.SalesOrderQuoteApproverList.GetApproverList(id);


            IEnumerable<SalesOrderQuotePartView> partsView = GetSalesOrderQuotePartsView(id, currency);

            var quoteView = Mapper.Map<SalesOrderQuote, SalesOrderQuoteView>(quote);

            var approverListView = Mapper.Map<IEnumerable<SalesOrderQuoteApproverList>, IEnumerable<SalesOrderQuoteApproverListView>>(approverList);

            var response = new SalesQuoteView
            {
                SalesOrderQuote = quoteView,
                ApproverList = approverListView.ToList(),
                Parts = partsView.ToList()
            };

            response = BindDefaultDataSources(response);

            return Ok(response);
        }

        // POST: api/SalesQuote
        [HttpPost]
        public IActionResult Post([FromBody]SalesQuoteView quoteView)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            quoteView.SalesOrderQuote.StatusId = 1;  // Defualt to "Open" 
            quoteView.SalesOrderQuote.StatusChangeDate = System.DateTime.Now;

            SalesOrderQuote quote = Mapper.Map<SalesOrderQuoteView, SalesOrderQuote>(quoteView.SalesOrderQuote);
            
            IEnumerable<SalesOrderQuoteApproverList> approverList = Mapper.Map<List<SalesOrderQuoteApproverListView>, List<SalesOrderQuoteApproverList>>(quoteView.ApproverList);

            IEnumerable<SalesOrderQuotePart> parts = Mapper.Map<List<SalesOrderQuotePartView>, List<SalesOrderQuotePart>>(quoteView.Parts);

            var q = this.UnitOfWork.SalesOrderQuote.Create(quote);

            if (q != null && q.SalesOrderQuoteId.HasValue)
            {
                foreach (var list in approverList)
                {
                    list.SalesOrderQuoteId = q.SalesOrderQuoteId.Value;
                }

                foreach (var part in parts)
                {
                    part.SalesOrderQuoteId = q.SalesOrderQuoteId.Value;
                }

                this.UnitOfWork.SalesOrderQuoteApproverList.BulkCreate(approverList);

                this.UnitOfWork.SalesOrderQuotePart.BulkCreate(parts);
            }

            var response = Mapper.Map<SalesOrderQuote, SalesOrderQuoteView>(q);

            return Ok(response);
        }

        // PUT: api/SalesQuote/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody]SalesQuoteView quoteView)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var currentQuote  = this.UnitOfWork.SalesOrderQuote.Get(quoteView.SalesOrderQuote.SalesOrderQuoteId.Value, false);

            quoteView.SalesOrderQuote.StatusChangeDate = ( currentQuote.StatusId != quoteView.SalesOrderQuote.StatusId )
                                                            ? System.DateTime.Now 
                                                            : currentQuote.StatusChangeDate;

            SalesOrderQuote quote = Mapper.Map<SalesOrderQuoteView, SalesOrderQuote>(quoteView.SalesOrderQuote);

            IEnumerable<SalesOrderQuoteApproverList> approverList = Mapper.Map<List<SalesOrderQuoteApproverListView>, List<SalesOrderQuoteApproverList>>(quoteView.ApproverList);

            IEnumerable<SalesOrderQuotePart> parts = Mapper.Map<List<SalesOrderQuotePartView>, List<SalesOrderQuotePart>>(quoteView.Parts);

            var q = this.UnitOfWork.SalesOrderQuote.UpdateSalesQuote(quote);

            if (q != null && q.SalesOrderQuoteId.HasValue)
            {
                if (approverList != null)
                {
                    foreach (var list in approverList)
                    {
                        list.SalesOrderQuoteId = q.SalesOrderQuoteId.Value;
                    }

                    this.UnitOfWork.SalesOrderQuoteApproverList.BulkMerge(approverList);
                }

                if (parts != null)
                {
                    foreach (var part in parts)
                    {
                        part.SalesOrderQuoteId = q.SalesOrderQuoteId.Value;
                    }

                    this.UnitOfWork.SalesOrderQuotePart.BulkMege(parts);
                }
            }

            return Ok(quoteView.SalesOrderQuote);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            this.UnitOfWork.SalesOrderQuote.Delete(id);

            return Ok(true);
        }

        // DELETE: api/deletepart/5
        [HttpDelete("deletepart/{id}")]
        public IActionResult DeletePart(int id)
        {

            this.UnitOfWork.SalesOrderQuotePart.Delete(id);

            return Ok(true);
        }


        private IEnumerable<SalesOrderQuotePartView> GetSalesOrderQuotePartsView(long salesQuoteId, DAL.Models.Currency currency)
        {

            var currencyDisplayName = currency != null ? currency.DisplayName : string.Empty;

            IEnumerable<SalesOrderQuotePartView> partsView = from part in Context.SalesOrderQuotePart
                                                             join stockLine in Context.StockLine on part.StockLineId equals stockLine.StockLineId into quoteToSl
                                                             from qs in quoteToSl.DefaultIfEmpty()
                                                             join itemMaster in Context.ItemMaster on part.ItemMasterId equals itemMaster.ItemMasterId
                                                             join condition in Context.Condition on part.ConditionId equals condition.ConditionId into conditionParts
                                                             from cp in conditionParts.DefaultIfEmpty()
                                                             where part.SalesOrderQuoteId == salesQuoteId
                                                                    && part.IsDeleted == false
                                                             select new SalesOrderQuotePartView
                                                             {
                                                                 SalesOrderQuotePartId = part.SalesOrderQuotePartId,
                                                                 SalesOrderQuoteId = part.SalesOrderQuoteId,
                                                                 ItemMasterId = part.ItemMasterId,
                                                                 StockLineId = part.StockLineId,
                                                                 stockLineNumber = qs.StockLineNumber,
                                                                 FxRate = part.FxRate,
                                                                 QtyQuoted = part.QtyQuoted,
                                                                 UnitSalePrice = part.UnitSalePrice,
                                                                 MarkUpPercentage = part.MarkUpPercentage,
                                                                 SalesBeforeDiscount = part.SalesBeforeDiscount,
                                                                 Discount = part.Discount,
                                                                 DiscountAmount = part.DiscountAmount,
                                                                 NetSales = part.NetSales,
                                                                 MasterCompanyId = part.MasterCompanyId,
                                                                 CreatedBy = part.CreatedBy,
                                                                 CreatedOn = part.CreatedOn,
                                                                 UpdatedBy = part.UpdatedBy,
                                                                 UpdatedOn = part.UpdatedOn,
                                                                 partNumber = itemMaster.PartNumber,
                                                                 partDescription = itemMaster.PartDescription,
                                                                 isOEM = qs.OEM.HasValue ? qs.OEM.Value : false,
                                                                 isPMA = itemMaster.PMA.HasValue ? itemMaster.PMA.Value : false,
                                                                 isDER = itemMaster.DER.HasValue ? itemMaster.DER.Value : false,
                                                                 MethodType = part.MethodType,
                                                                 Method = part.Method,
                                                                 SerialNumber = qs.SerialNumber ?? string.Empty,
                                                                 UnitCost = part.UnitCost,
                                                                 SalesPriceExtended = part.SalesPriceExtended,
                                                                 MarkupExtended = part.MarkupExtended,
                                                                 SalesDiscountExtended = part.SalesDiscountExtended,
                                                                 NetSalePriceExtended = part.NetSalePriceExtended,
                                                                 UnitCostExtended = part.UnitCostExtended,
                                                                 MarginAmount = part.MarginAmount,
                                                                 MarginAmountExtended = part.MarginAmountExtended,
                                                                 MarginPercentage = part.MarginPercentage,
                                                                 CurrencyDescription = currencyDisplayName,
                                                                 ConditionDescription = cp.Description,
                                                                 IdNumber = qs.IdNumber ?? string.Empty
                                                             };

            return partsView;

        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IEnumerable<SalesQuoteListView> Filter(IEnumerable<SalesQuoteListView> list, SalesQuoteListView filters)
        {
            var DATE_FORMAT = "MM/dd/yyyy";

            if (filters == null) return list;

            if (filters.SalesQuoteId.HasValue)
            {
                list = list.Where(q => q.SalesQuoteId.HasValue && q.SalesQuoteId.Value.ToString().Contains(filters.SalesQuoteId.Value.ToString()));
            }

            if (filters.QuoteDate.HasValue)
            {
                list = list.Where(q => q.QuoteDate.Value.ToString(DATE_FORMAT) == filters.QuoteDate.Value.ToString(DATE_FORMAT));
            }

            if (!string.IsNullOrWhiteSpace(filters.VersionNumber))
            {
                list = list.Where(q => q.VersionNumber.Contains(filters.VersionNumber));
            }

            if (!string.IsNullOrWhiteSpace(filters.CustomerName))
            {
                list = list.Where(q => q.CustomerName.Contains(filters.CustomerName));
            }

            if (!string.IsNullOrWhiteSpace(filters.CustomerCode))
            {
                list = list.Where(q => q.CustomerCode.Contains(filters.CustomerCode));
            }

            if (filters.SalesPrice > 0)
            {
                list = list.Where(q => q.SalesPrice == filters.SalesPrice);
            }

            if (filters.Cost > 0)
            {
                list = list.Where(q => q.Cost == filters.Cost);
            }

            if (filters.NumberOfItems > 0)
            {
                list = list.Where(q => q.NumberOfItems == filters.NumberOfItems);
            }

            return list;
        }
    }
}
