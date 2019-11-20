using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;



namespace QuickApp.Pro.ViewModels
{
    public class StockLineAdjustmentEditListViewModel
    {
        public long StockLineId { get; set; }
        public long SiteId { get; set; }
        public long WarehouseId { get; set; }
        public long LocationId { get; set; }
        public long ShelfId { get; set; }
        public long BinId { get; set; }
        public string SerialNumber { get; set; }
        public string PartNumber { get; set; }
        public int Quantity { get; set; }
        public int? QuantityOnOrder { get; set; }
        public int? QuantityAvailable { get; set; }
        public int? QuantityOnHand { get; set; }
        public int? QuantityIssued { get; set; }
        public int? QuantityTurnIn { get; set; }
        public int? QuantityReserved { get; set; }
        public long CoreUnitCost { get; set; }
        public long UnitSalesPrice { get; set; }
        public long DiscountSalesPrice { get; set; }
        public long LotCostAdjustment { get; set; }
        public long RevalueStockCost { get; set; }
        public long ManagementStructureEntityId { get; set;}
        public Int32? UnitCostAdjustmentReasonTypeId { get; set; }
        public Int32? UnitSalePriceAdjustmentReasonTypeId { get; set; }

        public bool sitetryChange { get; set; }
        public bool warehousetryChange { get; set; }
        public bool locationtryChange { get; set; }
        public bool shelftryChange { get; set; }
        public bool bintryChnage { get; set; }
        public bool isQunatity { get; set; }
        public bool isSerialized { get; set; }
    }
}
