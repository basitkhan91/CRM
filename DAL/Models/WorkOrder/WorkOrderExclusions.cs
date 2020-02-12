using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderExclusions
    {
        [Key]
        public long WorkOrderExclusionsId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        [ForeignKey("ItemMasterId")]
        public long? ItemMasterId { get; set; }
        public int SourceId { get; set; }
        public string Reference { get; set; }
        public int? EstimtPercentOccurranceId { get; set; } 
        public string Memo { get; set; }
        public int? Quantity { get; set; }
        public decimal? UnitCost { get; set; }
        public decimal? ExtendedCost { get; set; }
        public int MarkUpPercentageId { get; set; }
        public decimal CostPlusAmount { get; set; }
        public decimal FixedAmount { get; set; }
        public long TaskId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsFromWorkFlow { get; set; }

        [NotMapped]
        public string Epn { get; set; }
        [NotMapped]
        public string EpnDescription { get; set; }
        [NotMapped]
        public string Source { get; set; }
        [NotMapped]
        public string ExstimtPercentOccurance { get; set; }
        [NotMapped]
        public string MarkUpPercentage { get; set; }
        [NotMapped]
        public string Task { get; set; }

    }
}
