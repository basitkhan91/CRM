using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderLaborHeader
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WorkOrderLaborHeader()
        {
            WorkOrderLaborList = new List<WorkOrderLabor>();
        }

        [Key]
        public long WorkOrderLaborHeaderId {get;set;}
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public string DataEnteredBy { get; set; }
        public int HoursorClockorScan { get; set; }
        public bool IsTaskCompletedByOne { get; set; }
        public int WorkOrderHoursType { get; set; }
        public string LabourMemo { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual List<WorkOrderLabor> WorkOrderLaborList { get; set; }
    }
}
