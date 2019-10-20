using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AssetDepConventionAudit : PasBase
    {
        [Key]
        public long? AssetDepConventionAuditId { get; set; }
        public long? AssetDepConventionId { get; set; }
        public string AssetDepConventionCode { get; set; }
        public string AssetDepConventionName { get; set; }
        public string AssetDepConventionMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
