using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrderPart
    {
        [Key]
        public long PurchaseOrderPartRecordId { get; set; }
        public long PurchaseOrderId { get; set; }
        [ForeignKey("ItemMasterId")]
        public long ItemMasterId { get; set; }
        public string SerialNumber { get; set; }
        public bool NonInventory { get; set; }
        public string RequisitionedBy { get; set; }
        public Nullable<System.DateTime> RequisitionedDate { get; set; }
        public string Approver { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public Nullable<System.DateTime> NeedByDate { get; set; }
        public long ManufacturerId { get; set; }
        public string Status { get; set; }
        public string Trace { get; set; }
        public string ConditionCode { get; set; }
        public Nullable<long> UOMId { get; set; }
        public Nullable<short> QuantityOrdered { get; set; }
        public Nullable<int> QuantityBackOrdered { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public Nullable<short> DiscountPerUnit { get; set; }
        public Nullable<short> DiscountCostPerUnit { get; set; }
        public Nullable<decimal> ExtendedCost { get; set; }
        public Nullable<int> TransactionalCurrencyId { get; set; }
        public Nullable<int> FunctionalCurrencyId { get; set; }
        public Nullable<decimal> ForeignExchangeRate { get; set; }
        public Nullable<long> WorkOrderId { get; set; }
        public Nullable<long> RepairOrderId { get; set; }
        public Nullable<long> SalesOrderId { get; set; }
        public Nullable<int> GeneralLedgerAccounId { get; set; }
        public string Memo { get; set; }
        public Nullable<short> POPartSplitUserTypeId { get; set; }
        public long? POPartSplitUserId { get; set; }
        public string POPartSplitAddress1 { get; set; }
        public string POPartSplitAddress2 { get; set; }
        public string POPartSplitAddress3 { get; set; }
        public string POPartSplitCity { get; set; }
        public string POPartSplitState { get; set; }
        public string POPartSplitPostalCode { get; set; }
        public string POPartSplitCountry { get; set; }
        public long? POPartSplitAddressId { get; set; }
        public Nullable<long> ManagementStructureId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public bool isParent { get; set; }
        public virtual PurchaseOrder PurchaseOrder { get; set; }
        public virtual ItemMaster ItemMaster { get; set; }
        public virtual List<PartStockLineMapper> PartStockLineMapper { get; set; }
        public virtual ICollection<StockLine> StockLine { get; set; }
        public virtual ICollection<TimeLife> TimeLife { get; set; }

        public virtual Address POPartSplitAddress { get; set; }
    }
}
