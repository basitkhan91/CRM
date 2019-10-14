using System;

namespace QuickApp.Pro.ViewModels
{
    public class RepairOrderViewModel
    {
        #region OLD


        //public long RepairOrderId { get; set; }
        //public string RepairOrderNumber { get; set; }
        //public string ReferenceId { get; set; }
        //public Nullable<short> PriorityId { get; set; }
        //public string RequestedBy { get; set; }
        //public System.DateTime DateRequested { get; set; }
        //public string Approver { get; set; }
        //public Nullable<System.DateTime> DateApprovied { get; set; }
        //public Nullable<System.DateTime> NeedByDate { get; set; }
        //public Nullable<short> StatusId { get; set; }
        //public string EmployeeId { get; set; }
        //public Nullable<long> VendorId { get; set; }
        //public Nullable<long> VendorContactId { get; set; }
        //public Nullable<long> VendorAddressId { get; set; }
        //public Nullable<long> ShippingAddressId { get; set; }
        //public Nullable<long> ReturnAddressId { get; set; }
        //public Nullable<int> ShipViaAccountId { get; set; }
        //public Nullable<int> ShipToCompanyId { get; set; }
        //public string Terms { get; set; }
        //public Nullable<short> CreditLimit { get; set; }
        //public string Notes { get; set; } 
        //public Nullable<long> IssuedToAddressId { get; set; }
        //public string IssuedToContactName { get; set; }
        //public string IssuedToMemo { get; set; }
        //public Nullable<long> ShipToAddressId { get; set; }
        //public string ShipToContactName { get; set; }
        //public string ShipToMemo { get; set; }
        //public Nullable<long> BillToAddressId { get; set; }
        //public string BillToContactName { get; set; }
        //public string BillToMemo { get; set; }
        //public int MasterCompanyId { get; set; }
        //public string CreatedBy { get; set; }
        //public string UpdatedBy { get; set; }
        //public System.DateTime CreatedDate { get; set; }
        //public System.DateTime UpdatedDate { get; set; }
        //public Nullable<bool> IsActive { get; set; }
        //public string TrackingNumber { get; set; }
        //public string DeferredReceiver { get; set; }
        //public Int16? ShipToUserType { get; set; }
        //public Int16? BillToUserType { get; set; }
        //public string ShipToUserName { get; set; }
        //public string BillToUserName { get; set; }
        //public bool? Resale { get; set; }

        #endregion

        public long RepairOrderId { get; set; }
        public string RepairOrderNumber { get; set; }
        public DateTime? NeedByDate { get; set; }
        public int? PriorityId { get; set; }
        public bool? DeferredReceiver { get; set; }
        public int VendorId { get; set; }
        public int? VendorContactId { get; set; }
        public decimal? CreditLimit { get; set; }
        public int RequisitionerId { get; set; }
        public int ApproverId { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? StatusId { get; set; }
        public bool? Resale { get; set; }
        public int? ShipToUserTypeId { get; set; }
        public int? ShipToUserId { get; set; }
        public int? ShipToAddressId { get; set; }
        public int? ShipToContactId { get; set; }
        public int? BillToUserTypeId { get; set; }
        public int? BillToUserId { get; set; }
        public int? BillToAddressId { get; set; }
        public int? BillToContactId { get; set; }
        public string BillToMemo { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string RoMemo { get; set; }
        public int? ManagementStructureId { get; set; }
        public int? CreditTermsId { get; set; }
        public DateTime? OpenDate { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public string VendorContactPhone { get; set; }
        public int? ShipViaId { get; set; }
        public decimal? ShippingCost { get; set; }
        public decimal? HandlingCost { get; set; }
        public int? ShippingId { get; set; }
        public string ShippingUrl { get; set; }
        public string ShipToMemo { get; set; }
    }
}
