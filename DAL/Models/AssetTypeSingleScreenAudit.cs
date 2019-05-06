using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class AssetTypeSingleScreenAudit : PasBase
    {
        [Key]
        public long? AssetTypeSingleScreenAuditId { get; set; }
        public long? AssetTypeSingleScreenId { get; set; }
        public string AssetTypeSingleId { get; set; }
        public string AssetTypeName { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string AssetTypeMemo { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsActive { get; set; }
    }
}
