using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class WorkOrderTeardown
    {
        [Key]
        public long WorkOrderTeardownId { get; set; }
        public long WorkOrderId { get; set; }
        public long WorkFlowWorkOrderId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual WorkOrderAdditionalComments WorkOrderAdditionalComments { get; set; }
        public virtual WorkOrderBulletinsModification WorkOrderBulletinsModification { get; set; }
        public virtual WorkOrderDiscovery WorkOrderDiscovery { get; set; }
        public virtual WorkOrderFinalInspection WorkOrderFinalInspection { get; set; }
        public virtual WorkOrderFinalTest WorkOrderFinalTest { get; set; }
        public virtual WorkOrderPmaDerBulletins WorkOrderPmaDerBulletins { get; set; }
        public virtual WorkOrderPreAssemblyInspection WorkOrderPreAssemblyInspection { get; set; }
        public virtual WorkOrderPreAssmentResults WorkOrderPreAssmentResults { get; set; }
        public virtual WorkOrderPreliinaryReview WorkOrderPreliinaryReview { get; set; }
        public virtual WorkOrderRemovalReasons WorkOrderRemovalReasons { get; set; }
        public virtual WorkOrderTestDataUsed WorkOrderTestDataUsed { get; set; }
        public virtual WorkOrderWorkPerformed WorkOrderWorkPerformed { get; set; }
    }
}
