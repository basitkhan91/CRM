using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class AircraftModelViewModel
    {
        public long AircraftModelId { get; set; }

        public int AircraftTypeId { get; set; }

        public string ModelName { get; set; }

    }

    public class AircraftModelViewModelValidator : AbstractValidator<AircraftModelViewModel>
    {
        public AircraftModelViewModelValidator()
        {
            // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
            //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
