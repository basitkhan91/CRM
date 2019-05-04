using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class EmployeeLicenseTypeAudit:PasBase
    {
        [Key]
        public long EmployeeLicenseTypeAuditId { get; set; }
        public Byte EmployeeLicenseTypeId { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsDelete { get; set; }
    }
}
