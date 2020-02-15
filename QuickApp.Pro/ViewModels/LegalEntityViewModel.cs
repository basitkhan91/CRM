using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class LegalEntityViewModel
    {
        public long LegalEntityId { get; set; }
        public  string Name { get; set; }
        public string LedgerName { get; set; }
        //public byte[] EntityLogo { get; set; }
        public string Description { get; set; }
        public string DoingLegalAs { get; set; }
        public long? AddressId { get; set; }
        public string FaxNumber { get; set; }
        public string PhoneNumber1 { get; set; }
        public int? FunctionalCurrencyId { get; set; }
        public int? ReportingCurrencyId { get; set; }
        public bool? IsBalancingEntity { get; set; }
        public string CageCode { get; set; }
        public string FAALicense { get; set; }
        public string TaxId { get; set; }
        public long? ParentId { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PoBox { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public long? AchId { get; set; }
        public DateTime RecordModifiedDate { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string nice_name { get; set; }
    }
}
