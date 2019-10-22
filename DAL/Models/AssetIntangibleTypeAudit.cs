using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AssetIntangibleTypeAudit : PasBase
    {
        [Key]
        public long? AssetIntangibleTypeAuditId { get; set; }
        public long? AssetIntangibleTypeId { get; set; }
        public string AssetIntangibleName { get; set; }
        public string AssetIntangibleMemo { get; set; }
        public int? MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
    }
}