using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class EmployeeLicensure:PasBase
    {
        public long EmployeeLicensureId { get; set; }

        public long EmployeeId { get; set; }
        public string LicenseNumber { get; set; }
        //public string AircraftModel { get; set; }
        //public Int16? TrainingTypeId { get; set; }
        //public DateTime ScheduleDate { get; set; }
        //public string FrequencyOfTraining { get; set; }
        //public DateTime CompletionDate { get; set; }
        //public string Duration { get; set; }
        //public string Cost { get; set; }
        //public string Provider { get; set; }
        //public string IndustryCode { get; set; }
        public Byte? EmployeeLicenseTypeId  { get; set; }
        public string CertifyingInstitution { get; set; }
        public DateTime CertificationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool IsLicenseInForce { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
    }
}
