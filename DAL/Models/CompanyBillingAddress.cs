using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class CompanyBillingAddress:TempAddress
    {
        [Key]
        public long CompanyBillingAddressId { get; set; }
        public long LegalEntityId { get; set; }
		[ForeignKey("AddressId")]
		public long AddressId { get; set; }
        public string SiteName { get; set; }
        public bool? IsPrimary { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

		public virtual Address Address { get; set; }
    }
}
