using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderLabor 
    {
        [Key]
        public long WorkOrderLaborId { get; set; }

        [ForeignKey("WorkOrderLaborHeaderId")]
        public long WorkOrderLaborHeaderId { get; set; }
        public long TaskId { get; set; }
        public long? ExpertiseId { get; set; }
        public long EmployeeId { get; set; }
        public int? BillableId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? Hours { get; set; }
        public decimal? Adjustments { get; set; }
        public decimal? AdjustedHours { get; set; }
        public string Memo { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsFromWorkFlow { get; set; }

        [NotMapped]
        public string Expertise { get; set; }
        [NotMapped]
        public string Task { get; set; }
    }
}
