using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorInternationalShipViaDetailsAudit
    {
        [Key]
        public long AuditVendorInternationalShipViaDetailsId { get; set; }
        public long VendorInternationalShipViaDetailsId { get; set; }
        public long VendorInternationalShippingId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAccountInfo { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsPrimary { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
