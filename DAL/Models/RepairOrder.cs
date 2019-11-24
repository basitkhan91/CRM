using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class RepairOrder
    {
        [Key]
        public long RepairOrderId { get; set; }
        public string RepairOrderNumber { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public DateTime? NeedByDate { get; set; }
        public long? PriorityId { get; set; }
        public bool? DeferredReceiver { get; set; }
        public long? VendorId { get; set; }
        public int? VendorContactId { get; set; }
        public string VendorContactPhone { get; set; }
        public decimal? CreditLimit { get; set; }
        public short? CreditTermsId { get; set; }
        public int? RequisitionerId { get; set; }
        public int? ApproverId { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? StatusId { get; set; }
        public bool? Resale { get; set; }
        public int? ManagementStructureId { get; set; }
        public string RoMemo { get; set; }
        public int? ShipToUserTypeId { get; set; }
        public long? ShipToUserId { get; set; }
        public int? ShipToAddressId { get; set; }
        public int? ShipToContactId { get; set; }
        public int? ShipViaId { get; set; }
        public decimal? ShippingCost { get; set; }
        public decimal? HandlingCost { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAcctNum { get; set; }
        public string ShippingUrl { get; set; }
        public string ShippingId { get; set; }
        public string ShipToMemo { get; set; }
        public string ShipToSiteName { get; set; }
        public string ShipToAddress1 { get; set; }
        public string ShipToAddress2 { get; set; }
        public string ShipToAddress3 { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToStateOrProvince { get; set; }
        public string ShipToPostalCode { get; set; }
        public string ShipToCountry { get; set; }
        public int? ShipToSiteId { get; set; }
        public int? BillToUserTypeId { get; set; }
        public int? BillToUserId { get; set; }
        public int? BillToAddressId { get; set; }
        public int? BillToContactId { get; set; }
        public int? BillToSiteId { get; set; }
        public string BillToAddress1 { get; set; }
        public string BillToAddress2 { get; set; }
        public string BillToAddress3 { get; set; }
        public string BillToCity { get; set; }
        public string BillToStateOrProvince { get; set; }
        public string BillToPostalCode { get; set; }
        public string BillToCountry { get; set; }
        public string BillToMemo { get; set; }
        public string BillToSiteName { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        [NotMapped]
        public DateTime? CreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [NotMapped]
        public string VendorCode { get; set; }
        [NotMapped]
        public string VendorName { get; set; }
        //[NotMapped]
        public long? RequestedBy { get; set; }
        public virtual ICollection<RepairOrderPart> RepairOrderPart { get; set; }
        public virtual Vendor Vendor { get; set; }
    }

    [NotMapped]
    public class RepairOrderDto
    {
        public long RepairOrderId { get; set; }
        public string RepairOrderNumber { get; set; }
        public int? StatusId { get; set; }
        public string Status { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public string VendorContact { get; set; }
        public string ContactPhone { get; set; }
        public string RequestedBy { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public DateTime? NeedByDate { get; set; }
        public DateTime? DateApproved { get; set; }
        public string Approver { get; set; }
        public decimal? CreditLimit { get; set; }
        public string Terms { get; set; }
        public string Priority { get; set; }
        public bool? DeferredReceiver { get; set; }
        public bool? Resale { get; set; }
        public int? ManagementStructureId { get; set; }
        public string Memo { get; set; }
        public List<RepairOrderPartsDto> RepairOrderPart { get; set; }
    }

    [NotMapped]
    public class RepairOrderPartsDto : BaseDto
    {
        public long RepairOrderId { get; set; }
        public long RepairOrderPartRecordId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsParent { get; set; }
        public string PartDescription { get; set; }
        public bool? IsSerialized { get; set; }
        public bool? IsTimeLife { get; set; }
        public int? ConditionId { get; set; }
        public int? GlAccountId { get; set; }
        public int? UnitCost { get; set; }
        public decimal? ExtendedCost { get; set; }
        public int? ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }
        public List<RepairOrderSplitPartsDto> RepairOrderSplitParts { get; set; }
    }

    [NotMapped]
    public class RepairOrderSplitPartsDto : BaseDto
    {
        public string UserType { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
    }

    [NotMapped]
    public class BaseDto
    {
        public long ItemMasterId { get; set; }
        public string PartNumber { get; set; }
        public int? QuantityOrdered { get; set; }
        public int? QuantityReceived { get; set; }
        public int? QuantityRejected { get; set; }
        public int? QuantityBackOrdered { get; set; }
        public string Status { get; set; }
        public int? ManagementStructureId { get; set; }
        public int? StockLineId { get; set; }
        public string StockLineNumber { get; set; }
        public string ControlId { get; set; }
        public string ControlNumber { get; set; }

    }
}
