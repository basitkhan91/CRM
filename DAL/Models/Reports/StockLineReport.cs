using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class StockLineReport
    {
        public string PartNumber { get; set; }
        public string PartDescription { get; set; }
        public string SerialNumber { get; set; }
        public string StocklineNumber { get; set; }
        public string Condition { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public int? Quantity { get; set; }
        public int? QtyAdjusted { get; set; }
        public decimal? POUnitCost { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? ExtendedPrice { get; set; }
        public string WareHouse { get; set; }
        public string Shelf { get; set; }
        public string Bin { get; set; }
        public string AccountCode { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public string RepairOrderNumber { get; set; }
        public decimal? RepairOrderUnitCost { get; set; }
        public DateTime? ReceivedDate { get; set; }
        public string ReceiverNumber { get; set; }
        public string ReconciliationNumber { get; set; }
    }
}
