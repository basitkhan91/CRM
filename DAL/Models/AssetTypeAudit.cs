using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AssetTypeAudit : PasBase
    {
        [Key]
        public long? AssetTypeAuditId { get; set; }
        public long AssetTypeId { get; set; }
        public string AssetTypeName { get; set; }
        public string AssetTypeMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsActive { get; set; }
    }
}
