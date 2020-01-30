using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class VendorWarnings
    {
        [Key]
        public long VendorWarningId { get; set; }
        public long VendorId { get; set; }
        public string SourceModule { get; set; }
        public bool? Allow { get; set; }
        public bool? Warning { get; set; }
        public bool? Restrict { get; set; }
        public string WarningMessage { get; set; }
        public string RestrictMessage { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsAllow { get; set; }
        public bool? IsRestrict { get; set; }
        public bool? IsWarning { get; set; }
    }
}
