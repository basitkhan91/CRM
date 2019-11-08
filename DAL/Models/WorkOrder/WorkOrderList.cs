using DAL.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkOrderList : Pagination
    {
        public long? WorkOrderId { get; set; }
        public string WorkOrderNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerCode { get; set; }
        public string WorkOrderType { get; set; }
        public int Quantity { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime PromiseDate { get; set; }
        public string WorkFlowNo { get; set; }
        public string PartNumber { get; set; }
        public string PartDescription { get; set; }
        public string RevisedPin { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate {get;set;}

    }
}
