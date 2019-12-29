using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
 public  class LegalEntity:PasBase
    {

        public long LegalEntityId { get; set; }

        public string Name { get; set; }

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

        public bool? IsLastLevel { get; set; }

        public long? LockBoxAddressId { get; set; }

        public long DomesticWirePaymentId { get; set; }

        public long InternationalWirePaymentId { get; set; }

        public long? ACHId { get; set; }
        public long? ParentId { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsBankingInfo { get; set; }

        public string LedgerName { get; set; }


    }
}
