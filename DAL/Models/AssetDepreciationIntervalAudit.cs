using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AssetDepreciationIntervalAudit : PasBase
    {
        [Key]
        public long AssetDepreciationIntervalAuditId { get; set; }
        public long AssetDepreciationIntervalId { get; set; }
        public string AssetDepreciationIntervalCode { get; set; }
        public string AssetDepreciationIntervalName { get; set; }
        public string AssetDepreciationIntervalMemo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
