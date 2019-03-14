using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class DivisionViewModel
    {
        public int DivisionId { get; set; }
        public int BusinessUnitId { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string DivisionCode { get; set; }
        public string DivisionName { get; set; }

        public int? ContactId { get; set; }
        public DateTime RecordCreateDate { get; set; }

        public DateTime RecordModifiedDate { get; set; }

        public int LastModifiedBy { get; set; }
        public class DivisionViewModelValidator : AbstractValidator<DivisionViewModel>
        {
          public  DivisionViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }
}