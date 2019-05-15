using System;
using DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CustomerWarningViewModel
    {
        public long CustomerWarningId { get; set; }
        public long CustomerId { get; set; }
        public string SourceModule { get; set; }
        public bool? Allow { get; set; }
        public bool? Warning { get; set; }
        public bool? Restrict { get; set; }
        public string WarningMessage { get; set; }
        public string RestrictMessage { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsAllow { get; set; }
        public bool? IsWarning{ get; set; }
        public bool? IsRestrict{ get; set; }
    }
}

