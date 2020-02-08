using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderQuoteLabor
    {
        [Key]
        public long WorkOrderQuoteLaborId { get; set; }
        [ForeignKey("WorkOrderQuoteLaborHeaderId")]
        public long WorkOrderQuoteLaborHeaderId { get; set; }
        public long? ExpertiseId { get; set; }
        public int? BillableId { get; set; }
        public decimal? Hours { get; set; }
        public int TaskId { get; set; }
        public decimal? DirectLaborOHCost { get; set; }
        public long? MarkupPercentageId { get; set; }
        public decimal? BurdenRateAmount { get; set; }
        public decimal? TotalCostPerHour { get; set; }
        public decimal? TotalCost { get; set; }
        public int? BillingMethodId { get; set; }
        public decimal? BillingRate { get; set; }
        public decimal? BillingAmount { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
