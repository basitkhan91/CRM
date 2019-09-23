using System;

namespace DAL.Models
{
    public class WorkOrderPartNumber : PasBaseAuditing
    {
        public Int64 ID { get; set; }
        public Int64 WorkOrderId { get; set; }
        public Int64 ItemMasterId { get; set; }
        public Int64 WorkOrderScopeId { get; set; }
        public string NTE { get; set; }
        public int Quantity { get; set; }
        public Int64 StockLineId { get; set; }
        public Int64 CMMId { get; set; }
        public Int64 WorkflowId { get; set; }
        public Int64 WorkOrderStageId { get; set; }
        public Int64 WorkOrderStatusId { get; set; }
        public Int64 WorkOrderPriorityId { get; set; }
        public DateTime CustomerRequestDate { get; set; }
        public DateTime PromisedDate { get; set; }
        public DateTime EstimatedCompletionDate { get; set; }
        public bool IsPMA { get; set; }
        public bool IsDER { get; set; }
        public string TechnicianName { get; set; }
        public Int64 TechStationId { get; set; }
        public Int64 TearDownReport { get; set; }
        public int TATDaysStandard { get; set; }
        public int MasterCompanyId { get; set; }
    }
}
