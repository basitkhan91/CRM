using DAL.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuickApp.Pro.ViewModels
{
    public class GLAccountClassViewModel : IAudit
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
