using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrderAddress
    {
        public PurchaseOrderAddress()
        {
            POBillingShippingAddress = new List<POBillingShippingAddress>();
        }

        [Key]
        public long POAddressId { get; set; }
        [ForeignKey("PurchaseOrderId")]
        public long PurchaseOrderId { get; set; }
        public virtual List<POBillingShippingAddress> POBillingShippingAddress { get; set; }
    }
}
