using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class AssetType:PasBase,IAudit
    {
        [Key]
        public long? AssetTypeId { get; set; }

        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetTypeName { get; set; }
        public string AssetTypeMemo { get; set; }
        public Int32? MasterCompanyId { get; set; }

        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }

        //[ForeignKey("AssetAttributeType")]
        //public long? AssetAttributeTypeId { get; set; }
        //public virtual AssetAttributeType AssetAttributeType { get; set; }
    }
}
