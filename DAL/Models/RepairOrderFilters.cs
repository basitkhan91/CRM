using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class RepairOrderFilters
    {
        [Key]
        public long RepairOrderId { get; set; }
        public string RepairOrderNumber { get; set; }
        public string RepairOrderNo { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public string Status { get; set; }
        public string RequestedBy { get; set; }
        public string ApprovedBy { get; set; }
        public long? VendorId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public int TotalRecords { get; set; }
        public int StatusId { get; set; }

    }
}
