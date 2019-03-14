using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ShiftViewModel
    {
        public long ShiftId { get; set; }
        public string Description { get; set; }
    }
    public class ShiftViewModelValidator : AbstractValidator<ShiftViewModel>
    {
        public ShiftViewModelValidator()
        {
            // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
            //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
