using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ATASubChapter: PasBase,IAudit
    {
        
       [Key]
        public long ATASubChapterId { get; set; }
        //FK
        public long ATAChapterId { get; set; }

        public string Memo { get; set; }
        public string Description { get; set; }

        public Int32? ATASubChapterCode { get; set; }


        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
