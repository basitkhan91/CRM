using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class UserRoleLevelEntityViewModel
    {
        public long UserRoleLevelEntityId { get; set; }
        public long UserRoleLevelId { get; set; }
        public long UIRoleEntityId { get; set; }
        public Nullable<short> PermittedEditActionId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public bool isViewed { get; set; }

        public bool isAdd { get; set; }
        public bool isDelete { get; set; }
        public bool isUpdate { get; set; }

        public bool isEditMode { get; set; }
    }
}
