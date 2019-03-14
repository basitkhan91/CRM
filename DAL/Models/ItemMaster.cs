using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ItemMaster : PasBase
    {
        public long? ItemMasterId { get; set; }

        //public int ItemCategoryId { get; set; }

        public int ItemTypeId { get; set; }
        //[ForeignKey("PartId")]
        //public long? PartId { get; set; }

        public bool? IsAlternatePartChecked { get; set; }

        public long? PartAlternatePartId { get; set; }
        public string NHA { get; set; }
        public bool? IsSerialized { get; set; }
        public bool? IsTimeLife { get; set; }
        public string SerialNumber { get; set; }

        public string CertifiedBy { get; set; }

        public DateTime? TagDate { get; set; }

        public string TagType { get; set; }

        public string PartsCertNum { get; set; }

        public long? ItemGroupId { get; set; }

        public long? ItemClassificationId { get; set; }
        

        public string AssetNumber { get; set; }

        public bool? IsAcquiredMethodBuy { get; set; }

        public bool? IsHazardousMaterial { get; set; }

        public bool? IsExpirationDateAvailable { get; set; }

        public DateTime? ExpirationDate { get; set; }

        public bool? IsReceivedDateAvailable { get; set; }

        public int DaysReceived { get; set; }

        public bool? IsManufacturingDateAvailable { get; set; }

        public int ManufacturingDays { get; set; }

        public bool? IsTagDateAvailable { get; set; }

        public string TagDays { get; set; }

        public bool? IsOpenDateAvailable { get; set; }

        public int OpenDays { get; set; }

        public bool? IsShippedDateAvailable { get; set; }

        public int ShippedDays { get; set; }

        public bool? IsOtherDateAvailable { get; set; }
        public string PartNumber { get; set; }
        public string PartDescription { get; set; }
      //  public string AlterPartNumber { get; set; }
        public int OtherDays { get; set; }

        public bool? ActiveFlag { get; set; }
        [ForeignKey("PartId")]
        public int? ProvisionId { get; set; }

        [ForeignKey("ManufacturerId")]
        public long? ManufacturerId { get; set; }

        [ForeignKey("AircraftTypeId")]
        public int? AircraftTypeId { get; set; }

        public bool? PMA { get; set; }

        public bool? DER { get; set; }
        [ForeignKey("ATAChapterId")]
        public long? ATAChapterId { get; set; }
        [ForeignKey("ATASubChapterId")]
        public long? ATASubChapterId { get; set; }
        [ForeignKey("ATAMainSub2Id")]
        public long? ATAMainSub2Id { get; set; }


        public string NationalStockNumber { get; set; }

        public bool? IsSchematic { get; set; }
        //[ForeignKey("FileSystemId")]
        //public long? FileSystemId { get; set; }

        public int OverhaulHours { get; set; }

        public int RPHours { get; set; }

        public int TestHours { get; set; }

        public string CSE { get; set; }

        public bool? RFQTracking { get; set; }

        public long? GLAccountId { get; set; }
        [ForeignKey("PurchaseUnitOfMeasureId")]
        public long? PurchaseUnitOfMeasureId { get; set; }
        [ForeignKey("StockUnitOfMeasureId")]
        public long? StockUnitOfMeasureId { get; set; }
        [ForeignKey("ConsumeUnitOfMeasureId")]
        public long? ConsumeUnitOfMeasureId { get; set; }

        public long? ExportUomId { get; set; }
        public long? SoldUnitOfMeasureId { get; set; }
        public int LeadTimeDays { get; set; }

        public int LeadTimeHours { get; set; }

        public int ReorderPoint { get; set; }

        public int ReorderQuantiy { get; set; }

        public int MinimumOrderQuantity { get; set; }

        public bool? IsExchangeInfoAvailable { get; set; }

        public decimal? CoreValue { get; set; }

        public decimal? ExchangeListPrice { get; set; }

        public decimal? OverheadCost { get; set; }

        public decimal? PartListPrice { get; set; }
        public int? TurnTimeRepairHours { get; set; }

        public int? TurnTimeOverhaulHours { get; set; }
        public decimal? POCoreCharge { get; set; }

        public decimal? SOCoreCharge { get; set; }
        [ForeignKey("PriorityId")]
        public long? PriorityId { get; set; }
        [ForeignKey("IntegrationPortalId")]
        public int? IntegrationPortalId { get; set; }
        [ForeignKey("WarningId")]
        public long? WarningId { get; set; }

        public string Memo { get; set; }
        [ForeignKey("ExportCountryId")]
        public Int16? ExportCountryId { get; set; }

        public decimal? ExportValue { get; set; }
        [ForeignKey("ExportCurrencyId")]
        public int? ExportCurrencyId { get; set; }

        public decimal? ExportWeight { get; set; }

        public string ExportWeightUnit { get; set; }

        public decimal? ExportSizeLength { get; set; }

        public decimal? ExportSizeWidth { get; set; }

        public decimal? ExportSizeHeight { get; set; }

        public string ExportSizeUnit { get; set; }
        [ForeignKey("ExportClassificationId")]
        public Byte? ExportClassificationId { get; set; }

        public decimal? PurchaseListPrice { get; set; }

        public Int16? PurchaseDiscountOffListPrice { get; set; }

        public decimal? PurchaseListPriceAfterDiscount { get; set; }
        [ForeignKey("PurchaseCurrencyId")]
        public int? PurchaseCurrencyId { get; set; }

        public DateTime? PurchaseLastListPriceDate { get; set; }

        public DateTime? PurchaseLastDiscountPercentDate { get; set; }

        public DateTime? PurchaseLastListPriceAfterDiscountDate { get; set; }

        public bool? SalesIsFixedPrice { get; set; }

        public decimal? SalesPrice { get; set; }
        [ForeignKey("SalesCurrencyId")]
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
        [ForeignKey("EquipmentTypeId")]
        public Int16? EquipmentTypeId { get; set; }
        [ForeignKey("EquipmentValidationTypeId")]
        public Byte? EquipmentValidationTypeId { get; set; }

        public decimal? UnitCost { get; set; }
        public long? EquipmentUOMId { get; set; }
        public string CapabilityVerifiedBy { get; set; }

        public DateTime? CapabilityVerificationDate { get; set; }

        public DateTime? ManufacturingDate { get; set; }

        public bool? IsShelfLifeAvailable { get; set; }

        public DateTime? OpenDate { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

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
        [ForeignKey("PlatformId")]
        public int? PlatformId { get; set; }

        public string SchematicDiagramFile { get; set; }

        public decimal? ListPrice { get; set; }

        public DateTime? PriceDate { get; set; }

        public bool? IsRFQTracking { get; set; }
        [ForeignKey("CurrencyId")]
        public int? CurrencyId { get; set; }

        public Byte MarkUpPercent { get; set; }

        public Byte DiscountPurchasePercent { get; set; }
        //public long? EquipId { get; set; }
        public Byte DiscounSalesPercent { get; set; }

        public long? StoredUOM { get; set; }

        public long? ConsumeUOM { get; set; }

        public int StockLevel { get; set; }

        public int LeadTime { get; set; }

        public string Notes { get; set; }

        public string ToleranceMinimum { get; set; }

        public string ToleranceMaximum { get; set; }

        public string ToleranceExpected { get; set; }

        public string IntegrateWith { get; set; }

        public string Findings { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        [ForeignKey("CompanyId")]
        public int? CompanyId { get; set; }
        [ForeignKey("BusinessUnitId")]
        public int? BusinessUnitId { get; set; }
        [ForeignKey("DivisionId")]
        public int? DivisionId { get; set; }
        [ForeignKey("DepartmentId")]
        public int? DepartmentId { get; set; }



        //public virtual Part Part {get;set;}
        public virtual Manufacturer Manufacturer { get;set;}

        public virtual Provision Provision {get;set;}


        public virtual Priority Priority { get; set; }

        public virtual ItemClassfication ItemClassification { get; set; }

        public virtual Currency Currency { get; set; }

        public virtual Equipment Equipment { get; set; }

        //public virtual UnitOfMeasure UnitOfMeasure { get; set; }

        //public virtual Countries Countries { get; set; }

        public virtual EquipmentValidationType EquipmentValidationType { get; set; }
         public virtual ExportClassification ExportClassification { get; set; }

    }


}

