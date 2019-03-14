using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class EmployeeLicenseTypeViewModel
    {
        public Byte? EmployeeLicenseTypeId { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsDelete { get; set; }
        public class EmployeeLicenseTypeViewModelValidator : AbstractValidator<EmployeeLicenseTypeViewModel>
        {
            public EmployeeLicenseTypeViewModelValidator()
            {
               
            }
        }
    }
}