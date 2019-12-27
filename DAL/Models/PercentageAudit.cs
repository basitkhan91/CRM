using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class PercentageAudit
    {
        [Key]
        public long PercentageAuditId { get; set; }
        public long PercentId { get; set; }
        public long PercentValue { get; set; }
        public bool? IsActive { get; set; }               
        public Int32 MasterCompanyId { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
