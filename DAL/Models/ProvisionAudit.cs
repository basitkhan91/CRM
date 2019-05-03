using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ProvisionAudit: PasBase
    {
        [Key]
        public int ProvisionAuditId { get; set; }
        public int ProvisionId { get; set; }
        public string Description { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string Memo { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
