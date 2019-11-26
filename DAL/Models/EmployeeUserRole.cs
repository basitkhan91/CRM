using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class EmployeeUserRole
    {
        [Key]
        public long EmployeeUserRoleId { get; set; }
        public long EmployeeId { get; set; }
        public long RoleId { get; set; }  
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime?UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
