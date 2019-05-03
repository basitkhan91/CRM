using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class JobTitleAudit
    {
        [Key]
        public Int16 JobTitleAuditId { get; set; }
        public Int16 JobTitleId { get; set; }

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
