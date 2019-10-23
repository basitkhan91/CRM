using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class StageCodeAudit : PasBase
    {
        [Key]
        public long? StageCodeAuditId { get; set; }
        public long StageCodeId { get; set; }

        public string GateCode { get; set; }

        public string Description { get; set; }

        public string Sequence { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
