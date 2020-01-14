using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class CapabilityTypeAudit
    {
        [Key]
        public Int64 AuditCapabilityTypeId { get; set; }
        public Int32? CapabilityTypeId { get; set; }
        public string Description { get; set; }       
        public string SequenceMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }
}
