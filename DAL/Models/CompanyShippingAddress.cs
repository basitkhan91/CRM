using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CompanyShippingAddress
    {
        [Key]
        public long CompanyShippingAddressId { get; set; }
        public long CompanyId { get; set; }
        public string SiteName { get; set; }
        public long AddressId { get; set; }
        public string ExportLicenseNumber { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public Decimal? Amount { get; set; }
        public bool? IsPrimary { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        
    }
}
