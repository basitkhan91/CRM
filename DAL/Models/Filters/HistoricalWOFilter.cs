using System;

namespace DAL.Models
{
    public class HistoricalWOFilter
    {
        public long ItemMasterId { get; set; }
        public long WorkScopeId { get; set; }
        public long WorkOrderId { get; set; }
        public string workOrderNum { get; set; }
        public string customerName { get; set; }
        public string customerCode { get; set; }
        public string woType { get; set; }
        public DateTime? openDate { get; set; }
        public string partNo { get; set; }
        public string pnDescription { get; set; }
        public DateTime? promisedDate { get; set; }
        public DateTime? estimatedCompletionDate { get; set; }
        public DateTime? estimatedShipDate { get; set; }
        public int? statusId { get; set; }
        public long? customerId { get; set; }
        public DateTime? createdDate { get; set; }
        public int TotalRecords { get; set; }
    }
}
