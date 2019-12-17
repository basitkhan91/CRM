using System;

namespace QuickApp.Pro.ViewModels.SalesViews
{
    public class SalesQuoteSearchParameters : IPaginateViewModel, ISortedViewModel
    {
        public int first { get; set; }
        public int page { get; set; }

        public int pageCount { get; set; }

        public int rows { get; set; }
        public int limit { get; set; }
        public int sortOrder { get; set; }
        public string sortField { get; set; }

        public long? SalesQuoteNumber { get; set; }

        public string CustomerName { get; set; }

        public string Status { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

    }
}
