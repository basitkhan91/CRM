using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class PurchaseOrderAudit
    {
        [Key]
        public long PurchaseOrderAuditId { get; set; }
        public long PurchaseOrderId { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public string ReferenceId { get; set; }
        public long? PriorityId { get; set; }
        public long RequestedBy { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public long ApproverId { get; set; }
        public DateTime? DateApproved { get; set; }
        public DateTime? NeedByDate { get; set; }
        public short? StatusId { get; set; }
        public long EmployeeId { get; set; }
        public long? VendorId { get; set; }
        public long? VendorContactId { get; set; }
        public long? ShipToCompanyId { get; set; }
        public int? ShipViaAccountId { get; set; }
        public string Terms { get; set; }
        public Int16? CreditTermsId { get; set; }
        public decimal? CreditLimit { get; set; }
        public string Notes { get; set; }
        public long? SiteId { get; set; }
        public long? WarehouseId { get; set; }
        public long? LocationId { get; set; }
        public long? ShipToAddressId { get; set; }
        public long? ShipToContactId { get; set; }
        public string ShipToMemo { get; set; }
        public long? BillToAddressId { get; set; }
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
        public bool? IsActive { get; set; }
        public string ShipToSiteName { get; set; }
        public string BillToSiteName { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal HandlingCost { get; set; }
        public long BillToContactId { get; set; }
        public long ShipViaId { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
