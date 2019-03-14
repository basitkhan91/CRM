using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class GLAccountCategoryViewModel
    {
        public long GLAccountCategoryId { get; set; }

        public long GLCID { get; set; }
        public string GLAccountCategoryName { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
    }
}
