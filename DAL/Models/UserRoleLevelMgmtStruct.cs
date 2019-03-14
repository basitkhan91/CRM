using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class UserRoleLevelMgmtStruct : PasBase
    {
        [Key]
        public long UserRoleManagementStructureId { get; set; }
        [ForeignKey("UserRoleLevelId")]
        public long? UserRoleLevelId { get; set; }
        [ForeignKey("ManagementStructureId")]
        public long? ManagementStructureId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
