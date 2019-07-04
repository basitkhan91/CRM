using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class EmployeeLicensureViewModel
    {

        public long EmployeeLicensureId { get; set; }

        public long EmployeeId { get; set; }
        public string LicenseNumber { get; set; }
        //public string AircraftModel { get; set; }
        //public int TrainingTypeId { get; set; }
        //public DateTime ScheduleDate { get; set; }
        //public string FrequencyOfTraining { get; set; }
        //public DateTime CompletionDate { get; set; }
        //public string Duration { get; set; }
        //public string Cost { get; set; }
        //public string Provider { get; set; }
        //public string IndustryCode { get; set; }
        public long EmployeeLicenseTypeId { get; set; }
        public string CertifyingInstitution { get; set; }
        public DateTime CertificationDate { get; set; }
       // public DateTime ExpirationDate { get; set; }
        public bool IsLicenseInForce { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
        public class EmployeeLicensureViewModelValidator : AbstractValidator<EmployeeLicensureViewModel>
        {
            public EmployeeLicensureViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }
}