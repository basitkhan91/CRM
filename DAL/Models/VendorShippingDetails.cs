using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
  public  class VendorShippingDetails
    {
        public long VendorShippingDetailsId { get; set; }
        public long VendorId { get; set; }
        public long? VendorShippingId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAccountInfo { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
    }
}
