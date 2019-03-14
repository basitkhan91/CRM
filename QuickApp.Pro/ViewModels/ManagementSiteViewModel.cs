using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ManagementSiteViewModel
    {
        public long ManagementSiteId { get; set; }
        public long? ManagementStructureId { get; set; }
        public long? SiteId { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
