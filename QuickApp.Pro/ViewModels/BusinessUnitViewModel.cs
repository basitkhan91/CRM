using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class BusinessUnitViewModel
    {
       
            public int BusinessUnitId { get; set; }

            public int CompanyId { get; set; }
            public int MasterCompanyId { get; set; }

            public string BusinessUnitCode { get; set; }

            public string BusinessUnitName { get; set; }

            public DateTime RecordCreateDate { get; set; }

            public DateTime RecordModifiedDate { get; set; }

            public int LastModifiedBy { get; set; }

            public bool? IsActive { get; set; }
            public virtual MasterCompany MasterCompany { get; set; }

        public class BusinessUnitViewModelValidator : AbstractValidator<BusinessUnitViewModel>
        {
            public BusinessUnitViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }
}