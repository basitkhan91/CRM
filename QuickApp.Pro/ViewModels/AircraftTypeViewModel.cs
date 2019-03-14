using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class AircraftTypeViewModel
    {
        public int AircraftTypeId { get; set; }

        public string  Description { get; set; }
    }
    public class AircraftTypeViewModelValidator : AbstractValidator<AircraftTypeViewModel>
    {
        public AircraftTypeViewModelValidator()
        {
            // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
            //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
