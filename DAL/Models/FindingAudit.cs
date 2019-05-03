using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
   public class FindingAudit : PasBase
    {
        [Key]
        public long? FindingAuditId { get; set; }
        public long? FindingId { get; set; }
        public string FindingCode { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
