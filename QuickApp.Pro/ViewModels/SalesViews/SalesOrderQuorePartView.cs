using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels.SalesViews
{
    public class SalesOrderQuotePartView
    {
        public long? SalesOrderQuotePartId { get; set; }
        public long? SalesOrderQuoteId { get; set; }
        public long ItemMasterId { get; set; }
        public long StockLineId { get; set; }
        public decimal FxRate { get; set; }
        public int QtyQuoted { get; set; }
        public decimal UnitSalePrice { get; set; }
        public decimal UnitCost { get; set; }

        public int MarkUpPercentage { get; set; }
        public decimal SalesBeforeDiscount { get; set; }
        public int Discount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetSales { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsDeleted { get; set; }

        public string partNumber { get; set; }

        public string partDescription { get; set; }

        public string stockLineNumber { get; set; }

        public bool isOEM { get; set; }

        public bool isPMA { get; set; }

        public bool isDER { get; set; }
    }
}