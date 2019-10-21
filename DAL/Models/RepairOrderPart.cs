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
        public bool? IsParent { get; set; }
        public long ItemMasterId { get; set; }
        public string SerialNumber { get; set; }
        public DateTime? NeedByDate { get; set; }
        public int? UOMId { get; set; }
        public int? QuantityOrdered { get; set; }
        public decimal? UnitCost { get; set; }
        public int? DiscountPerUnit { get; set; }
        public decimal? ExtendedCost { get; set; }
        public int? FunctionalCurrencyId { get; set; }
        public decimal? ForeignExchangeRate { get; set; }
        public int? WorkOrderId { get; set; }
        public int? SalesOrderId { get; set; }
        public string Memo { get; set; }
        public int? ManagementStructureId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        #region NEW FIELDS

        public string AssetId { get; set; }
        public int? PartNumberId { get; set; }
        public int? AlternatePartNumberId { get; set; }
        public int? ItemTypeId { get; set; }
        public int? MenufacturerId { get; set; }
        public int? GlAccountId { get; set; }
        public int? ConditionId { get; set; }
        public decimal? DiscountAmount { get; set; }
        public int? ReportCurrencyId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string ShipToPOBox { get; set; }
        public string ShipToLine1 { get; set; }
        public string ShipToLine2 { get; set; }
        public string ShipToLine3 { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToStateOrProvince { get; set; }
        public string ShipToPostalCode { get; set; }
        public string ShipToCountry { get; set; }
        public decimal? ShipToLatitude { get; set; }
        public decimal? ShipToLongitude { get; set; }
        public string BillToPOBox { get; set; }
        public string BillToLine1 { get; set; }
        public string BillToLine2 { get; set; }
        public string BillToLine3 { get; set; }
        public string BillToCity { get; set; }
        public string BillToStateOrProvince { get; set; }
        public string BillToPostalCode { get; set; }
        public string BillToCountry { get; set; }
        public decimal? BillToLatitude { get; set; }
        public decimal? BillToLongitude { get; set; }
        public string RoPartSplitUserTypeId { get; set; }
        public int? RoPartSplitUserId { get; set; }
        public int? RoPartSplitAddressId { get; set; }

        #endregion

        public List<RepairOrderPartChild> ChildObjects { get; set; }


        //public long ItemMasterId { get; set; }
        //public string SerialNumber { get; set; }
        //public bool NonInventory { get; set; }
        //public string RequisitionedBy { get; set; }
        //public Nullable<System.DateTime> RequisitionedDate { get; set; }
        //public string Approver { get; set; }
        //public Nullable<System.DateTime> ApprovedDate { get; set; }
        //public Nullable<System.DateTime> NeedByDate { get; set; }
        //public string Manufacturer { get; set; }
        //public string Status { get; set; }
        //public string Trace { get; set; }
        //public string ConditionCode { get; set; }
        //public Nullable<long> UOMId { get; set; }
        //public Nullable<short> QuantityOrdered { get; set; }
        //public Nullable<decimal> UnitCost { get; set; }
        //public Nullable<short> DiscountPerUnit { get; set; }
        //public Nullable<short> DiscountCostPerUnit { get; set; }
        //public Nullable<decimal> ExtendedCost { get; set; }
        //public Nullable<int> TransactionalCurrencyId { get; set; }
        //public Nullable<int> FunctionalCurrencyId { get; set; }
        //public Nullable<decimal> ForeignExchangeRate { get; set; }
        //public Nullable<long> WorkOrderId { get; set; }

        //public Nullable<long> SalesOrderId { get; set; }
        //public Nullable<int> GeneralLedgerAccounId { get; set; }
        //public string Memo { get; set; }
        //public Nullable<short> ROPartSplitUserTypeId { get; set; }
        //public string ROPartSplitUserName { get; set; }
        //public string ROPartSplitAddress1 { get; set; }
        //public string ROPartSplitAddress2 { get; set; }
        //public string ROPartSplitAddress3 { get; set; }
        //public string ROPartSplitCity { get; set; }
        //public string ROPartSplitState { get; set; }
        //public string ROPartSplitPostalCode { get; set; }
        //public string ROPartSplitCountry { get; set; }
        //public Nullable<long> ManagementStructureId { get; set; }
        //public string CreatedBy { get; set; }
        //public string UpdatedBy { get; set; }
        //public System.DateTime CreatedDate { get; set; }
        //public System.DateTime UpdatedDate { get; set; }
        //public Nullable<bool> IsActive { get; set; }
        //public bool? isParent { get; set; }
        //public virtual RepairOrder RepairOrder { get; set; }

    }

    public class RepairOrderPartChild
    {
        [Key]
        public long RepairOrderPartChildId { get; set; }
        [ForeignKey("RepairOrderId")]
        public long RepairOrderId { get; set; }
        public bool? IsParent { get; set; }
        public long ItemMasterId { get; set; }
        public string SerialNumber { get; set; }
        public string AssetId { get; set; }
        public int? PartNumberId { get; set; }
        public int? UOMId { get; set; }
        public int? QuantityOrdered { get; set; }
        public int? ManagementStructureId { get; set; }
        public DateTime? NeedByDate { get; set; }
        public string RoPartSplitUserTypeId { get; set; }
        public int? RoPartSplitUserId { get; set; }
        public int? RoPartSplitAddressId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
