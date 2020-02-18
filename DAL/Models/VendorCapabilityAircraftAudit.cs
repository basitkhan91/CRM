using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
   public class VendorCapabilityAircraftAudit
    {
        [Key]
        public long AuditVendorCapabilityAirCraftId { get; set; }
        public long VendorCapabilityAirCraftId { get; set; }
        public long VendorCapabilityId { get; set; }
        public long VendorId { get; set; }
        public long CapabilityId { get; set; }
        public int AircraftTypeId { get; set; }
        public int AircraftModelId { get; set; }
        public long DashNumberId { get; set; }
        public long ItemMasterId { get; set; }
        public int MasterCompanyId { get; set; }
        public string Memo { get; set; }
        public string PartNumber { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }

        // public bool? isSelected { get; set; }

        public bool? IsDeleted { get; set; }







    }
}
