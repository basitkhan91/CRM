using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class TaskAudit : PasBaseAuditing
    {
        [Key]
        public long TaskAuditId { get; set; }

        public long TaskId { get; set; }

        public long? ActionId { get; set; }

        public string Description { get; set; }

        public string Memo { get; set; }

        public int? MasterCompanyId { get; set; }
    }
}
