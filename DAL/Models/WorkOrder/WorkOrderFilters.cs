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
        public string CustomerCode { get; set; }
        public string WorkOrderType { get; set; }
        public DateTime? OpenDate { get; set; }
        public string WorkOrderStatus { get; set; }
        public string PartNos { get; set; }
        public string WorkScope { get; set; }
        public string Priority { get; set; }
        public string RevisedPN { get; set; }
        public string PNDescription { get; set; }
        public string Stage { get; set; }
        
    }
}
