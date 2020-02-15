using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public  class CustomerBillingAddress : PasBase
    {

        public long? CustomerBillingAddressId { get; set; }

        public long? CustomerId { get; set; }

        public long? AddressId { get; set; }        
        
        public string SiteName { get; set; }

        public int MasterCompanyId { get; set; }

        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;

        public  bool? IsPrimary { get; set; }
    }
}
