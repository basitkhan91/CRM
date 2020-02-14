using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class CustomerWarning
    {
       
        public long CustomerWarningId { get; set; }
        public long CustomerId { get; set; }
        public string SourceModule { get; set; }
        public string WarningMessage { get; set; }
        public string RestrictMessage { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; } = true;
        public bool? IsAllow { get; set; } = false;
        public bool? IsWarning { get; set; } = false;
        public bool? IsRestrict { get; set; } = false;
        public bool IsDeleted { get; set; }
        public bool? Allow { get; set; } = false;
        public bool? Warning { get; set; } = false;
        public bool? Restrict { get; set; } = false;
    }
}
