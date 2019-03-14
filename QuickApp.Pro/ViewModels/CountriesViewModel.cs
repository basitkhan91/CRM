using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CountriesViewModel
    {

        public Int16 countries_id { get; set; }
        public string countries_name { get; set; }
        public string nice_name { get; set; }
        public string countries_iso_code { get; set; }

        public string countries_iso3 { get; set; }
        public string countries_numcode { get; set; }
        public string countries_isd_code { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }

        public class CountriesViewModelValidator : AbstractValidator<CountriesViewModel>
        {
            public CountriesViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }
}

