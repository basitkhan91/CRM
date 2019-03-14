using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ATASubChapter2ViewModel
    {

        public long ATASubChapter2Id { get; set; }

        public long ATASubChapter1Id { get; set; }

        public long ATAMainId { get; set; }

        public string Memo { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
