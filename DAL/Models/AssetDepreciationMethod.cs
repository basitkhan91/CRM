using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class AssetDepreciationMethod : PasBase, IAudit
    {
        private string _AssetDepreciationMemo;
        [Key]
        public long? AssetDepreciationMethodId { get; set; }
        //[Required(ErrorMessage = "Id Is Required.")]
        //public string AssetDepreciationId { get; set; }

      

        public string AssetDepreciationMethodCode { get; set; }
        [Required(ErrorMessage = "Name Is Required.")]
        public string AssetDepreciationMethodName { get; set; }
        public string AssetDepreciationMethodBasis { get; set; }
        public string AssetDepreciationMemo
        {
            get
            {
                if (string.IsNullOrEmpty(_AssetDepreciationMemo))
                {
                    _AssetDepreciationMemo = "";

                }
                return _AssetDepreciationMemo;
            }
            set
            {
                _AssetDepreciationMemo = value;
            }
        }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
