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

        public int? MasterCompanyId { get; set; }

       
        public string CreatedBy { get; set; }

       
        public string UpdatedBy { get; set; }

        
        public DateTime CreatedDate { get; set; }

        
        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

        public  bool? IsPrimary { get; set; }
    }
}
