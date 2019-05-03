using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
   public class DefaultMessageAudit : PasBase
    {
        [Key]
        public long?  DefaultMessageAuditId { get; set; }
        public long? DefaultMessageId { get; set; }
        public string DefaultMessageCode { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }        
        public bool? IsDelete { get; set; }
    }
}
