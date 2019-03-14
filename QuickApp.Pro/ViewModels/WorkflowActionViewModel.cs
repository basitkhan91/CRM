using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
   
    public class WorkflowActionViewModel
    {
        public byte WorkflowActionId { get; set; }

        public string Description { get; set; }

        public Int32 MasterCompanyId { get; set; }
    }




    public class WorkflowActionViewModelValidator : AbstractValidator<WorkflowActionViewModel>
    {
        public WorkflowActionViewModelValidator()
        {
           // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
          //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
        }
    }
}
