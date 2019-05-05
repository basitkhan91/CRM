using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class RolePermission
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Id")]
        public long UserRoleId { get; set; }

        [ForeignKey("ModuleHierarchyMasterId")]
        public int ModuleHierarchyMasterId { get; set; }

        public bool CanAdd { get; set; }

        public bool CanView { get; set; }

        public bool CanUpdate { get; set; }

        public bool CanDelete { get; set; }

        public bool Reports { get; set; }

        public bool CanUpload { get; set; }

        public bool CanDownload { get; set; }
    }
}
