using System;
using System.Collections.Generic;

namespace QuickApp.Pro.ViewModels
{
    public class RepairOrderPartViewModel
    {
        public long RepairOrderPartRecordId { get; set; }
        public long RepairOrderId { get; set; }
        public int? AltPartNumberId { get; set; }
        public int? AssetId { get; set; }
        public long? ConditionId { get; set; }
        public string CreatedBy { get; set; }
        public int? DiscountAmount { get; set; }
        public int? DiscountPercent { get; set; }
        public int? DiscountPerUnit { get; set; }
        public int? ExtendedCost { get; set; }
        public string ForeignExchangeRate { get; set; }
        public int? FunctionalCurrencyId { get; set; }
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
        public int? ReportCurrencyId { get; set; }
        public int? SalesOrderId { get; set; }
        public int? UnitCost { get; set; }
        public int? UOMId { get; set; }
        public string UpdatedBy { get; set; }
        public int? WorkOrderId { get; set; }
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
    }

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
        public int? UOMId { get; set; }
        public int? ManagementStructureId { get; set; }
        public DateTime? NeedByDate { get; set; }
        public long RepairOrderPartRecordId { get; set; }
    }

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
        public int? UOMId { get; set; }
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
}
