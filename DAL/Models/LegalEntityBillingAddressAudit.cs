using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class LegalEntityBillingAddressAudit
    {
        [Key]
        public long AuditLegalEntityBillingAddressId { get; set; }
        public long LegalEntityBillingAddressId { get; set; }
        public long LegalEntityId { get; set; }
        public long AddressId { get; set; }
        public string SiteName { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsPrimary { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }      
        public DateTime?CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
