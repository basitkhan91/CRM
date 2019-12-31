using System;
using System.Collections.Generic;

namespace QuickApp.Pro.ViewModels
{
    public class SalesQuoteViewModel
    {
        public int QuoteTypeId { get; set; }

        public DateTime? OpenDate { get; set; }

        public DateTime? CustomerRequestDate { get; set; }

        public DateTime? CustomerPromisedDate { get; set; }

        public DateTime? EstimatedShipDate { get; set; }

        public int ValidForDays { get; set; }

        public DateTime? QuoteExpiryDate { get; set; }

        public int PriorityId { get; set; }

        public int AccountType { get; set; }

        public long CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string CustomerCode { get; set; }

        public long? CustomerContactId { get; set; }

        public string CustomerContactName { get; set; }

        public int CustomerReferenceId { get; set; }

        public string CustomerReferenceName { get; set; }

        public int ContractReferenceId { get; set; }

        public string ContractReferenceName { get; set; }

        public int SalesPersonId { get; set; }

        public string SalesPersonName { get; set; }

        public int AgentId { get; set; }

        public string AgentName { get; set; }

        public int CustomerServiceRepId { get; set; }

        public string CustomerServiceRepName { get; set; }

        /// <summary>
        /// In percentage
        /// </summary>
        public int Probability { get; set; }

        public int LeadSourceId { get; set; }

        public int CreditLimit { get; set; }

        public int CreditLimitTermsId { get; set; }

        public int EmployeeId{ get; set; }

        public string EmployeeName { get; set; }

        public bool RestrictPMA { get; set; }

        public bool RestrictDER { get; set; }

        public int QuoteApprovedById { get; set; }

        public string QuoteApprovedByName { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public int CurrencyId { get; set; }

        public int WarningId { get; set; }

        public string WarningName { get; set; }

        public string Memo { get; set; }

        public string Notes { get; set; }

        public int StatusId { get; set; }

        #region Data Source
        public IEnumerable<PriorityViewModel> Priorities
        {
            get;set;
        }

        public IEnumerable<MasterSalesQuoteTypesViewModel> SalesQuoteTypes
        {
            get;set;
        }

        public IEnumerable<CustomerTypeViewModel> CustomerTypes
        {
            get;set;
        }

        public IEnumerable<MasterSalesCreditTermsViewModel> CreditTerms
        {
            get; set;
        }

        public IEnumerable<MasterSalesProbablityViewModel> SalesProbablity
        {
            get; set;
        }

        public IEnumerable<MasterSalesLeadSourcesViewModel> LeadSources
        {
            get; set;
        }

        public IEnumerable<SalesViews.MasterSalesOrderQuoteStatusView> Status
        {
            get; set;
        }
        #endregion 
    }
}
