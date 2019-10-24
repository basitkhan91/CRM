using System;
using System.ComponentModel.DataAnnotations;
namespace DAL.Models
{
   public class GLAccountClassAudit : PasBaseAudit
    {
        [Key]
        public long GLAccountClassAuditId { get; set; }
        public long? GLAccountClassId { get; set; }
        public long? GLCID { get; set; }
        public string GLAccountClassName { get; set; }
        public string GLAccountClassMemo { get; set; }

        public Int32? MasterCompanyId { get; set; }        
    }
}
