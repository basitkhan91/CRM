using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class AssetIntangibleType : PasBase, IAudit
    {
        [Key]
        public long? AssetIntangibleTypeId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetIntangibleCode { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetIntangibleName { get; set; }
        public string AssetIntangibleMemo { get; set; }

        public int? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }

        //public virtual AssetIntangibleTypeSingleScreen AssetIntangibleTypeSingleScreen { get; set; }

    }
}
