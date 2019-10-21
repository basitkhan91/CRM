using System;
using System.ComponentModel.DataAnnotations;


namespace DAL.Models
{
   public class AssetDisposalTypeAudit : PasBaseAudit
    {
        [Key]
        public long? AssetDisposalTypeAuditId { get; set; }

        public long? AssetDisposalTypeId { get; set; }        
        public string AssetDisposalCode { get; set; }        
        public string AssetDisposalName { get; set; }
        public string AssetDisposalMemo { get; set; }
        public Int32 MasterCompanyId { get; set; }
   }
}
