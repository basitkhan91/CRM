using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderQuote
    {
        [Key]
        public long WorkOrderQuoteId { get; set; }
        [ForeignKey("WorkOrderId")]
        public long WorkOrderId { get; set; }
        public string QuoteNumber { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime QuoteDueDate { get; set; }
        public int ValidForDays { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int QuoteStatusId { get; set; }
        
        [ForeignKey("CustomerId")]
        public long CustomerId { get; set; }
        public int Quantity { get; set; }
        public int ItemCount { get; set; }
        public long CurrencyId { get; set; }
        public string DSO { get; set; }
        public decimal AccountsReceivableBalance { get; set; }
        public long? SalesPersonId { get; set; }
        public long? EmployeeId { get; set; }
        public string Memo { get; set; }
        public string Warnings { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public string CurrencyName { get; set; }
        [NotMapped]
        public string CurrencyCode { get; set; }
        [NotMapped]
        public string CustomerName { get; set; }
        [NotMapped]
        public string CustomerCode { get; set; }
        [NotMapped]
        public string CustomerContact { get; set; }
        [NotMapped]
        public string CustomerEmail { get; set; }
        [NotMapped]
        public string CustomerPhone { get; set; }
        [NotMapped]
        public string CustomerReference { get; set; }
        [NotMapped]
        public decimal? CreditLimit { get; set; }
        [NotMapped]
        public int CreditTermId { get; set; }
        [NotMapped]
        public string CreditTerm { get; set; }
        
        [NotMapped]
        public string SalesPersonName { get; set; }
        
        [NotMapped]
        public string EmployeeName { get; set; }
        [NotMapped]
        public string workOrderNumber { get; set; }

    }
}
