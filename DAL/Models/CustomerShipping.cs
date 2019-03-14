﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class CustomerShipping
    {
    
        public long? CustomerShippingId { get; set; }

        public long? CustomerId { get; set; }
        public long? CustomerShippingAddressId { get; set; }

        public string ShipVia { get; set; }
        public string ShippingId { get; set; }
        public string ShippingAccountinfo { get; set; }
        public string Memo { get; set; }
        public string ShippingURL { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }

    }
}
