using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class DepartmentViewModel
    {

        public int DepartmentId { get; set; }
        public int DivisionId { get; set; }
        public int BusinessUnitId { get; set; }
        public int CompanyId { get; set; }
        public int MasterCompanyId { get; set; }
        public string DepartmentCode { get; set; }
        public string DepartmentName { get; set; }
        public int ContactId { get; set; }
        public DateTime MyProRecordCreateDateperty { get; set; }
        public DateTime RecordModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public class DepartmentViewModelValidator : AbstractValidator<DepartmentViewModel>
        {
            public DepartmentViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }
}