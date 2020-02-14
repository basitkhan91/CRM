using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class CustomerBillingAddressAudit
    {
        [Key]
        public long AuditCustomerBillingAddressId { get; set; }
        public long CustomerBillingAddressId { get; set; }
        public long CustomerId { get; set; }
        public long AddressId { get; set; }
        public string SiteName { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsPrimary { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }      
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
    }
}
