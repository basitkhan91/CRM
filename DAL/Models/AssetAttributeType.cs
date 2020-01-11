using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.Core;

namespace DAL.Models
{
    public class AssetAttributeType : PasBase
    {
        [Key]
        public long? AssetAttributeTypeId { get; set; }

        [ForeignKey("AssetTypeId")]
        public long? AssetTypeId { get; set; }

        public string AssetAttributeTypeName { get; set; }

        public string Description { get; set; }

        public long? ConventionType { get; set; }

        public long? DepreciationMethod { get; set; }

        public byte ResidualPercentage { get; set; }

        public decimal? ResidualValue { get; set; }

        public int? AssetLife { get; set; }

        public long? DepreciationFrequencyId { get; set; }

        [ForeignKey("AcquiredGLAccountId")]
        public long? AcquiredGLAccountId { get; set; }

        [ForeignKey("DeprExpenseGLAccountId")]
        public long? DeprExpenseGLAccountId { get; set; }

        [ForeignKey("AdDepsGLAccountId")]
        public long? AdDepsGLAccountId { get; set; }

        public long? AssetSale { get; set; }

        public long? AssetWriteOff { get; set; }

        public long? AssetWriteDown { get; set; }

        public long? ManagementStructureId { get; set; }

        public string selectedCompanyIds { get; set; }

        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        [NotMapped]
        public UploadTag UploadTag { get; set; }
    }
}
