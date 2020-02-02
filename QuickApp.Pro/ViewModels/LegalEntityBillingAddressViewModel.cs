using System;

namespace QuickApp.Pro.ViewModels
{
    public class LegalEntityBillingAddressViewModel
    {
        public long LegalEntityBillingAddressId { get; set; }
        public long? LegalEntityId { get; set; }
        public long AddressId { get; set; }
        public bool IsPrimary { get; set; }
        public string SiteName { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }

        public Boolean Primary { get; set; }
        public string Site { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
}
