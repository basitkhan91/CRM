using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using DAL.Models.Sales;
using DAL.Models.Sales.SalesOrderQuote;
using AutoMapper;
using QuickApp.Pro.ViewModels.SalesViews;
using System.Linq.Expressions;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

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

            list = from q in this.Context.SalesOrderQuote
                   join c in this.Context.Customer
                   on q.CustomerId equals c.CustomerId
                   where q.IsDeleted == false
                   select new SalesQuoteListView
                   {
                       SalesQuoteId = q.SalesOrderQuoteId,
                       QuoteDate = q.OpenDate,
                       CustomerId = c.CustomerId,
                       CustomerName = c.Name,
                       CustomerCode = c.CustomerCode,
                       Status = "Open",  // Hardcoded for time being, will be removed in next version 
                   };
                   
            return Ok(list);
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

            if (quote == null) return NotFound($"{id} doesnot exist.");

            IEnumerable<SalesOrderQuoteApproverList> approverList =  this.UnitOfWork.SalesOrderQuoteApproverList.GetApproverList(id);

            IEnumerable<SalesOrderQuotePartView> partsView = GetSalesOrderQuotePartsView(id);
            
            //IEnumerable<SalesOrderQuotePart> parts = this.UnitOfWork.SalesOrderQuotePart.GetPartsBySalesQuoteId(id);

            var quoteView = Mapper.Map<SalesOrderQuote, SalesOrderQuoteView>(quote);

            var approverListView = Mapper.Map<IEnumerable<SalesOrderQuoteApproverList>, IEnumerable<SalesOrderQuoteApproverListView>>(approverList);

            //var partsView = Mapper.Map<IEnumerable<SalesOrderQuotePart>, IEnumerable<SalesOrderQuotePartView>>(parts);

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

        private IEnumerable<SalesOrderQuotePartView> GetSalesOrderQuotePartsView(long salesQuoteId)
        {
            IEnumerable<SalesOrderQuotePartView> partsView = from part in Context.SalesOrderQuotePart
                                                             join stockLine in Context.StockLine on part.StockLineId equals stockLine.StockLineId into quoteToSl
                                                             from qs in quoteToSl.DefaultIfEmpty()
                                                             join itemMaster in Context.ItemMaster on part.ItemMasterId equals itemMaster.ItemMasterId
                                                             where part.SalesOrderQuoteId == salesQuoteId
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
                                                                  partNumber = qs.PartNumber,  
                                                                  partDescription = itemMaster.PartDescription,  
                                                                  isOEM = qs.OEM.HasValue ? qs.OEM.Value : false,  
                                                                  isPMA = itemMaster.PMA.HasValue ? itemMaster.PMA.Value : false, 
                                                                  isDER = itemMaster.DER.HasValue ? itemMaster.DER.Value : false
                                                             };

            return partsView;

        }
    }
}
