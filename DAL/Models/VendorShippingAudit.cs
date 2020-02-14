using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace DAL.Models
{
   public class VendorShippingAudit
    {
        [Key]
        public long AuditVendorShippingId { get; set; }
        public long VendorShippingId { get; set; }
        public long VendorId { get; set; }
        public long? VendorShippingAddressId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingId { get; set; }
        public string ShippingAccountinfo { get; set; }
        public string Memo { get; set; }
        public string ShippingURL { get; set; }
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
