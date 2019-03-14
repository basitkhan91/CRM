using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ExpenditureCategoryViewModel
    {
        public long ExpenditureCategoryId { get; set; }

        public string Description { get; set; }
        public string Memo { get; set; }


        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

    }
}
