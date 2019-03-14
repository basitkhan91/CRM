using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrder : PasBase
    {
        [Key]
        public long PurchaseOrderId { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public string ReferenceId { get; set; }
        public Nullable<short> PriorityId { get; set; }
        public string RequestedBy { get; set; }
        public System.DateTime DateRequested { get; set; }
        public string Approver { get; set; }
        public Nullable<System.DateTime> DateApprovied { get; set; }
        public Nullable<System.DateTime> NeedByDate { get; set; }
        public Nullable<short> StatusId { get; set; }
        public string EmployeeId { get; set; }
        public Nullable<long> VendorId { get; set; }
        public Nullable<long> VendorContactId { get; set; }
        public Nullable<int> ShipToCompanyId { get; set; }
        public Nullable<int> ShipViaAccountId { get; set; }
        public string Terms { get; set; }
        public Nullable<short> CreditLimit { get; set; }
        public string Notes { get; set; }
        public Nullable<long> SiteId { get; set; }
        public Nullable<long> WarehouseId { get; set; }
        public Nullable<long> LocationId { get; set; }
        public Nullable<long> IssuedToAddressId { get; set; }
        public string IssuedToContactName { get; set; }
        public string IssuedToMemo { get; set; }
        public Nullable<long> ShipToAddressId { get; set; }
        public string ShipToContactName { get; set; }
        public string ShipToMemo { get; set; }
        public Nullable<long> BillToAddressId { get; set; }
        public string BillToContactName { get; set; }
        public string BillToMemo { get; set; }
        public int? MasterCompanyId { get; set; }

        public Int16? ShipToUserType { get; set; }
        public Int16? BillToUserType { get; set; }
        public string ShipToUserName { get; set; }
        public string BillToUserName { get; set; }
        public bool? DeferredReceiver { get; set; }
        public bool? Resale { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }
}
