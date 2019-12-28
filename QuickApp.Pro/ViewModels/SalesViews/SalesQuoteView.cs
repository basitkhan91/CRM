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

        #region Data Source
        public IEnumerable<PriorityViewModel> Priorities
        {
            get; set;
        }

        public IEnumerable<MasterSalesQuoteTypesViewModel> SalesQuoteTypes
        {
            get; set;
        }

        public IEnumerable<CustomerTypeViewModel> CustomerTypes
        {
            get; set;
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
        #endregion 
    }
}
