using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderQuoteMaterial
    {
        [Key]
        public long WorkOrderQuoteMaterialId { get; set; }
        [ForeignKey("WorkOrderQuoteDetailsId")]
        public long WorkOrderQuoteDetailsId { get; set; }
        public long? ItemMasterId { get; set; }
        public long? ConditionCodeId { get; set; }
        public string MandatoryOrSupplemental { get; set; }
        public long? ItemClassificationId { get; set; }
        public int? Quantity { get; set; }
        public long? UnitOfMeasureId { get; set; }
        public decimal? UnitCost { get; set; }
        public decimal? ExtendedCost { get; set; }
        public string Memo { get; set; }
        public bool? IsDefered { get; set; }
        public long? MarkupPercentageId { get; set; }
        public long? TaskId { get; set; }
        public string MarkupFixedPrice { get; set; }
        public int? BillingMethodId { get; set; }
        public decimal? TMAmount { get; set; }
        public decimal? FlateRate { get; set; }
        public long? HeaderMarkupId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
