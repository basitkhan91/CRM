using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{

    public partial class VendorPaymentMethod
    {
        [Key]

        public byte VendorPaymentMethodId { get; set; }
        public string Description { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
       
        //public virtual VendorPayment VendorPayment { get; set; }
    }
}
