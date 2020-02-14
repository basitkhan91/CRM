using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class CustomerClassificationAudit : PasBase
    {
        [Key]
        public long? CustomerClassificationAuditId { get; set; }
        public long? CustomerClassificationId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDelete { get; set; } = false;
    }
}
