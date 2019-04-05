using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class AssetTypeSingleScreen:PasBase
    {
        [Key]
        public long? AssetTypeSingleScreenId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetTypeSingleId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetTypeName { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string AssetTypeMemo { get; set; }
        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }
    }
}
