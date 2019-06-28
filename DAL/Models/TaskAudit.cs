using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class TaskAudit : PasBaseAuditing
    {
        [Key]
        public long ActionAuditId { get; set; }

        public long TaskId { get; set; }

        public string Description { get; set; }

        public string Memo { get; set; }

        public int? MasterCompanyId { get; set; }
    }
}
