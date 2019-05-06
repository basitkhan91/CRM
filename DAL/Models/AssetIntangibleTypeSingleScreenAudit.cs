using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AssetIntangibleTypeSingleScreenAudit : PasBase
    {
        [Key]
        public long? AssetIntangibleTypeSingleAuditId { get; set; }
        public long? AssetIntangibleTypeSingleId { get; set; }
        public string AssetIntangibleSingleId { get; set; }
        public string AssetIntangibleName { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string AssetIntangibleMemo { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsActive { get; set; }
    }
}