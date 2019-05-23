using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class JournalManual : BaseEntity
    {
        [Key]
        public long ID { get; set; }
        public bool IsManual { get; set; }
        public long GLAccountId { get; set; }
        public string JournalManualBatchNumber { get; set; }
        public string JournalManualBatchName { get; set; }
        public string JournalManualBatchDescription { get; set; }
        public long JournalManualBalanceTypeId { get; set; }
        public long JournalManualCategoryId { get; set; }
        public long JournalManualTypeId { get; set; }
        public DateTime JournalManualEntryDate { get; set; }
        public DateTime JournalManualEffectiveDate { get; set; }
        public string JournalManualPeriodName { get; set; }
        public long JournalManualEmployeeId { get; set; }
        public Int32 JournalManualLocalCurrencyId { get; set; }
        public Int32 JournalManualReportingCurrencyId { get; set; }
        public DateTime JournalManualCurrencyDate { get; set; }
        public DateTime JournalManualCurrencyType { get; set; }
        public decimal JournalManualCurrencyRate { get; set; }
        public bool IsReversing { get; set; }
        public bool IsRecurring { get; set; }
        public DateTime JournalManualReversingDate { get; set; }
        public string ReversingPeriodName { get; set; }
        public DateTime JournalManualRecurringDate { get; set; }
        public Int32 MasterCompanyId { get; set; }
    }
}
