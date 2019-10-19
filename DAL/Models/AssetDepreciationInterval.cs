using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class AssetDepreciationInterval: PasBase
    {
        [Key]
        public long AssetDepreciationIntervalId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDepreciationIntervalCode { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDepreciationIntervalName { get; set; }
        public string AssetDepreciationIntervalMemo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }
    }
}
