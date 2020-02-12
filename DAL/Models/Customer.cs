// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Customer : PasBase//, IAudit
    {
        
        [Key]
        public long CustomerId { get; set; }

        public string Name { get; set; }
        public long? CsrId { get; set; }
        public long? SaId { get; set; }


        public string CustomerCode { get; set; }

        [ForeignKey("CustomerTypeId")]
        public Int32? CustomerTypeId { get; set; }


        public string DoingBuinessAsName { get; set; }


        public long? Parent { get; set; }

        public string Email { get; set; }

        public int? IntegrationPortalId { get; set; }

        public string CustomerPhone { get; set; }
        public string CustomerPhoneExt { get; set; }

        [ForeignKey("CustomerClassificationId")]
        public long? CustomerClassificationId { get; set; }


        public string ContractReference { get; set; }



        public bool IsPBHCustomer { get; set; }

        public Int32? CustomerAffiliationId { get; set; }

        public string PBHCustomerMemo { get; set; }

        public bool RestrictPMA { get; set; }

        public bool? IsAddressForBilling { get; set; }

        public bool? IsAddressForShipping { get; set; }


        public string RestrictPMAMemo { get; set; }

        public bool? RestrictBER { get; set; }


        public string RestrictBERMemo { get; set; }


        public string CustomerURL { get; set; }

        [ForeignKey("AddressId")]
        public long? AddressId { get; set; }

        public bool IsCustomerAlsoVendor { get; set; }




        public string Discount { get; set; }


        public long? DiscountId { get; set; }

        public int? CurrencyId { get; set; }
        public string MarkUpPercent { get; set; }


        public decimal? CreditLimit { get; set; }


        [ForeignKey("CreditTermsId")]
        public short? CreditTermsId { get; set; }

        public bool? AllowNettingOfAPAR { get; set; }

        public bool? IsTaxExempt { get; set; }

        public string TaxCertificate { get; set; }


        public decimal? TaxRateStateOrProvince { get; set; }


        public bool? TaxRateOther { get; set; }
        public string TaxTypeId { get; set; }

        [ForeignKey("TaxOtherType")]
        public byte? TaxOtherType { get; set; }

        public bool? EDI { get; set; }

        public bool? IsAeroExchange { get; set; }


        public string EDIDescription { get; set; }
        public string AeroExchangeDescription { get; set; }


        //public string DiscontValue { get; set; }

        //public long? DiscountId { get; set; }

        public bool? AllowProformaBilling { get; set; }

        public bool? AllowPartialBilling { get; set; }

        public string PrimarySalesPersonFirstName { get; set; }


        public long? PrimarySalesPersonId { get; set; }


        public string AnnualRevenuePotential { get; set; }

        public string CustomerParentName { get; set; }

        public string AnnualQuota { get; set; }

        public bool? ScanDocuments { get; set; }

        public string SecondarySalesPersonName { get; set; }

        public long? SecondarySalesPersonId { get; set; }


        public string CSRName { get; set; }


        public string AgentName { get; set; }


        public long? ATAChapterId { get; set; }
        public long? ataSubChapterId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }


        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public long? MarkUpPercentageId { get; set; }
        public int? GeneralCurrencyId { get; set; }

        //public bool? IsAddressForBillingAndShipping { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }


        public virtual CustomerClassification CustomerClassification { get; set; }

        public virtual CreditTerms CreditTerms { get; set; }
        public virtual CustomerAddress CustomerAddress { get; set; }


        public virtual CustomerBillingAddress CustomerBillingAddress { get; set; }

        public virtual CustomerContact CustomerContact { get; set; }

        public virtual Address Address { get; set; }
        public virtual CustomerIntegrationPortal CustomerIntegrationPortal { get; set; }


        public virtual CustomerShipping CustomerShipping { get; set; }

        public virtual CustomerType CustomerType { get; set; }

        [NotMapped]
        public List<ClassificationMapping> CustomerClassificationMapping { get; set; }

        [NotMapped]
        public List<RestrictedParts> RestrictedPMAParts { get; set; }
        [NotMapped]
        public List<RestrictedParts> RestrictedDERParts { get; set; }

        public List<RestrictsPMAList> RestrictsPmaLists { get; set;}
        public List<RestrictsBERList> RestrictsDerLists { get; set; }
        public  List<CustomerTaxTypeRateMapping> CustomerTaxTypeRateMapping { get; set; }

        [NotMapped]
        public long AttachmentId { get; set; }

      
        //public virtual Order Orders { get; set; }
    }
}
