using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ConditionAudit : PasBase
    {
        [Key]
        public long ConditionAuditId { get; set; }
        public long ConditionId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
