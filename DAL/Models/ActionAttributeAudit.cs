using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ActionAttributeAudit : PasBaseAuditing
    {
        [Key]
        public long ActionAttributeAuditId { get; set; }

        public long ActionAttributeId { get; set; }

        public string Description { get; set; }

        public string Memo { get; set; }

        public Int32 MasterCompanyId { get; set; }

    }
}
