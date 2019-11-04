using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PurchaseOrderViewModel:PurchaseOrderBaseViewModel
    {


        public string ReferenceId { get; set; }
        public Nullable<long> PriorityId { get; set; }
        public long RequisitionerId { get; set; }
        public System.DateTime OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public long ApproverId { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public Nullable<System.DateTime> NeedByDate { get; set; }
        public Nullable<short> StatusId { get; set; }
        public long EmployeeId { get; set; }
        public Nullable<long> VendorId { get; set; }
        public Nullable<long> VendorContactId { get; set; }
        public string VendorContactPhone { get; set; }
        public string PoMemo { get; set; }
        public Nullable<int> ShipToCompanyId { get; set; }
        public Nullable<int> ShipViaAccountId { get; set; }
        public string Terms { get; set; }
        public Int16? CreditTermsId { get; set; }
        public Nullable<decimal> CreditLimit { get; set; }
        public string Notes { get; set; }
        public Nullable<long> SiteId { get; set; }
        public Nullable<long> WarehouseId { get; set; }
        public Nullable<long> LocationId { get; set; }
        public Nullable<long> IssuedToAddressId { get; set; }
        public string IssuedToContactName { get; set; }
        public string IssuedToMemo { get; set; }
        public Nullable<long> ShipToAddressId { get; set; }
        public long ShipToContactId { get; set; }
        public long ShipViaId { get; set; }
        public string ShipToMemo { get; set; }
        public Nullable<long> BillToAddressId { get; set; }
        public string BillToContactName { get; set; }
        public string BillToMemo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Int16? ShipToUserTypeId { get; set; }
        public Int16? BillToUserTypeId { get; set; }
        public long ShipToUserId { get; set; }
        public long BillToUserId { get; set; }
        public bool DeferredReceiver { get; set; }
        public bool Resale { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public int ManagementStructureId { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal HandlingCost { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL{get;set;}
        public long BillToContactId { get; set; }
        public string ShipToSiteName { get; set; }
        public string BillToSiteName { get; set; }
        public long ShipToSiteId { get; set; }
        public long BillToSiteId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAccountNo { get; set; }
        public string ShipToContact { get; set; }
        public string BillToContact { get; set; }
        public string ShipToAddress1 { get; set; }
        public string ShipToAddress2 { get; set; }
        public string ShipToAddress3 { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToState { get; set; }
        public string ShipToPostalCode { get; set; }
        public string ShipToCountry { get; set; }
        public string BillToAddress1 { get; set; }
        public string BillToAddress2 { get; set; }
        public string BillToAddress3 { get; set; }
        public string BillToCity { get; set; }
        public string BillToState { get; set; }
        public string BillToPostalCode { get; set; }
        public string BillToCountry { get; set; }
    }
}

