using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class AssetAttributeTypeAudit : PasBase
    {
        [Key]
        public long AssetAttributeTypeAuditId { get; set; }
        public long? AssetAttributeTypeId { get; set; }
        public long? AssetTypeId { get; set; }
        public string AssetAttributeTypeName { get; set; }
        public string Description { get; set; }
        public long? ConventionType { get; set; }
        public long? DepreciationMethod { get; set; }
        public byte ResidualPercentage { get; set; }
        public decimal? ResidualValue { get; set; }
        public int? AssetLife { get; set; }
        public long? DepreciationFrequencyId { get; set; }
        public long? AcquiredGLAccountId { get; set; }
        public long? DeprExpenseGLAccountId { get; set; }
        public long? AdDepsGLAccountId { get; set; }
        public decimal? AssetSale { get; set; }
        public decimal? AssetWriteOff { get; set; }
        public decimal? AssetWriteDown { get; set; }
        public long? ManagementStructureId { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
    }
}
