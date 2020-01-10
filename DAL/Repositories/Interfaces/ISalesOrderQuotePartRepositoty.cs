using DAL.Models.Sales;
using System.Collections.Generic;
namespace DAL.Repositories.Interfaces
{
    public interface ISalesOrderQuotePartRepository
    {
        IEnumerable<SalesOrderQuotePart> GetPartsBySalesQuoteId(long salesQuoteId);

        IEnumerable<SalesOrderQuotePart> BulkCreate(IEnumerable<SalesOrderQuotePart> parts);

        IEnumerable<SalesOrderQuotePart> BulkUpdate(IEnumerable<SalesOrderQuotePart> parts);

        IEnumerable<SalesOrderQuotePart> BulkMege(IEnumerable<SalesOrderQuotePart> parts);

        bool Delete(long salesOrderQuotePartId);

    }
}
