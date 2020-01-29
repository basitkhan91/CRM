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
        public long BatchNumber { get; set; }
        public string BatchName { get; set; }
        public string BatchDescription { get; set; }
        public long GLAccountId { get; set; }
        public long BalanceTypeId { get; set; }
        public long JournalCategoryId { get; set; }
        public long JournalTypeId { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime EffectiveDate { get; set; }
        public long AccountingCalendarId { get; set; }
        public long EmployeeId { get; set; }
        public Int32 LocalCurrencyId { get; set; }
        public Int32 ReportingCurrencyId { get; set; }
        public DateTime? CurrencyDate { get; set; }
        public long JournalCurrencyTypeId { get; set; }
        public decimal? CurrencyRate { get; set; }
        public bool IsReversing { get; set; }
        public DateTime? ReversingDate { get; set; }
        public long? ReversingAccountingCalendarId { get; set; }
        public bool IsRecurring { get; set; }
        public DateTime? RecurringDate { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public decimal? LocalDebitCurrency { get; set; }
        public decimal? LocalCreditCurrency { get; set; }
        public decimal? ReportingDebitCurrency { get; set; }
        public decimal? ReportingCreditCurrency { get; set; }
        public string Description { get; set; }
        public long? ManagementStructureEntityId { get; set; }
    }
}
