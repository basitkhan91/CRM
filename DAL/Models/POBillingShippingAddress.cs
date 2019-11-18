using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class POBillingShippingAddress
    {
        [Key]
        public long POBlShpId { get; set; }
        [ForeignKey("POAddressId")]
        public long POAddressId { get; set; }
        public int UserType { get; set; }
        public int AddressType { get; set; }
        public long AddressId { get; set; }
        public long ContactId { get; set; }
        public bool IsOnlyPOAddress { get; set; }
        public string Memo { get; set; }
        public long ReferenceId { get; set; }
        public string CreatedBy { get; set;}
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
