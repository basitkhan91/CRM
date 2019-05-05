using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ActionAudit : PasBaseAuditing
    {
        [Key]
        public long ActionAuditId { get; set; }

        public long? ActionId { get; set; }

        public string Description { get; set; }

        public string Memo { get; set; }

        public int? MasterCompanyId { get; set; }
    }
}
