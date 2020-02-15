using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DAL.Models
{
    public class ItemMaster : PasBase
    {
        [Key]
        public long? ItemMasterId { get; set; }
        [ForeignKey("MasterPartId")]
        public long MasterPartId { get; set; }
        public bool? IsAlternatePartChecked { get; set; }
        public long? PartAlternatePartId { get; set; }
        public string NHA { get; set; }
        public bool? IsSerialized { get; set; }

        public bool? IsHotItem { get; set; }
        public bool? IsTimeLife { get; set; }
        public Int32? ItemTypeId { get; set; }
        public long? ItemGroupId { get; set; }
        public long? ItemClassificationId { get; set; }
        
        public bool? IsHazardousMaterial { get; set; }
        public bool? IsExpirationDateAvailable { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public bool? IsReceivedDateAvailable { get; set; }
        public int? DaysReceived { get; set; }
        public bool? IsManufacturingDateAvailable { get; set; }
        public int? ManufacturingDays { get; set; }
        public bool? IsTagDateAvailable { get; set; }
        public string TagDays { get; set; }
        public bool? IsOpenDateAvailable { get; set; }
        public int? OpenDays { get; set; }
        public bool? IsShippedDateAvailable { get; set; }
        public int? ShippedDays { get; set; }
        public bool? IsOtherDateAvailable { get; set; }
        public string PartNumber { get; set; }
        public string PartDescription { get; set; }
        public int? OtherDays { get; set; }
        public int? ProvisionId { get; set; }
        public bool? PMA { get; set; }
        public bool? DER { get; set; }
        public string NationalStockNumber { get; set; }
        public bool? IsSchematic { get; set; }
        public int? OverhaulHours { get; set; }
        public int? RPHours { get; set; }
        public int? TestHours { get; set; }
        public string CSE { get; set; }
        public bool? RFQTracking { get; set; }
        public long? ExportUomId { get; set; }
        public long? SoldUnitOfMeasureId { get; set; }
        public int? LeadTimeDays { get; set; }
       // public int? LeadTimeHours { get; set; }
        public int? ReorderPoint { get; set; }
        public int? ReorderQuantiy { get; set; }
        public int? MinimumOrderQuantity { get; set; }
        public bool? IsExchangeInfoAvailable { get; set; }
        public decimal? CoreValue { get; set; }
        public decimal? ExchangeListPrice { get; set; }
        public decimal? OverheadCost { get; set; }
        public decimal? PartListPrice { get; set; }
        public int? TurnTimeRepairHours { get; set; }
        public int? TurnTimeOverhaulHours { get; set; }
        public decimal? POCoreCharge { get; set; }
        public decimal? SOCoreCharge { get; set; }
        public DateTime? SalesLastSalePriceDate { get; set; }
        public bool? SalesMarkUpOnPurchaseListPriceActive { get; set; }
        public decimal? SalesMarkUpOnListPrice { get; set; }
        public decimal? SalesMarkUpOnListPriceAfterDisc { get; set; }
        public decimal? SalesBaselineSalesPrice { get; set; }
        public decimal? SalesDiscountPercent { get; set; }
        public DateTime? SalesLastMarkUpPercentOnListPriceDate { get; set; }
        public DateTime? SalesLastMakUpPercentOnListPriceAfterDiscDate { get; set; }
        public DateTime? SalesLastBaselineSalesPriceDate { get; set; }
        public DateTime? SalesLastSalesDiscountPercentDate { get; set; }
        public bool? StandAloneEquipment { get; set; }
        public bool? ComponentEquipment { get; set; }
        public bool? ShelfLife { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public decimal? ExportWeight { get; set; }
        public string ExportWeightUnit { get; set; }
        public decimal? ExportSizeLength { get; set; }
        public decimal? SalesPrice { get; set; }
        public decimal? ExportSizeWidth { get; set; }
        public decimal? ExportSizeHeight { get; set; }
        public DateTime? PurchaseLastDiscountPercentDate { get; set; }
        public string ExportSizeUnit { get; set; }
        public DateTime? PurchaseLastListPriceDate { get; set; }
        public decimal? ListPrice { get; set; }
        public DateTime? PriceDate { get; set; }
        public decimal? UnitCost { get; set; }
        public Byte? DiscountPurchasePercent { get; set; }
        public bool? SalesIsFixedPrice { get; set; }
        public DateTime? PurchaseLastListPriceAfterDiscountDate { get; set; }
        public long? ItemNonStockClassificationId { get; set; }
        public int? StockLevel { get; set; }

        [ForeignKey("ManufacturerId")]
        public long? ManufacturerId { get; set; }


        [ForeignKey("ATAChapterId")]
        public long? ATAChapterId { get; set; }

        [ForeignKey("ATASubChapterId")]
        public long? ATASubChapterId { get; set; }      


        public long? GLAccountId { get; set; }
        [ForeignKey("PurchaseUnitOfMeasureId")]

        public long? PurchaseUnitOfMeasureId { get; set; }

        [ForeignKey("StockUnitOfMeasureId")]
        public long? StockUnitOfMeasureId { get; set; }

        [ForeignKey("ConsumeUnitOfMeasureId")]
        public long? ConsumeUnitOfMeasureId { get; set; }
      
        [ForeignKey("PriorityId")]
        public long? PriorityId { get; set; }

        //[ForeignKey("IntegrationPortalId")]
        //public int? IntegrationPortalId { get; set; }

        [ForeignKey("WarningId")]
        public long? WarningId { get; set; }

        public string Memo { get; set; }

        public string ExportECCN { get; set; }
        
        public string ITARNumber { get; set; }

        [ForeignKey("ExportCountryId")]
        public Int16? ExportCountryId { get; set; }

        public decimal? ExportValue { get; set; }

        [ForeignKey("ExportCurrencyId")]
        public int? ExportCurrencyId { get; set; }

        [ForeignKey("ExportClassificationId")]
        public Byte? ExportClassificationId { get; set; }

        public Int16? PurchaseDiscountOffListPrice { get; set; }
        public decimal? PurchaseListPriceAfterDiscount { get; set; }

        [ForeignKey("PurchaseCurrencyId")]
        public int? PurchaseCurrencyId { get; set; }


        [ForeignKey("SalesCurrencyId")]
        public int? SalesCurrencyId { get; set; }

     
        [ForeignKey("CurrencyId")]
        public int? CurrencyId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public decimal? ShelfLifeAvailable { get; set; }
        public bool? isPma { get; set; }
        public decimal? mfgHours { get; set; }
        public decimal? turnTimeMfg { get; set; }
        public decimal? turnTimeBenchTest { get; set; }
        public bool? IsExportUnspecified { get; set; }
        public bool? IsExportNONMilitary { get; set; }
        public bool? IsExportMilitary { get; set; }
        public bool? IsExportDual { get; set; }
        
        public int? oemPNId { get; set; } 
        public  long? RepairUnitOfMeasureId { get; set; }
        public long? RevisedPartId { get; set; }
        public long? SiteId { get; set; }
        public long? WarehouseId { get; set; }
        public long? LocationId { get; set; }
        public long? ShelfId { get; set; }
        public long? BinId { get; set; }
        public long? AssetAcquistionTypeId { get; set; }




        public virtual Manufacturer Manufacturer { get;set;}
        public virtual Provision Provision {get;set;}
        public virtual Priority Priority { get; set; }
        public virtual ItemClassfication ItemClassification { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual ExportClassification ExportClassification { get; set; }
        public virtual GLAccount GLAccount { get; set; }
        public virtual ItemNonStockClassification ItemNonStockClassification { get; set; }

        public virtual MasterParts MasterParts { get; set; }


    }


}

