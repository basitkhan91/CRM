using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class FrequencyOfTrainingAudit
    {
        [Key]
        public long AuditFrequencyOfTrainingId { get; set; }
        public long FrequencyOfTrainingId { get; set; }
        public string FrequencyName { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
