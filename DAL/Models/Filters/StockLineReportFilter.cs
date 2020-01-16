using System;

namespace DAL.Models
{
    public class StockLineReportFilter
    {
        public long StockLineId { get; set; }
        public string partNumber { get; set; }
        public string partDescription { get; set; }
        public string serialNumber { get; set; }
        public string stocklineNumber { get; set; }
        public string condition { get; set; }
        public string vendorName { get; set; }
        public long? vendorCode { get; set; }
        public int? quantity { get; set; }
        public int? qtyAdjusted { get; set; }
        public decimal? poUnitCost { get; set; }
        public decimal? unitPrice { get; set; }
        public decimal? extendedPrice { get; set; }
        public string wareHouse { get; set; }
        public string shelf { get; set; }
        public string bin { get; set; }
        public string accountCode { get; set; }
        public string purchaseOrderNumber { get; set; }
        public string repairOrderNumber { get; set; }
        public decimal? repairOrderUnitCost { get; set; }
        public DateTime? receivedDate { get; set; }
        public string receiverNumber { get; set; }
        public string reconciliationNumber { get; set; }
        public bool isActive { get; set; }
        public DateTime createdDate { get; set; }
        public int totalRecords { get; set; }
    }
}
