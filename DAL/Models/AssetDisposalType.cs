using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public class AssetDisposalType:PasBase
    {
        public long AssetDisposalTypeId { get; set; }

        [Required(ErrorMessage = "Id Is Required.")]
        public string AssetDisposalId { get; set; }

        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDisposalName { get; set; }
        public string AssetDisposalMemo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
