using DAL.Models;
using FluentValidation;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuickApp.Pro.ViewModels
{
    public class EmployeeViewModel
    {
        public long? EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string EmployeeIdAsPerPayroll { get; set; }
        public long? StationId { get; set; }
        public Int16? JobTitleId { get; set; }
        public Int16? JobTypeId { get; set; }

        public long? LegalEntityId { get; set; }
        public Int16? EmployeeExpertiseId { get; set; }

        public string EmployeeCode { get; set; }
        public  DateTime? DateOfBirth { get; set; }
        public Int16? OriginatingCountryId { get; set; }
        public Int16? NationalityCountryId { get; set; }
        public DateTime StartDate { get; set; }
        public string MobilePhone { get; set; }
        public string WorkPhone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string SSN { get; set; }
        public bool? InMultipleShifts { get; set; }
        public bool? AllowOvertime { get; set; }
        public bool? AllowDoubleTime { get; set; }
        public bool? IsHourly { get; set; }
        public decimal? HourlyPay { get; set; }
        public bool? EmployeeCertifyingStaff { get; set; }
        public long? SupervisorId { get; set; }

        public byte? LeaveTypeId { get; set; }

        public long? ShiftTypeId { get; set; }
        


        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
        public long? ManagementStructureId { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }

        public string[] EmployeeLeaveTypeId { get; set; }
        public string[] EmployeeShiftId { get; set; }
        public string[] ShiftId { get; set; }
        public string Memo { get; set; }

        public int? CurrencyId { get; set; }
        public Nullable<bool> IsHeWorksInShop { get; set; }
        public class EmployeeViewModelValidator : AbstractValidator<EmployeeViewModel>
        {
            public EmployeeViewModelValidator()
            {
                // RuleFor(register => register.Name).NotEmpty().WithMessage("Workflow Action name cannot be empty");
                //  RuleFor(register => register.Gender).NotEmpty().WithMessage("Gender cannot be empty");
            }
        }
    }
}