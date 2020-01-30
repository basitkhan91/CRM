using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorShippingAddressAudit
    {
        [Key]
        public long AuditVendorShippingAddressId { get; set; }       
        public long VendorShippingAddressId { get; set; }
        public long? VendorId { get; set; }
        public string SiteName { get; set; }
        public long? AddressId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
