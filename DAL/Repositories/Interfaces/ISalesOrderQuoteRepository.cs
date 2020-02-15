using DAL.Models.Sales.SalesOrderQuote;
using System.Collections.Generic;
namespace DAL.Repositories.Interfaces
{
    public interface ISalesOrderQuoteRepository
    {
        IEnumerable<SalesOrderQuote> GetAllSalesQuotes();
        SalesOrderQuote Create(SalesOrderQuote quote);

        bool Delete(long id);

        SalesOrderQuote UpdateSalesQuote(SalesOrderQuote quote);

        SalesOrderQuote Get(long id, bool enableTracking = true);

    }
}
