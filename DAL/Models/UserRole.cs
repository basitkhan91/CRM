using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class UserRole : PasBase
    {
        [Key]
        public long Id { get; set; }

        [Required(ErrorMessage ="Role Name is required")]
        public string Name { get; set; }
        public string Memo { get; set; }
        public bool isDelete { get; set; }
        public bool isActive { get; set; }

        public virtual ICollection<RolePermission> RolePermissions { get; set; }
    }
}
