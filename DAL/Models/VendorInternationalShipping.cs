using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public partial class VendorInternationalShipping
    {      
        [Key]
        public long VendorInternationalShippingId { get; set; }
        public long VendorId { get; set; }
        public string ExportLicense { get; set; }
        public DateTime? StartDate { get; set; }
        public decimal? Amount { get; set; }
        public bool IsPrimary { get; set; }
        public string Description { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public Int16 ShipToCountryId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public string ShipToCountry { get; set; }
    }
}
