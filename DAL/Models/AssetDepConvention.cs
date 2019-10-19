using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AssetDepConvention : PasBase, IAudit
    {
        [Key]
        public long? AssetDepConventionId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDepConventionCode { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDepConventionName { get; set; }

        public string AssetDepConventionMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
