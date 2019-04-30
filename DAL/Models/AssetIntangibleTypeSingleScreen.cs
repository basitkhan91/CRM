using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
  public class AssetIntangibleTypeSingleScreen:PasBase, IAudit
    {
        [Key]
        public long? AssetIntangibleTypeSingleId { get; set; }
        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetIntangibleSingleId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetIntangibleName { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string AssetIntangibleMemo { get; set; }
        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }
    }
}
