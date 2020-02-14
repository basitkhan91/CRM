using System;

namespace QuickApp.Pro.ViewModels.SalesViews
{
    public class SalesQuoteListView
    {
        public long? SalesQuoteId { get; set; }

        public DateTime? QuoteDate { get; set; }

        public string VersionNumber { get { return this.SalesQuoteId.HasValue ? $"V-{this.SalesQuoteId.Value}" : string.Empty; } }

        public long CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string CustomerCode { get; set; }

        public string Status { get; set; }

        public int StatusId { get; set; }

        public decimal SalesPrice { get; set; }

        public decimal Cost { get; set; }

        public int NumberOfItems { get; set; }

        public string SalesOrderQuoteNumber { get { return SalesQuoteId.HasValue ? $"Q-{SalesQuoteId.Value}" : "-"; } }

    }
}
