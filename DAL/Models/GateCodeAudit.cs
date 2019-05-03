using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
  public class GateCodeAudit : PasBase
    {
        [Key]
        public long? GateCodeAuditId { get; set; }

        public long? GateCodeId { get; set; }
        public string GateCode { get; set; }
        public string Description { get; set; }
        public string Sequence { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }   
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
