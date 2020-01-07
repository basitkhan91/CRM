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
        public string PartNos { get; set; }
        public string WorkScope { get; set; }
        public string Priority { get; set; }
        public string PNDescription { get; set; }
        public string Stage { get; set; }
        public string CustomerType { get; set; }
        public DateTime? CustomerRequestDate {get;set;}
        public DateTime? PromisedDate { get; set; }
        public DateTime? EstimatedShipDate { get; set; }
        public DateTime? EstimatedCompletionDate { get; set; }
        public string ViewType { get; set; }
    }
}
