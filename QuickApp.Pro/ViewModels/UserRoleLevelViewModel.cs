using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace QuickApp.Pro.ViewModels
{
    public class UserRoleLevelViewModel
    {
        public long UserRoleLevelId { get; set; }
        public string Description { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
