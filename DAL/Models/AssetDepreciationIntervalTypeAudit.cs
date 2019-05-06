using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
   public class AssetDepreciationIntervalTypeAudit :PasBase
    {
        [Key]
        public long AssetDepreciationIntervalTypeAuditId { get; set; }
        public long AssetDepreciationIntervalTypeId { get; set; }
        public string AssetDepreciationIntervalId { get; set; }
        public string AssetDepreciationIntervalName { get; set; }
        public string AssetDepreciationIntervalMemo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
