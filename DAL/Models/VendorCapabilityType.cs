using System;

namespace DAL.Models
{
    public class VendorCapabilityType
    {
        public long VendorCapabilityTypeId { get; set; }
        public long VendorCapabilityId { get; set; }
        public int CapabilityTypeId { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
