using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class RepairOrder
    {
        [Key]
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
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
