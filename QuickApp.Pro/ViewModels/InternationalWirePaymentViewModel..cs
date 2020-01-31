//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public partial class InternationalWirePaymentViewModel
    {
    
        [Key]
        public long InternationalWirePaymentId { get; set; }
        public string SwiftCode { get; set; }
        public string BeneficiaryBankAccount { get; set; }
        public string BeneficiaryBank { get; set; }
        public Nullable<long> BankAddressId { get; set; }
        public string BeneficiaryCustomer { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }


        public long? VendorId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        //public string StateorProvice { get; set; }
        public string StateOrProvince { get; set; }
        public string Postalcode { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }


    }
}
