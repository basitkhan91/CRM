//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public partial class Vendor
    {
      
        [Key]
        public long VendorId { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }

        //[ForeignKey("VendorTypeId")]
        public int? VendorTypeId { get; set; }

        public string DoingBusinessAsName { get; set; }

        //[ForeignKey("VendorClassificationId")]

        public Int64? VendorClassificationId { get; set; }

       // [ForeignKey("Parent")]
        public long Parent { get; set; }
        public string VendorContractReference { get; set; }
        //[ForeignKey("AddressId")]
        public Nullable<long> AddressId { get; set; }
        public bool IsVendorAlsoCustomer { get; set; }
        public Nullable<long> RelatedCustomerId { get; set; }
        public string VendorEmail { get; set; }
        public bool IsPreferredVendor { get; set; }
        public string LicenseNumber { get; set; }
        public string VendorURL { get; set; }
        public Nullable<bool> IsCertified { get; set; }
        public string CertificationFile { get; set; }
        public Nullable<bool> VendorAudit { get; set; }
        public string VendorAuditFile { get; set; }
        public Nullable<bool> EDI { get; set; }
        public string EDIDescription { get; set; }
        public Nullable<bool> AeroExchange { get; set; }
        public string AeroExchangeDescription { get; set; }
        public Nullable<decimal> CreditLimit { get; set; }

       // [ForeignKey("CurrencyId")]
        public Int32? CurrencyId { get; set; }
        public Nullable<byte> DiscountLevel { get; set; }
        public Nullable<long> DiscountId { get; set; }
        public Nullable<bool> Is1099Required { get; set; }
        public Int16? CreditTermsId { get; set; }
        //[ForeignKey("CreditTermsId")]
        //public Nullable<short> CreditTermsId { get; set; }
        public Nullable<bool> v1099Rent { get; set; }
        public Nullable<bool> v1099RentDefault { get; set; }
        public Nullable<bool> v1099Royalties { get; set; }
        public Nullable<bool> v1099RoyaltiesDefault { get; set; }
        public Nullable<bool> v1099OtherIncome { get; set; }
        public string v1099OtherIncomeDefault { get; set; }
        public Nullable<bool> v1099MedicalHealthPayments { get; set; }
        public Nullable<bool> v1099MedicalHealthPaymentsDefault { get; set; }
        public Nullable<bool> v1099NonEmployeeComp { get; set; }
        public Nullable<bool> v1099NonEmployeeCompDefault { get; set; }
        public Nullable<bool> v1099GoldenParachute { get; set; }
        public Nullable<bool> v1099GoldenParachuteDefault { get; set; }
        public Nullable<bool> v1099GrossProceedsPaidToAttorney { get; set; }
        public Nullable<bool> v1099GrossProceedsPaidToAttorneyDefault { get; set; }
        public long? capabilityId { get; set; }
        //[ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public string VendorParentName { get; set; }

        // public virtual VendorCapabiliy VendorCapabiliy { get; set; }

        public virtual VendorContact VendorContact { get; set; }

        public virtual Address Address { get; set; }

        //public virtual VendorClassification VendorClassification { get; set; }

        public virtual Currency Currency { get; set; }

        public virtual CreditTerms CreditTerms { get; set; }

        //public virtual VendorType VendorType { get; set; }

        public virtual VendorShipping VendorShipping { get; set; }

        //public virtual MasterCompany MasterCompany { get; set; }
        //public string address1 { get; set; }
        //public string address2 { get; set; }
        //public string address3 { get; set; }
        //public string city { get; set; }
        //public string primarystate { get; set; }
        //public string postal { get; set; }
        //public string country { get; set; }
        //public string email { get; set; }
        public string VendorPhone { get; set; }
        //public string customertypedesc { get; set; }
        public Nullable<bool> IsDelete { get; set; }


    }
}
