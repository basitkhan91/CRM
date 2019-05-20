using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
     public class JournalBatch : BaseEntity
    {
        [Key]
        public long ID { get; set; }
        public string JournalBatchNumber { get; set; }
        public string JournalBatchDescription { get; set; }
        public long  GLAccountId { get; set; }
        public long JournalSourceId { get; set; }
        public long JournalTypeId { get; set; }
        public long JournalPeriodId { get; set; }
        public Int32 LocalCurrencyId { get; set; }
        public Decimal LocalDebitAmount { get; set; }
        public Decimal LocalCreditAmount { get; set; }
        public Int32 ReportingCurrencyId { get; set; }
        public Decimal ReportingDebitAmount { get; set; }
        public Decimal ReportingCreditAmount { get; set; }
        public Nullable<bool> IsReversing { get; set; }
        public Nullable<bool> IsRecurring { get; set; }
        public Int32? MasterCompanyId { get; set; }
    }
}
