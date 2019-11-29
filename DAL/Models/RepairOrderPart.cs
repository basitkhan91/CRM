using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class RepairOrderPart
    {
        [Key]
        public long RepairOrderPartRecordId { get; set; }
        [ForeignKey("RepairOrderId")]
        public long RepairOrderId { get; set; }
        public int? AssetId { get; set; }
        public long? ConditionId { get; set; }
        public string CreatedBy { get; set; }
        public int? DiscountAmount { get; set; }
        public int? DiscountPercent { get; set; }
        public int? DiscountPerUnit { get; set; }
        public int? ExtendedCost { get; set; }
        public string ForeignExchangeRate { get; set; }
        public int? FunctionalCurrencyId { get; set; }
        public int? ReportCurrencyId { get; set; }
        public int? GlAccountId { get; set; }
        public bool? IsParent { get; set; }
        public long ItemMasterId { get; set; }
        public int? ItemTypeId { get; set; }
        public int? ManagementStructureId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string Memo { get; set; }
        public DateTime? NeedByDate { get; set; }
        public int? PartNumberId { get; set; }
        public int? QuantityOrdered { get; set; }
        public int? SalesOrderId { get; set; }
        public int? UnitCost { get; set; }
        public long? UOMId { get; set; }
        public string UpdatedBy { get; set; }
        public long? WorkOrderId { get; set; }
        public int? AltPartNumberId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string RoPartSplitAddress1 { get; set; }
        public string RoPartSplitAddress2 { get; set; }
        public string RoPartSplitAddress3 { get; set; }
        public int? RoPartSplitAddressId { get; set; }
        public string RoPartSplitCity { get; set; }
        public string RoPartSplitCountry { get; set; }
        public string RoPartSplitPostalCode { get; set; }
        public string RoPartSplitStateOrProvince { get; set; }
        public int? RoPartSplitUserId { get; set; }
        public int? RoPartSplitUserTypeId { get; set; }
        public List<RoPartSplits> RoPartSplits { get; set; }
        [NotMapped]
        public virtual ItemMaster ItemMaster { get; set; }
        [NotMapped]
        public long StockLineCount { get; set; }
        [NotMapped]
        [ForeignKey("RepairOrderPartRecordId")]
        public virtual Address RoPartSplitAddress { get; set; }
        [NotMapped]
        public int? StatusId { get; set; }
        public short? QuantityBackOrdered { get; set; }
        public bool IsActive { get; set; }

        public List<StockLine> StockLine { get; set; }
    }

    [NotMapped]
    public class RoPartSplits
    {
        public long RepairOrderId { get; set; }
        public long ItemMasterId { get; set; }
        public int? AssetId { get; set; }
        public int? PartNumberId { get; set; }
        public int? RoPartSplitUserId { get; set; }
        public int? RoPartSplitUserTypeId { get; set; }
        public string RoPartSplitAddress1 { get; set; }
        public string RoPartSplitAddress2 { get; set; }
        public string RoPartSplitAddress3 { get; set; }
        public int? RoPartSplitAddressId { get; set; }
        public string RoPartSplitCity { get; set; }
        public string RoPartSplitCountry { get; set; }
        public string RoPartSplitPostalCode { get; set; }
        public string RoPartSplitStateOrProvince { get; set; }
        public int? QuantityOrdered { get; set; }
        public long? UOMId { get; set; }
        public int? ManagementStructureId { get; set; }
        public DateTime? NeedByDate { get; set; }
        public long RepairOrderPartRecordId { get; set; }
    }

    [NotMapped]
    public class RepairOrderPartDto
    {
        public long RepairOrderId { get; set; }
        public bool? IsParent { get; set; }
        public long ItemMasterId { get; set; }
        public int? AssetId { get; set; }
        public int? PartNumberId { get; set; }
        public int? AltPartNumberId { get; set; }
        public int? ItemTypeId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? GlAccountId { get; set; }
        public long? UOMId { get; set; }
        public DateTime? NeedByDate { get; set; }
        public long? ConditionId { get; set; }
        public int? QuantityOrdered { get; set; }
        public int? UnitCost { get; set; }
        public int? DiscountAmount { get; set; }
        public int? DiscountPercent { get; set; }
        public int? DiscountPerUnit { get; set; }
        public int? ExtendedCost { get; set; }
        public string ForeignExchangeRate { get; set; }
        public int? FunctionalCurrencyId { get; set; }
        public int? ReportCurrencyId { get; set; }
        public long? WorkOrderId { get; set; }
        public int? SalesOrderId { get; set; }
        public int? ManagementStructureId { get; set; }
        public string Memo { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public long RepairOrderPartRecordId { get; set; }
        public List<RoPartSplits> RoPartSplits { get; set; }
    }

    [NotMapped]
    public class RepairOrderPartViewDto
    {
        public long RepairOrderPartRecordId { get; set; }
        public long RepairOrderId { get; set; }
        public string PartNumber { get; set; }
        public string AltPartNumber { get; set; }
        public string PartDescription { get; set; }
        public string ItemType { get; set; }
        public string Manufacturer { get; set; }
        public string GlAccount { get; set; }
        public string UnitOfMeasure { get; set; }
        public string Condition { get; set; }
        public string FunctionalCurrency { get; set; }
        public string ReportCurrency { get; set; }
        public string WorkOrderNo { get; set; }
        public int? SalesOrderNo { get; set; }
        public string ReapairOrderNo { get; set; }
        public DateTime? NeedByDate { get; set; }
        public int? QuantityOrdered { get; set; }
        public int? UnitCost { get; set; }
        public int? DiscountPercent { get; set; }
        public int? DiscountPerUnit { get; set; }
        public int? DiscountAmount { get; set; }
        public int? ExtendedCost { get; set; }
        public int? FunctionalCurrencyId { get; set; }
        public int? ReportCurrencyId { get; set; }
        public string ForeignExchangeRate { get; set; }
        public int? ManagementStructureId { get; set; }
        public string Memo { get; set; }
        public List<RepairOrderSplitParts> RepairOrderSplitParts { get; set; }

    }

    [NotMapped]
    public class RepairOrderSplitParts
    {
        public long RepairOrderPartRecordId { get; set; }
        public long RepairOrderId { get; set; }
        public string PartNumber { get; set; }
        public string PartDescription { get; set; }
        public string UserType { get; set; }
        public string User { get; set; }
        public string RoPartSplitAddress1 { get; set; }
        public string RoPartSplitAddress2 { get; set; }
        public string RoPartSplitAddress3 { get; set; }
        public string RoPartSplitCity { get; set; }
        public string RoPartSplitCountry { get; set; }
        public string RoPartSplitPostalCode { get; set; }
        public string RoPartSplitState { get; set; }
        public int? ManagementStructureId { get; set; }
        public string UnitOfMeasure { get; set; }
        public int? QuantityOrdered { get; set; }
        public DateTime? NeedByDate { get; set; }


        //"poPartSplitState":null,

    }
}
