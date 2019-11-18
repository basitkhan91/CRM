using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
  public class AssetDisposalType:PasBase, IAudit
    {
        [Key]
        public long? AssetDisposalTypeId { get; set; }

        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDisposalCode { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDisposalName { get; set; }
        public string AssetDisposalMemo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
