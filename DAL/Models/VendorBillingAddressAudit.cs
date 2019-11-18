using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public partial class VendorBillingAddressAudit
    {
        [Key]
        public long AuditVendorBillingAddressId { get; set; }        
        public long VendorBillingAddressId { get; set; }
        public long VendorId { get; set; }        
        public long AddressId { get; set; }
        public string SiteName { get; set; }
        public bool? IsPrimary { get; set; }     
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
