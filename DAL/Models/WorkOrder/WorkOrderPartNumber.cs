using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderPartNumber
    {
        public long ID { get; set; }
        public long WorkOrderId { get; set; }
        public long MasterPartId { get; set; }
        public long WorkOrderScopeId { get; set; }
        public string NTE { get; set; }
        public int Quantity { get; set; }
        public long StockLineId { get; set; }
        public long CMMId { get; set; }
        public long WorkflowId { get; set; }
        public long WorkOrderStageId { get; set; }
        public long WorkOrderStatusId { get; set; }
        public long WorkOrderPriorityId { get; set; }
        public DateTime CustomerRequestDate { get; set; }
        public DateTime PromisedDate { get; set; }
        public DateTime EstimatedCompletionDate { get; set; }
        public DateTime EstimatedShipDate { get; set; }
        public bool IsPMA { get; set; }
        public bool IsDER { get; set; }
        public long TechnicianId { get; set; }
        public long TechStationId { get; set; }
        public long TearDownReport { get; set; }
        public int TATDaysStandard { get; set; }
        public long ConditionId { get; set; }
        public long MappingItemMasterId { get; set; }
        public int? TATDaysCurrent { get; set; }
        public long? RevisedPartId { get; set; }

        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public string Description { get; set; }
        [NotMapped]
        public string SerialNumber { get; set; }
        [NotMapped]
        public string WorkScope { get; set; }
        [NotMapped]
        public string RevisedPartNo { get; set; }
        [NotMapped]
        public string Condition { get; set; }
        [NotMapped]
        public string StockLineNumber { get; set; }
        [NotMapped]
        public string PartNumber { get; set; }
        [NotMapped]
        public long ReceivingCustomerWorkId { get; set; }
        [NotMapped]
        public DateTime ReceivedDate { get; set; }
    }

    public class RevisedPart
    {
        public long MappingItemMasterId { get; set; }
        public string RevisedPartNo { get; set; }
    }
}
