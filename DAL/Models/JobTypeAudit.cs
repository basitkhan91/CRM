using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class JobTypeAudit
    {
        [Key]
        public long JobTypeAuditId { get; set; }
        public Int16 JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public string JobTypeMemo { get; set; }
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}
