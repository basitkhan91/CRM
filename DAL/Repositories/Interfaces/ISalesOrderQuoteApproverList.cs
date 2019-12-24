using DAL.Models.Sales;
using System.Collections.Generic;
namespace DAL.Repositories.Interfaces
{
    public interface ISalesOrderQuoteApproverList
    {
        IEnumerable<SalesOrderQuoteApproverList> GetApproverList(long salesQuoteId);
        SalesOrderQuoteApproverList Create(SalesOrderQuoteApproverList quote);

        IEnumerable<SalesOrderQuoteApproverList> BulkCreate(IEnumerable<SalesOrderQuoteApproverList> approverLists);

        IEnumerable<SalesOrderQuoteApproverList> GetBySalesOrderQuoteId(int salesQuoteId, int masterCompanyId);

        IEnumerable<SalesOrderQuoteApproverList> BulkMerge(IEnumerable<SalesOrderQuoteApproverList> approverLists);

    }
}
