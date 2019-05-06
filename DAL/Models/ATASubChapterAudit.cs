using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ATASubChapterAudit:PasBase
    {
        [Key]
        public long ATASubChapterAuditId { get; set; }
        public long ATASubChapterId { get; set; }
        public long? ATAChapterId { get; set; }
        public string Memo { get; set; }
        public string Description { get; set; }
        public Int32? ATASubChapterCode { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
