using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class PurchaseOrder : PasBase
    {
        [Key]
        public long? PurchaseOrderId { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public string ReferenceId { get; set; }
        public Nullable<long> PriorityId { get; set; }
        public long RequestedBy { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public long ApproverId { get; set; }
        public Nullable<System.DateTime> DateApproved { get; set; }
        public Nullable<System.DateTime> NeedByDate { get; set; }
        public Nullable<short> StatusId { get; set; }
        public long EmployeeId { get; set; }
        [ForeignKey("VendorId")]
        public Nullable<long> VendorId { get; set; }
        public Nullable<long> VendorContactId { get; set; }
        public Nullable<int> ShipToCompanyId { get; set; }
        public int? ShipViaAccountId { get; set; }
        public string Terms { get; set; }
        public Int16? CreditTermsId { get; set; }
        public Nullable<decimal> CreditLimit { get; set; }
        public string Notes { get; set; }
        public Nullable<long> SiteId { get; set; }
        public Nullable<long> WarehouseId { get; set; }
        public Nullable<long> LocationId { get; set; }
        //public Nullable<long> IssuedToAddressId { get; set; }
        //public string IssuedToContactName { get; set; }
        //public string IssuedToMemo { get; set; }
        public Nullable<long> ShipToAddressId { get; set; }
        public Nullable<long> ShipToContactId { get; set; }
        public string ShipToMemo { get; set; }
        public Nullable<long> BillToAddressId { get; set; }
        public string BillToContactName { get; set; }
        public string BillToMemo { get; set; }
        public int MasterCompanyId { get; set; }
        public long ManagementStructureId { get; set; }
        public Int16? ShipToUserType { get; set; }
        public Int16? BillToUserType { get; set; }
        public long ShipToUserId { get; set; }
        public long BillToUserId { get; set; }
        public bool? DeferredReceiver { get; set; } 
        public bool? Resale { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string ShipToSiteName { get; set; }
        public string BillToSiteName { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal HandlingCost { get; set; }
        public long BillToContactId { get; set; }
        public long ShipViaId { get; set; }
        public long ShipToSiteId { get; set; }
        public long BillToSiteId { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAccountNo { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL { get; set; }
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
        public bool IsDeleted { get; set; }

        public virtual ICollection<PurchaseOrderPart> PurchaseOderPart { get; set; }
        public virtual List<StockLine> StockLine { get; set; }
        public virtual List<TimeLife> TimeLife { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}
