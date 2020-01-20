using System;

namespace DAL.Models
{
    public class WorkOrderFilters
    {
        public long WorkOrderId { get; set; }
        public string WorkOrderNum { get; set; }
        public string CustomerName { get; set; }
        public DateTime? OpenDate { get; set; }
        public string WorkOrderStatus { get; set; }
        public string WorkOrderStatusType { get; set; }
        public string WorkOrderStatusId { get; set; }
        public string PartNoType { get; set; }
        public string WorkScopeType { get; set; }
        public string PriorityType { get; set; }
        public string PNDescriptionType { get; set; }
        public string StageType { get; set; }
        public string CustomerType { get; set; }
        public string CustomerRequestDateType { get;set;}
        public string PromisedDateType { get; set; }
        public string EstimatedShipDateType { get; set; }
        public string EstimatedCompletionDateType { get; set; }
        public string ViewType { get; set; }
        public string PartNos { get; set; }
        public string PNDescription { get; set; }
        public string WorkScope { get; set; }
        public string Priority { get; set; }

        public string CustomerRequestDate { get; set; }
        public string PromisedDate { get; set; }
        public string EstimatedShipDate { get; set; }
        public string EstimatedCompletionDate { get; set; }
        public string Stage { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int TotalRecords { get; set; }
    }

    public class WorkOrderFilters1
    {
        public long WorkOrderId { get; set; }
         
        public string PartNos { get; set; }
        //public long WorkOrderStatusId { get; set; }
        //public DateTime? CreatedDate { get; set; }
        //public int TotalRecords { get; set; }
    }
}
