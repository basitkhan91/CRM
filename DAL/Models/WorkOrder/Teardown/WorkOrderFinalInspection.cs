using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderFinalInspection
    {
        [Key]
        public long WorkOrderFinalInspectionId { get; set; }
        public long WorkOrderTeardownId { get; set; }
        public bool? ManualEntry { get; set; }
        public string Memo { get; set; }
        public long? InspectorId { get; set; }
        public DateTime? InspectorDate { get; set; }
    }
}
