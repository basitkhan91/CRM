using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels.SalesViews
{
    public class SalesQuoteView
    {
        public SalesOrderQuoteView SalesOrderQuote { get; set; }

        public List<SalesOrderQuoteApproverListView> ApproverList { get; set; }

        public List<SalesOrderQuotePartView> Parts { get; set; }

    }
}
