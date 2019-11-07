using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderExpertise
    {
        [Key]
        public long WorkOrderExpertiseId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public int ExpertiseTypeId { get; set; }
        public decimal? EstimatedHours { get; set; }
        public decimal? StandardRate { get; set; }
        public decimal? LaborDirectRate { get; set; }
        public decimal? DirectLaborRate { get; set; }
        public decimal? OverheadBurden { get; set; }
        public decimal? OverHeadCost { get; set; }
        public decimal? LaborOverHeadCost { get; set; }
        public long TaskId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
