using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrderEmail
    {

        public long? PurchaseOrderId { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public string VendorName { get; set; }
        public string PoDate { get; set; }
        public string ShipToUser { get; set; }
        public string BillToUser { get; set; }

        public List<PurchaseOrderPart> PurchaseOrderParts { get; set; }
    }
}
