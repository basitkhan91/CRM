using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models.Sales
{
    public class SalesOrderQuotePart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? SalesOrderQuotePartId { get; set; }
        public long SalesOrderQuoteId { get; set; }
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

        [Column(TypeName = "char(1)")]
        public string MethodType { get; set; }

        [NotMapped]
        public string Method { get { return (!string.IsNullOrWhiteSpace(MethodType) && MethodType == "I") ? "Item Master" : "Stock Line"; }  }

        public decimal SalesPriceExtended { get; set; }
        public decimal MarkupExtended { get; set; }
        public decimal SalesDiscountExtended { get; set; }
        public decimal NetSalePriceExtended { get; set; }
        public decimal UnitCostExtended { get; set; }
        public decimal MarginAmount { get; set; }
        public decimal MarginAmountExtended { get; set; }
        public int MarginPercentage { get; set; }
        public long ConditionId { get; set; }
    }
}
