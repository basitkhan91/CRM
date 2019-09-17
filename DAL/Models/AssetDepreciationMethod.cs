using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class AssetDepreciationMethod : PasBase, IAudit
    {
        [Key]
        public long? AssetDepreciationMethodId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDepreciationId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDepreciationMethodName { get; set; }

        public string AssetDepreciationBasis { get; set; }

        public string AssetDepreciationMemo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
