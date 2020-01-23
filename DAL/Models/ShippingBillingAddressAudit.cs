using DAL.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
 public   class ShippingBillingAddressAudit
    {
        [Key]
        public long SBAId { get; set; }
        public long ModuleId { get; set; }
        public long ReferenceId { get; set; }
        public long AddressId { get; set; }
        public int AddressType { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsPrimary { get; set; }
        public string SiteName { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
