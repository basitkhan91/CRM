


using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{


    public class MasterCompanyViewModel
    {

        public int MasterCompanyId { get; set; }

        public string CompanyName { get; set; }

        public string TaxId { get; set; }

        public string EmailAddress { get; set; }

        public string Address { get; set; }

        public bool? IsActive { get; set; }


        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

      


    }

    public class MasterCompanyViewModelValidator : AbstractValidator<ATAMainViewModel>
    {
        public MasterCompanyViewModelValidator()
        {
            // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
            //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
