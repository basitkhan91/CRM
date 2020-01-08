using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderFilters
    {
        public long WorkOrderId { get; set; }
        public string WorkOrderNum { get; set; }
        public string CustomerName { get; set; }
        public DateTime? OpenDate { get; set; }
        public string WorkOrderStatus { get; set; }
        public string PartNoType { get; set; }
        public string WorkScopeType { get; set; }
        public string PriorityType { get; set; }
        public string PNDescriptionType { get; set; }
        public string StageType { get; set; }
        public string CustomerType { get; set; }
        public DateTime? CustomerRequestDateType { get;set;}
        public DateTime? PromisedDateType { get; set; }
        public DateTime? EstimatedShipDateType { get; set; }
        public DateTime? EstimatedCompletionDateType { get; set; }
        public string ViewType { get; set; }
    }
}
