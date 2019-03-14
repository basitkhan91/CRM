using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ATASubChapterViewModel
    {

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

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
