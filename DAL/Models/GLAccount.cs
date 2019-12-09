using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class GLAccount : PasBase
    {
        [Key]
        public long? GLAccountId { get; set; }


        public string OldAccountCode { get; set; }

        public string AccountCode { get; set; }

        public string AccountName { get; set; }

        public string AccountDescription { get; set; }

        public bool AllowManualJE { get; set; }

        public bool ActiveFlag { get; set; }

        public bool BalanceTypeActual { get; set; }

        public bool BalanceTypeBudget { get; set; }

        public bool BalanceTypeForecast { get; set; }

        public string AccountCodeDescription { get; set; }
        public DateTime GLCreatedDate { get; set; }
        public string GLCreatedBy { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int? MasterCompanyId { get; set; }

        public bool IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public long? GLAccountTypeId { get; set; }

        public long? GLAccountNodeId { get; set; }

        public long? POROCategoryId { get; set; }

        public long? GLClassFlowClassificationId { get; set; }

        public virtual GlClassFlowClassification GlClassFlowClassification { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }

        public string LedgerName { get; set; }

        public string LeafNodeName { get; set; }
    }
}