// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace QuickApp.Pro.ViewModels
{
    public class CustomerViewModel : PasBase
    {
        public long CustomerId { get; set; }

        public string Name { get; set; }
        public int? CsrId { get; set; }
        public int? SaId { get; set; }

        public string CustomerCode { get; set; }


        public Int32? CustomerTypeId { get; set; }


        public string DoingBuinessAsName { get; set; }

        public short? CoreDueIn { get; set; }

      
        public bool? IsParent { get; set; }
        public long? ParentId { get; set; }

        public long? CustomerClassificationId{ get; set; }

        public long?[] CustomerClassificationIds { get; set; }

        // public int? IntegrationPortalId { get; set; }
        public string Discount { get; set; }
        public string EDIDescription { get; set; }


        public string ContractReference { get; set; }


        public byte? PriorityCustomerId { get; set; }

        public bool IsPBHCustomer { get; set; }

        public Int32? CustomerAffiliationId { get; set; }

        public string PBHCustomerMemo { get; set; }

        public bool RestrictPMA { get; set; }


        public string RestrictPMAMemo { get; set; }

        public bool? RestrictBER { get; set; }


        public string RestrictBERMemo { get; set; }


        public string CustomerURL { get; set; }


        public long? Addressid { get; set; }

        //public bool IsAddressForBillingAndShipping { get; set; }

        public bool IsCustomerAlsoVendor { get; set; }

        public long? RelatedVendorId { get; set; }


        public string Notes { get; set; }


        public string MarkUpPercent { get; set; }


        public decimal? CreditLimit { get; set; }


        public short? CreditTermsId { get; set; }

        public bool? AllowNettingOfAPAR { get; set; }

        public bool? IsTaxExempt { get; set; }

        public string TaxCertificate { get; set; }


        public decimal? TaxRateStateOrProvince { get; set; }


        public bool? TaxRateOther { get; set; }
        public string TaxTypeId { get; set; }

        public byte? TaxOtherType { get; set; }

        public bool? EDI { get; set; }


        // public string EDIDescription { get; set; }

        public bool? AllowProformaBilling { get; set; }

        public bool? AllowPartialBilling { get; set; }

        public int? CurrencyId { get; set; }

        public bool? IsAeroExchange { get; set; }


        public string AeroExchangeDescription { get; set; }
        public string PrimarySalesPersonFirstName { get; set; }

        public long? PrimarySalesPersonId { get; set; }

        public string SecondarySalesPersonName { get; set; }

        public long? SecondarySalesPersonId { get; set; }

        public string AnnualRevenuePotential { get; set; }

       // public string CustomerParentName { get; set; }

        public string AnnualQuota { get; set; }

        public bool? ScanDocuments { get; set; }

        public string Email { get; set; }


        public string CustomerPhone { get; set; }
        public string CustomerPhoneExt { get; set; }
        

        public string CSRName { get; set; }


        public string AgentName { get; set; }

        public bool? ExportLicenseRequired { get; set; }

        // public string DiscontValue { get; set; }

        public long? DiscountId { get; set; }

        public long? ATAChapterId { get; set; }

        public long? ataSubChapterId { get; set; }

        public int MasterCompanyId { get; set; }


        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        public Int32? MarkUpPercentageId { get; set; }

        public Int32? GeneralCurrencyId { get; set; }
        
        public bool? IsAddressForBilling { get; set; }

        public bool? IsAddressForShipping { get; set; }



        public virtual MasterCompany MasterCompany { get; set; }

        public virtual CustomerClassification CustomerClassification { get; set; }

        public virtual CreditTerms CreditTerms { get; set; }

        public virtual CustomerAddress CustomerAddress { get; set; }


        public virtual CustomerBillingAddress CustomerBillingAddress { get; set; }


        public virtual CustomerContact CustomerContact { get; set; }


        public virtual CustomerIntegrationPortal CustomerIntegrationPortal { get; set; }


        public virtual CustomerShipping CustomerShipping { get; set; }
        public virtual CustomerType CustomerType { get; set; }

		public virtual List<RestrictedParts> RestrictedPMAParts { get; set; }
		public virtual List<RestrictedParts> RestrictedDERParts { get; set; }

        public  List<CustomerTaxTypeRateMapping> CustomerTaxTypeRateMapping { get; set; }
        //public virtual List<RestrictsPMAList> RestrictsPmaList { get; set; }
        //      public virtual List<RestrictsBERList> restrictBERList { get; set; }






        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        //public string Email { get; set; }
        public string Phone { get; set; }
        public string[] AircraftTypeId { get; set; }

        public string[] IntegrationPortalId { get; set; }
    }




    //public class CustomerViewModelValidator : AbstractValidator<CustomerViewModel>
    //{
    //    public CustomerViewModelValidator()
    //    {
    //        RuleFor(register => register.Name).NotEmpty().WithMessage("Customer name cannot be empty");
    //        RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
    //    }
    //}
}
