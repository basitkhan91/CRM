using DAL.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class AssetIntangibleType : PasBase
    {
        [Key]
        public long? AssetIntangibleTypeId { get; set; }
        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetIntangibleName { get; set; }
        public string AssetIntangibleMemo { get; set; }
        public int? MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }

        [NotMapped]
        public UploadTag UploadTag { get; set; }
    }
}
