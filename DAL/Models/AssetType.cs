using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
 public  class AssetType:PasBase
    {
        [Key]
        public long? AssetTypeId { get; set; }

        public string AssetTypeName { get; set; }

        public string Description { get; set; }

        public long? ConventionType { get; set; }

        public long? DepreciationMethod { get; set; }

        public byte ResidualPercentage { get; set; }

        public decimal? ResidualValue { get; set; }

        public int? AssetLife { get; set; }

        public long? DepreciationFrequencyId { get; set; }

        //[ForeignKey("AcquiredGLAccountId")]
        public long? AcquiredGLAccountId { get; set; }
        //[ForeignKey("DeprExpenseGLAccountId")]
        public long? DeprExpenseGLAccountId { get; set; }
        //[ForeignKey("AdDepsGLAccountId")]
        public long? AdDepsGLAccountId { get; set; }

        public decimal? AssetSale { get; set; }

        public decimal? AssetWriteOff { get; set; }

        public decimal? AssetWriteDown { get; set; }

        public long? ManagementStructureId { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
        //public ICollection<GLAccount> GLAccount { get; set; }
    }
}
