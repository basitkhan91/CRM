using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class AssetDepreciationMethodAudit : PasBaseAuditing
    {
        [Key]
        public long AssetDepreciationMethodAuditId { get; set; }

        public long? AssetDepreciationMethodId { get; set; }

        public string AssetDepreciationId { get; set; }

        public string AssetDepreciationMethodName { get; set; }

        public string AssetDepreciationBasis { get; set; }

        public string AssetDepreciationMemo { get; set; }

        public Int32 MasterCompanyId { get; set; }


    }
}
