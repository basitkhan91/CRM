using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
  public class AssetDepConventionType:PasBase
    {
        public long? AssetDepConventionTypeId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDepConventionId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDepConventionName { get; set; }

        public string AssetDepConventionMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
