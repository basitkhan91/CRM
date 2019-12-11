using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels.SalesViews
{
    public class SalesOrderQuoteApproverListView
    {
        public long? SalesOrderQuoteApproverListId { get; set; }
        public long? SalesOrderQuoteId { get; set; }
        public long EmployeeId { get; set; }
        public int Level { get; set; }
        public int StatusId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
