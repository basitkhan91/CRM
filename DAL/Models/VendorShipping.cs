using System;
namespace DAL.Models
{
    public partial class VendorShipping
    {
        public long VendorShippingId { get; set; }
        public long VendorId { get; set; }
        public long? VendorShippingAddressId { get; set; }
        
        public string ShipVia { get; set; }
        public string ShippingId { get; set; }
        public string ShippingAccountinfo { get; set; }
        public string Memo { get; set; }
        public string ShippingURL { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        // public virtual Vendor Vendor { get; set; }


    }
}
