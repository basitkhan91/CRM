using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterSalesOrderQuoteStatusRepository
    {
        IEnumerable<Models.Sales.MasterSalesOrderQuoteStatus> GetAll();
    }
}
