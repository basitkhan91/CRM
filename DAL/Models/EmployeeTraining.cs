using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class EmployeeTraining : PasBase
    {
        public long EmployeeTrainingId { get; set; }
        public long EmployeeId { get; set; }

        public int? AircraftModelId { get; set; }
        public long? EmployeeTrainingTypeId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public int? FrequencyOfTraining { get; set; }
        public DateTime CompletionDate { get; set; }
        public Decimal? Cost { get; set; }
        public Int32? Duration { get; set; }
        public string Provider { get; set; }
        public string IndustryCode { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool CertificationReceived { get; set; }
        public string CertificationFile { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public DateTime RecordCreateDate { get; set; }
        public DateTime RecordModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }

        public long? UnitOfMeasureId { get; set; }
        public long? FrequencyOfTrainingId { get; set; }

        public virtual EmployeeTrainingType EmployeeTrainingType { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }

    }
}