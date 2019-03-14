using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ChargesTable : BaseClass
    {

        public string Type { get; set; }
        public string Description { get; set; }
        public string Quantity { get; set; }
        public string UnitCost { get; set; }
        public string ExtendedCost { get; set; }
        public string UnitPrice { get; set; }
        public string ExtendedPrice { get; set; }
        public string Currency { get; set; }
        public string Fixrate { get; set; }
        public string VendorName { get; set; }
        public string VendorPriceOrUnit { get; set; }

        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }

    }
}
