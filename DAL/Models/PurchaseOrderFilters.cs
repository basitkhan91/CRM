using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrderFilters
    {
        [Key]
        public long PurchaseOrderId { get; set; }
        public string PurchaseOrderNo { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public string Status { get; set; }
        public string RequestedBy { get; set; }
        public string ApprovedBy { get; set; }
        public long? VendorId { get; set; }
    }
}
