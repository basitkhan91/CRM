using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class GLAccountClassViewModel
    {
        public long GLAccountClassId { get; set; }

        public long GLCID { get; set; }

        public string GLAccountClassName { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

    }
}
