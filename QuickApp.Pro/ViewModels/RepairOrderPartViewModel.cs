using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class RepairOrderPartViewModel
    {
        public long RepairOrderPartRecordId { get; set; }
        public long RepairOrderId { get; set; }
        public long ItemMasterId { get; set; }
        public string SerialNumber { get; set; }
        public bool NonInventory { get; set; }
        public string RequisitionedBy { get; set; }
        public Nullable<System.DateTime> RequisitionedDate { get; set; }
        public string Approver { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public Nullable<System.DateTime> NeedByDate { get; set; }
        public string Manufacturer { get; set; }
        public string Status { get; set; }
        public string Trace { get; set; }
        public string ConditionCode { get; set; }
        public Nullable<long> UOMId { get; set; }
        public Nullable<short> QuantityOrdered { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public Nullable<short> DiscountPerUnit { get; set; }
        public Nullable<short> DiscountCostPerUnit { get; set; }
        public Nullable<decimal> ExtendedCost { get; set; }
        public Nullable<int> TransactionalCurrencyId { get; set; }
        public Nullable<int> FunctionalCurrencyId { get; set; }
        public Nullable<decimal> ForeignExchangeRate { get; set; }
        public Nullable<long> WorkOrderId { get; set; }

        public Nullable<long> SalesOrderId { get; set; }
        public Nullable<int> GeneralLedgerAccounId { get; set; }
        public string Memo { get; set; }
        public Nullable<short> ROPartSplitUserTypeId { get; set; }
        public string ROPartSplitUserName { get; set; }
        public string ROPartSplitAddress1 { get; set; }
        public string ROPartSplitAddress2 { get; set; }
        public string ROPartSplitAddress3 { get; set; }
        public string ROPartSplitCity { get; set; }
        public string ROPartSplitState { get; set; }
        public string ROPartSplitPostalCode { get; set; }
        public string ROPartSplitCountry { get; set; }
        public Nullable<long> ManagementStructureId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public bool? isParent { get; set; }
       
    }
}
