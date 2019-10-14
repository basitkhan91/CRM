
using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace QuickApp.Pro.ViewModels
{
    public class CustomerTaxTypeRateMappingViewModel
    {

        public long CustomerTaxTypeRateMappingId { get; set; }
        public long CustomerId { get; set; }
        public long TaxType { get; set; }
        public string TaxRate { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }



    }
    public class CustomerTaxTypeRateMappingViewModelValidator : AbstractValidator<CustomerTaxTypeRateMappingViewModel>
    {
        public CustomerTaxTypeRateMappingViewModelValidator()
        {
        }
    }
}