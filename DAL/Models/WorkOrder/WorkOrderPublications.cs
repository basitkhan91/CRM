using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderPublications
    {
        public WorkOrderPublications()
        {
            WorkOrderPublicationDashNumber = new List<WorkOrderPublicationDashNumber>();
        }
        [Key]
        public long WorkOrderPublicationId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        [ForeignKey("WorkFlowWorkOrderId")]
        public long WorkFlowWorkOrderId { get; set; }
        public long PublicationId { get; set; }
        public long TaskId { get; set; }
        public long? AircraftManufacturerId { get; set; }
        public long? ModelId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public virtual List<WorkOrderPublicationDashNumber> WorkOrderPublicationDashNumber { get; set; }

        [NotMapped]
        public bool SaveToWorkFlow { get; set; }
    }
}
