using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class ATAChapter: PasBase,IAudit
    {
        [Key]
        public long ATAChapterId { get; set; }

        //public string Description { get; set; }
        public string ATAChapterName { get; set; }

        public string ATAChapterCategory { get; set; }
        public string Memo { get; set; }
        public int? ATAChapterCode { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        [NotMapped]
        public string UploadStatus { get; set; }
    }
}
