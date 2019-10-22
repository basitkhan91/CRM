using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AssetType : PasBase
    {
        [Key]
        public long? AssetTypeId { get; set; }

        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetTypeName { get; set; }
        public string AssetTypeMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }

    }
}
