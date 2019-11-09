using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class RepairOrderFilters
    {
        [Key]
        public long RepairOrderId { get; set; }
        public string RepairOrderNumber { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public int StatusId { get; set; }
    }
}
