using DAL.Core;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class GLAccountCategory : IAudit
    {
        [Key]
        public long GLAccountCategoryId { get; set; }

        public long GLCID { get; set; }

        public string GLAccountCategoryName { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public UploadTag UploadTag { get; set; }
    }
}
