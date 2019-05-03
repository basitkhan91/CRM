using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ATAChapterAudit:PasBase
    {
        [Key]
        public long ATAChapterAuditId { get; set; }
        public long ATAChapterId { get; set; }
        public string ATAChapterName { get; set; }
        public string ATAChapterCategory { get; set; }
        public string Memo { get; set; }
        public int? ATAChapterCode { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
