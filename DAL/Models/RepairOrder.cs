using System;
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
        public long PriorityId { get; set; }
        public bool? DeferredReceiver { get; set; }
        public int VendorId { get; set; }
        public int? VendorContactId { get; set; }
        public string VendorContactPhone { get; set; }
        public decimal? CreditLimit { get; set; }
        public int? CreditTermsId { get; set; }
        public int RequisitionerId { get; set; }
        public int ApproverId { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? StatusId { get; set; }
        public bool? Resale { get; set; }
        public int? ManagementStructureId { get; set; }
        public string RoMemo { get; set; }
        public int? ShipToUserTypeId { get; set; }
        public long ShipToUserId { get; set; }
        public int? ShipToAddressId { get; set; }
        public int? ShipToContactId { get; set; }
        public int? ShipViaId { get; set; }
        public decimal? ShippingCost { get; set; }
        public decimal? HandlingCost { get; set; }
        public string ShipVia { get; set; }
        public string ShippingAcctNum { get; set; }
        public string ShippingUrl { get; set; }
        public int? ShippingId { get; set; }
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

        // NOT USING THIS ANYMORE
        [NotMapped]
        public DateTime? CreatedDate { get; set; }
        [NotMapped]
        public bool? IsActive { get; set; }
        [NotMapped]
        public DateTime? UpdatedDate { get; set; }
        [NotMapped]
        public string VendorCode { get; set; }
        [NotMapped]
        public string VendorName { get; set; }
    }
}
