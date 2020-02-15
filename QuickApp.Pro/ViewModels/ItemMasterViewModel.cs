using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ItemMasterViewModel     
    {


        public long ItemMasterId { get; set; }

        public int? ItemCategoryId { get; set; }

        public int ItemTypeId { get; set; }

        public long? PartId { get; set; }

        public bool? IsAlternatePartChecked { get; set; }

        public long? PartAlternatePartId { get; set; }

        public bool? IsSerialized { get; set; }

        public bool? IsHotItem { get; set; } // Hot Item added 

        public bool? IsTimeLife { get; set; }

        public string SerialNumber { get; set; }

        public string CertifiedBy { get; set; }

        public DateTime? TagDate { get; set; }

        public string TagType { get; set; }

        public string PartsCertNum { get; set; }

        public long? ItemGroupId { get; set; }

        public long? ItemClassificationId { get; set; }

               public string AssetNumber { get; set; }

        public long? AssetAcquistionTypeId { get; set; }
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
        public bool? IsDeleted { get; set; }

        public bool? IsShippedDateAvailable { get; set; }

        public int? ShippedDays { get; set; }

        public bool? IsOtherDateAvailable { get; set; }

        public int OtherDays { get; set; }

        public bool? ActiveFlag { get; set; }

        public int? ProvisionId { get; set; }

        public long? ManufacturerId { get; set; }

       // public int? AircraftTypeId { get; set; }

        public bool? PMA { get; set; }

        public bool? DER { get; set; }

        public long? ATAChapterId { get; set; }

        public long? ATASubChapterId { get; set; }

        public long? ATAMainSub2Id { get; set; }


        public string NationalStockNumber { get; set; }

        public bool? IsSchematic { get; set; }

        public long? FileSystemId { get; set; }

        public int? OverhaulHours { get; set; }

        public int? RPHours { get; set; }

        public int? TestHours { get; set; }

        public string CSE { get; set; }

        public bool? RFQTracking { get; set; }

        public long? GLAccountId { get; set; }

        public long? PurchaseUnitOfMeasureId { get; set; }

        public long? StockUnitOfMeasureId { get; set; }

        public long? ExportUomId { get; set; }
        public string ExportECCN { get; set; }
        public string ITARNumber { get; set; }

        public long? ConsumeUnitOfMeasureId { get; set; }

        public long? SoldUnitOfMeasureId { get; set; }

        public int? LeadTimeDays { get; set; }

        // public int? LeadTimeHours { get; set; } 

        public int? ReorderPoint { get; set; }

        public int? ReorderQuantiy { get; set; }

        public int? MinimumOrderQuantity { get; set; }

        public bool? IsExchangeInfoAvailable { get; set; }

        public decimal? CoreValue { get; set; }

        public decimal? OverheadCost { get; set; }

        public decimal? PartListPrice { get; set; }

        public string NHA { get; set; }

        public decimal? POCoreCharge { get; set; }

        public decimal? ExchangeListPrice { get; set; }
        public int? TurnTimeRepairHours { get; set; }

        public string turnTimeRepairHours1 { get; set; }

        public int? TurnTimeOverhaulHours { get; set; }
        public decimal? SOCoreCharge { get; set; }

        public long? PriorityId { get; set; }

      

        public long? WarningId { get; set; }

        public string Memo { get; set; }

        public Int16? ExportCountryId { get; set; }

        public decimal? ExportValue { get; set; }

        public int? ExportCurrencyId { get; set; }

        public decimal? ExportWeight { get; set; }

        public string ExportWeightUnit { get; set; }

        public decimal? ExportSizeLength { get; set; }

        public decimal? ExportSizeWidth { get; set; }

        public decimal? ExportSizeHeight { get; set; }

        public string ExportSizeUnit { get; set; }

        public Byte? ExportClassificationId { get; set; }

        public decimal? PurchaseListPrice { get; set; }

        public Int16? PurchaseDiscountOffListPrice { get; set; }

        public decimal? PurchaseListPriceAfterDiscount { get; set; }

        public int? PurchaseCurrencyId { get; set; }

        public DateTime? PurchaseLastListPriceDate { get; set; }

        public DateTime? PurchaseLastDiscountPercentDate { get; set; }

        public DateTime? PurchaseLastListPriceAfterDiscountDate { get; set; }

        public bool? SalesIsFixedPrice { get; set; }

        public decimal? SalesPrice { get; set; }

        public int? SalesCurrencyId { get; set; }

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

        public long? EquipmentId { get; set; }

        public string AssetId { get; set; }

        public bool? CalibrationRequired { get; set; }


        public bool? FrequencyTypeMonths { get; set; }

        public bool? FrequencyTypeDays { get; set; }

        public bool? CertificationRequired { get; set; }

        public string CertificationFrequency { get; set; }

        public Int16? EquipmentTypeId { get; set; }
        public long? EquipmentUOMId { get; set; }

        public Byte? EquipmentValidationTypeId { get; set; }

        public decimal? UnitCost { get; set; }

        public string CapabilityVerifiedBy { get; set; }

        public DateTime? CapabilityVerificationDate { get; set; }

        public DateTime? ManufacturingDate { get; set; }

        public bool? ShelfLife { get; set; }

        public DateTime? OpenDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsProvisioned { get; set; }

        public bool? IsCapesAvailable { get; set; }

        public DateTime? EntryDate { get; set; }

        public bool? IsCMMExist { get; set; }

        public string CMMLink { get; set; }

        public bool? IsVerified { get; set; }

        public string CapesMemo { get; set; }

        public string ManufacturingDescription { get; set; }

        public string OverhaulDescription { get; set; }

        public string DistributeDescription { get; set; }

        public string CertifiedDescription { get; set; }

        public string RepairDescription { get; set; }

        public string ExchangeDescription { get; set; }

        public bool? VerifiedBy { get; set; }

        public DateTime? DateVerified { get; set; }

        public int? PlatformId { get; set; }

        public string SchematicDiagramFile { get; set; }

        public decimal? ListPrice { get; set; }

        public DateTime? PriceDate { get; set; }

        public bool? IsRFQTracking { get; set; }

        public int? CurrencyId { get; set; }

        public Byte? MarkUpPercent { get; set; }

        public Byte? DiscountPurchasePercent { get; set; }

        //public long? EquipId { get; set; }

        public Byte? DiscounSalesPercent { get; set; }

        public long? StoredUOM { get; set; }

        public long? ConsumeUOM { get; set; }

        public int? StockLevel { get; set; }

        public int? LeadTime { get; set; }

        public string Notes { get; set; }

        public string ToleranceMinimum { get; set; }

        public string ToleranceMaximum { get; set; }

        public string ToleranceExpected { get; set; }

        public string IntegrateWith { get; set; }

        public string Findings { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }

        public int? CompanyId { get; set; }

        public int? BusinessUnitId { get; set; }

        public int? DivisionId { get; set; }

        public int? DepartmentId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string PartNumber { get; set; }

        public  string Partdescription { get; set; }
        public string ParentPartId { get; set; }
        
        public long? ItemNonStockClassificationId { get; set; }
        public string Name { get; set; }

        public string Itemclassdescription { get; set; }
        public string EquipmentDescription { get; set; }
        public string[] AircraftTypeId { get; set; }

        public decimal? ShelfLifeAvailable { get; set; }
        public bool? isPma   { get; set; }
        public decimal? mfgHours { get; set; }
        public decimal? turnTimeMfg { get; set; }
        public decimal? turnTimeBenchTest { get; set; }
        public bool? IsExportUnspecified { get; set; }
        public bool? IsExportNONMilitary { get; set; }
        public bool? IsExportMilitary { get; set; }
        public bool? IsExportDual { get; set; }
        public int? oemPNId { get; set; }
        public string[] IntegrationPortalId { get; set; }
        public long? RevisedPartId { get; set; }
        public long? SiteId { get; set; }
        public long? WarehouseId { get; set; }
        public long? LocationId { get; set; }
        public long? ShelfId { get; set; }
        public long? BinId { get; set; }
        public class ItemMasterViewModelValidator : AbstractValidator<ItemMasterViewModel>
        {
            public ItemMasterViewModelValidator()
            {

            }
        }




    }
}
