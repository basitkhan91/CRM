using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ATASubChapter2:PasBase
    {
        //PK
        public long ATASubChapter2Id { get; set; }
        //FK
        public long ATASubChapter1Id { get; set; }
        public long ATAMainId { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
