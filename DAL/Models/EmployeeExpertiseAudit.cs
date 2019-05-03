using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
   public class EmployeeExpertiseAudit : PasBase
    {
        [Key]
        public Int16? EmployeeExpertiseAuditId { get; set; }
        public Int16? EmployeeExpertiseId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
