using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class ATAChapter: PasBase
    {
        public long ATAChapterId { get; set; }

        //public string Description { get; set; }
        public string ATAChapterName { get; set; }

        public string ATAChapterCategory { get; set; }
        public string Memo { get; set; }
        public int? ATAChapterCode { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
