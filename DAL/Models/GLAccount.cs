using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class GLAccount : PasBase
    {
        public long? GLAccountId { get; set; }

        public string LedgerName { get; set; }

        public string OldAccountCode { get; set; }

        public string AccountCode { get; set; }

        public string AccountName { get; set; }

        public string AccountDescription { get; set; }

        public bool SummaryAccount { get; set; }

        public bool AllowManualJE { get; set; }

        public Int32? CurrencyId { get; set; }

        public bool InterCompany { get; set; }

        public bool ActiveFlag { get; set; }

        public bool BalanceTypeActual { get; set; }

        public bool BalanceTypeBudget { get; set; }

        public bool BalanceTypeForecast { get; set; }

        public long? SubAccountOf { get; set; }

        public string AccountCodeDescription { get; set; }

        public DateTime GLCreatedDate { get; set; }

        public string GLCreatedBy { get; set; }

        public int? MasterCompanyId { get; set; }

        public bool IsActive { get; set; }

        public bool? IsDelete { get; set; }

        [ForeignKey("GLAccountTypeId")]
        public long GLAccountTypeId { get; set; }

        [ForeignKey("GLClassFlowClassificationId")]
        public long GLClassFlowClassificationId { get; set; }

        [ForeignKey("GLAccountMiscCategoryId")]
        public long GLAccountMiscCategoryId { get; set; }

        //public virtual Currency Currency { get; set; }
    }
}