using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WOQuoteFilters
    {
        public long WorkOrderQuoteId { get; set; }
        public long WorkOrderId { get; set; }
        public string quoteNumber { get; set; }
        public string workOrderNum { get; set; }
        public string customerName { get; set; }
        public string customerCode { get; set; }
        public DateTime? openDate { get; set; }
        public string promisedDate { get; set; }
        public string estCompletionDate { get; set; }
        public string estShipDate { get; set; }
        public string quoteStatus { get; set; }
        public int quoteStatusId { get; set; }
        public DateTime createdDate { get; set; }
        public int totalRecords { get; set; }
        public bool isActive { get; set; }
        public long? ItemMasterId { get; set; }
        public long? WorkScopeId { get; set; }
        public int? StatusId { get; set; }
        public long? CusomerId { get; set; }
    }
}
