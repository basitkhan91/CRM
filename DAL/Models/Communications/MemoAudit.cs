using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class MemoAudit
    { 
        [Key]
        public long MemoAuditId { get; set; }
        public long MemoId { get; set; }
        public string MemoCode { get; set; }
        public string Description { get; set; }
        public int ModuleId { get; set; }
        public long ReferenceId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
