using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class StockLAdjustmentViewModel
    {
        public long StockLineId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public int AdjustmentDataTypeId { get; set; }
        public string BeforeSite { get; set; }
        public string AfterSite { get; set; }
        public string AdjustmentMemo { get; set; }

        public long ItemMasterId { get; set; }
        public long PurchaseOrderId { get; set; }
        public long RepairOrderId { get; set; }
        public string BeforeWarehouse { get; set; }
        public string AfterWarehouse { get; set; }

        public string BeforeLocation { get; set; }
        public string AfterLocation { get; set; }

        public string BeforeShelf { get; set; }
        public string AfterShelf { get; set; }

        public string BeforeBin { get; set; }
        public string AfterBin { get; set; }

        public long? BeforeSiteId { get; set; }
        public long? AfterSiteId { get; set; }

        public long? BeforeWarehouseId { get; set; }
        public long? AfterWarehouseId { get; set; }

        public long? BeforeLocationId { get; set; }
        public long? AfterLocationId { get; set; }

        public long? BeforeShelfId { get; set; }
        public long? AfterShelfId { get; set; }

        public long? BeforeBinId { get; set; }
        public long? AfterBinId { get; set; }

        public long? BeforeCategoryId { get; set; }
        public long? AfterCategoryId { get; set; }

        public string BeforePartNumber { get; set; }
        public string AfterPartNumber { get; set; }

        public string BeforeSerialNumber { get; set; }
        public string AfterSerialNumber { get; set; }

        public long BeforeQuantity { get; set; }
        public long AfterQuantity { get; set; }

        public decimal? BeforeUnitCost { get; set; }
        public decimal? AfterUnitCost { get; set; }

        public decimal? BeforeUnitSalesPrice { get; set; }
        public decimal? AfterUnitSalesPrice { get; set; }

        public decimal? BeforeDiscountSalesPrice { get; set; }
        public decimal? AfterDiscountSalesPrice { get; set; }

        public decimal? BeforeLotCostAdjustment { get; set; }
        public decimal? AfterLotCostAdjustment { get; set; }

        public decimal? BeforeRevalueStockCost { get; set; }
        public decimal? AfterRevalueStockCost { get; set; }


        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
    }
}
