using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{

    public class ATAChapterViewModel
    {
        public long ATAChapterId { get; set; }

      //  public string Description { get; set; }
        public string ATAChapterName { get; set; }

        public string ATAChapterCategory { get; set; }
        public string Memo { get; set; }
        public int? ATAChapterCode { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }


    }

    public class ATAChapterViewModelValidator : AbstractValidator<ATAChapterViewModel>
    {
        public ATAChapterViewModelValidator()
        {
            // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
            //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
