using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class WorkScopeAudit:PasBase
    {
        [Key]
        public long WorkScopeAuditId { get; set; }
        public long WorkScopeId { get; set; }
        public string WorkScopeCode { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
