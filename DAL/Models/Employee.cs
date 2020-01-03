using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DAL.Models
{
    public class Employee : PasBase
    {
        public long? EmployeeId { get; set; }
        [Required(ErrorMessage = "First name is required."), MaxLength(50)]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string EmployeeIdAsPerPayroll { get; set; }
        public long? StationId { get; set; }
        public Int16? JobTitleId { get; set; }
        public Int16? JobTypeId { get; set; }
        public long? LegalEntityId { get; set; }
        
        public Int16? EmployeeExpertiseId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public Int16? OriginatingCountryId { get; set; }
        public Int16? NationalityCountryId { get; set; }
        public DateTime StartDate { get; set; }

        public string EmployeeCode { get; set; }
        public string MobilePhone { get; set; }
        public string WorkPhone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string SSN { get; set; }
        public bool? InMultipleShifts { get; set; }
        public bool? AllowOvertime { get; set; }
        public bool? AllowDoubleTime { get; set; }
        public bool? IsHourly { get; set; }
        // public bool? IsLaborChargedToJob { get; set; }
        public decimal? HourlyPay { get; set; }
        public bool? EmployeeCertifyingStaff { get; set; }
        public Byte? EmployeeLeaveTypeId { get; set; }
        public long? SupervisorId { get; set; }

    
        //public string shift { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }
        public long? ManagementStructureId { get; set; }

        public string Memo { get; set; }

        public int? CurrencyId { get; set; }
        public Nullable<bool> IsHeWorksInShop { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
        public ICollection<EmployeeLeaveTypeMapping> EmployeeLeaveTypeMapping { get; set; }
        public ICollection<EmployeeShiftMapping> EmployeeShiftMapping { get; set; }

        public virtual EmployeeLicensure EmployeeLicensure { get; set; }
        public virtual EmployeeTraining EmployeeTraining { get; set; }

    }
}