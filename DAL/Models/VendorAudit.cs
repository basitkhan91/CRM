using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class VendorAudit
    {
        [Key]
        public long AuditVendorId { get; set; }
        public long VendorId { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }

        public int? VendorTypeId { get; set; }

        public string DoingBusinessAsName { get; set; }

        public Int64? VendorClassificationId { get; set; }

        public long Parent { get; set; }
        public string VendorContractReference { get; set; }
        public Nullable<long> AddressId { get; set; }
        public bool IsVendorAlsoCustomer { get; set; }
        public Nullable<long> RelatedCustomerId { get; set; }
        public string VendorEmail { get; set; }
        public bool IsPreferredVendor { get; set; }
        public string LicenseNumber { get; set; }
        public string VendorURL { get; set; }
        public Nullable<bool> IsCertified { get; set; }
        public string CertificationFile { get; set; }
        //public Nullable<bool> VendorAudit { get; set; }
        public string VendorAuditFile { get; set; }
        public Nullable<bool> EDI { get; set; }
        public string EDIDescription { get; set; }
        public Nullable<bool> AeroExchange { get; set; }
        public string AeroExchangeDescription { get; set; }
        public Nullable<decimal> CreditLimit { get; set; }

        public Int32? CurrencyId { get; set; }
        public Nullable<byte> DiscountLevel { get; set; }
        public Nullable<long> DiscountId { get; set; }
        public Nullable<bool> Is1099Required { get; set; }
        public Int16? CreditTermsId { get; set; }
      
        //public Nullable<short> CreditTermsId { get; set; }
        public Nullable<bool> v1099Rent { get; set; }
        public Nullable<bool> v1099RentDefault { get; set; }
        public Nullable<bool> v1099Royalties { get; set; }
        public Nullable<bool> v1099RoyaltiesDefault { get; set; }
        public Nullable<bool> v1099OtherIncome { get; set; }
        public Nullable<bool> v1099OtherIncomeDefault { get; set; }
        public Nullable<bool> v1099MedicalHealthPayments { get; set; }
        public Nullable<bool> v1099MedicalHealthPaymentsDefault { get; set; }
        public Nullable<bool> v1099NonEmployeeComp { get; set; }
        public Nullable<bool> v1099NonEmployeeCompDefault { get; set; }
        public Nullable<bool> v1099GoldenParachute { get; set; }
        public Nullable<bool> v1099GoldenParachuteDefault { get; set; }
        public Nullable<bool> v1099GrossProceedsPaidToAttorney { get; set; }
        public Nullable<bool> v1099GrossProceedsPaidToAttorneyDefault { get; set; }
        public long? capabilityId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public string VendorParentName { get; set; }             
      
        
        public string VendorPhone { get; set; }

        public Nullable<bool> IsDelete { get; set; }      

        public string VendorPhoneExt { get; set; }

        public Nullable<bool> IsAddressForBilling { get; set; }
        public Nullable<bool> IsAddressForShipping { get; set; }
        public Nullable<bool> IsAllowNettingAPAR { get; set; }

    }
}
