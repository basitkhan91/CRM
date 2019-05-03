﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class GLAccountCategoryAudit
    {
        [Key]
        public long GLAccountCategoryAuditId { get; set; }

        public long GLAccountCategoryId { get; set; }

        public long GLCID { get; set; }

        public string GLAccountCategoryName { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
    }
}
