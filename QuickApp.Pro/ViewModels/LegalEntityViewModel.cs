﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class LegalEntityViewModel
    {

        public long LegalEntityId { get; set; }

        public long ACHId { get; set; }
        public  string Name { get; set; }
        public string LedgerName { get; set; }

        public byte[] EntityLogo { get; set; }
        public string Description { get; set; }

        public string LegalEntityType { get; set; }

        public string LegalEntityCode { get; set; }

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

        public int? LockBoxAddressId { get; set; }

        public long DomesticWirePaymentId { get; set; }

        public long InternationalWirePaymentId { get; set; }

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

        public string BankStreetaddress1 { get; set; }

        public string BankStreetaddress2 { get; set; }

        public string BankCity { get; set; }

        public string BankProvince { get; set; }

        public string Country { get; set; }

        public string PostalCode { get; set; }


        public string DomesticBankName { get; set; }

        public string DomesticIntermediateBank { get; set; }

        public string DomesticBenficiaryBankName { get; set; }

        public string DomesticBankAccountNumber { get; set; }

        public string DomesticABANumber { get; set; }

        public string InternationalBankName { get; set; }

        public string InternationalIntermediateBank { get; set; }

        public string InternationalBenficiaryBankName { get; set; }

        public string InternationalBankAccountNumber { get; set; }

        public string InternationalSWIFTID { get; set; }

        public string AchBankName { get; set; }

        public string AchIntermediateBank { get; set; }

        public string AchBenficiaryBankName { get; set; }

        public string AchBankAccountNumber { get; set; }


        public string AchABANumber { get; set; }

        public string AchSWIFTID { get; set; }

        public DateTime RecordModifiedDate { get; set; }


        public string City { get; set; }

        public string StateOrProvince { get; set; }

        public bool? IsBankingInfo { get; set; }



    }
}
