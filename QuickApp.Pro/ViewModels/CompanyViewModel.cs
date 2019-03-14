using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CompanyViewModel
    {

        public int CompanyId { get; set; }

        public string CompanyName { get; set; }
        public string TaxId { get; set; }

        public string EmailAddress { get; set; }
        public string Address { get; set; }
        public DateTime RecordCreateDate { get; set; }
        public DateTime RecordModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }


        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public class CompanyViewModelValidator : AbstractValidator<CompanyViewModel>
        {
            public CompanyViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }

}
