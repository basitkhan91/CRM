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
        public long? EmployeeId { get; set; }
        public int? BillableId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? Hours { get; set; }
        public decimal? Adjustments { get; set; }
        public decimal? AdjustedHours { get; set; }
        public string Memo { get; set; }
        public int TaskId { get; set; }
        public decimal? DirectLaborOHCost { get; set; }
        public long? MarkupPercentageId { get; set; }
        public decimal? LabourCostPlus { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
