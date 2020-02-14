using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace DAL.Models.Sales.SalesOrderQuote
{
    public class SalesOrderQuote
    {
        [Key]
        public long? SalesOrderQuoteId { get; set; }
        public int QuoteTypeId { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime CustomerRequestDate { get; set; }
        public DateTime PromisedDate { get; set; }
        public DateTime EstimatedShipDate { get; set; }
        public int ValidForDays { get; set; }
        public DateTime QuoteExpireDate { get; set; }
        public long PriorityId { get; set; }
        public int AccountTypeId { get; set; }
        public long CustomerId { get; set; }
        public int CustomerContactId { get; set; }
        public string CustomerReference { get; set; }
        public string ContractReference { get; set; }
        public long SalesPersonId { get; set; }
        public string AgentName { get; set; }
        public long CustomerSeviceRepId { get; set; }
        public int ProbabilityId { get; set; }
        public int LeadSourceId { get; set; }
        public decimal CreditLimit { get; set; }
        public Int16 CreditTermId { get; set; }

        public long EmployeeId { get; set; }
        public bool? RestrictPMA { get; set; }
        public bool? RestrictDER { get; set; }
        public long? QuoteApprovedById { get; set; }
        public DateTime ApprovedDate { get; set; }
        public int CurrencyId { get; set; }
        public long CustomerWarningId { get; set; }
        public string Memo { get; set; }
        public string Notes { get; set; }
        public string ShipToSiteName { get; set; }
        public string ShipToAddress1 { get; set; }
        public string ShipToAddress2 { get; set; }
        public string ShipToAddress3 { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToState { get; set; }
        public string ShipToPostalCode { get; set; }
        public string ShipToCountry { get; set; }
        public long ShipToContactId { get; set; }
        public string ShipViaName { get; set; }
        public string ShipViaShippingAccountInfo { get; set; }
        public string ShippingId { get; set; }
        public string ShippingURL { get; set; }
        public string ShipViaMemo { get; set; }
        public string ShipViaShippingURL { get; set; }
        public string BillToSiteName { get; set; }
        public string BillToAddress1 { get; set; }
        public string BillToAddress2 { get; set; }
        public string BillToAddress3 { get; set; }
        public string BillToCity { get; set; }
        public string BillToState { get; set; }
        public string BillToPostalCode { get; set; }
        public string BillToCountry { get; set; }
        public long BillToContactId { get; set; }
        public string BillToMemo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsDeleted { get; set; }
        public int StatusId { get; set; }
        public DateTime StatusChangeDate { get; set; }
        public long? ManagementStructureId { get; set; }
    }
}
