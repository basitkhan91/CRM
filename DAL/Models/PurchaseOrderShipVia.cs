using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrderShipVia
    {
        [Key]
        public long POShipViaId { get; set; }
        [ForeignKey("PurchaseOrderId")]
        public long PurchaseOrderId { get; set; }
        public int UserType { get; set; }
        public long ReferenceId { get; set; }
        public long ShipViaId { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal HandlingCost { get; set; }
        public bool IsOnlyPOShipVia { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
