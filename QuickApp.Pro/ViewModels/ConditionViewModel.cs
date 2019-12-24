using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{

    public class ConditionViewModel
    {
        public long ConditionId { get; set; }
        public string Memo { get; set; }

        public string Description { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

    }

    public class ConditionSPModel
    {
        public string Memo { get; set; }
        public string Description { get; set; }
    }

    public class ConditionViewModelValidator : AbstractValidator<ConditionViewModel>
    {
        public ConditionViewModelValidator()
        {
            // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
            //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
