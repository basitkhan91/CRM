using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public  class VendorShippingAddress
    {
        [Key]
        public long? VendorShippingAddressId { get; set; }
        public long? VendorId { get; set; }
        public string SiteName { get; set; }
        public long? AddressId { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }



    }

}
