using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderQuoteExclusions
    {
        [Key]
        public long WorkOrderQuoteExclusionsId { get; set; }
        [ForeignKey("WorkOrderQuoteDetailsId")]
        public long WorkOrderQuoteDetailsId { get; set; }
        public long? ItemMasterId { get; set; }
        public int? SourceId { get; set; }
        public string Reference { get; set; }
        public int? ExstimtPercentOccuranceId { get; set; }
        public string Memo { get; set; }
        public int? Quantity { get; set; }
        public decimal? UnitCost { get; set; }
        public decimal? ExtendedCost { get; set; }
        public long? MarkUpPercentageId { get; set; }
        public decimal? CostPlusAmount { get; set; }
        public decimal? FixedAmount { get; set; }
        public long? TaskId { get; set; }
        public string MarkupFixedPrice { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
