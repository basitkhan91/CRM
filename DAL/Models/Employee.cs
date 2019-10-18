using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text;
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
        public string StationId { get; set; }
        public Int16? JobTitleId { get; set; }
        public int? JobTypeId { get; set; }

        public Int16? EmployeeExpertiseId { get; set; }
        public DateTime? DateOfBirth { get; set; }
          public Int16? OriginatingCountryId { get; set; }
        //public virtual Countries OriginatingCountryId { get; set; }

        
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


        // public int? BusinessUnitId { get; set; }
        public long? BusinessUnitId { get; set; }
          public long? DepartmentId { get; set; }
        //  public long? DepartmentId { get; set; }
        public long? DivisionId { get; set; }
        //  public long? DivisionId { get; set; }
        public string shift { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
        public long? ManagementStructureId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public virtual EmployeeLeaveTypeMapping EmployeeLeaveTypeMapping { get; set; }

        public virtual EmployeeShiftMapping EmployeeShiftMapping { get; set; }

        public virtual EmployeeLicensure EmployeeLicensure { get; set; }
        public virtual EmployeeTraining EmployeeTraining { get; set; }

    }
}