using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterSalesOrderQuoteTypesRepository
    {
        IEnumerable<DAL.Models.MasterSalesOrderQuoteTypes> GetAll();
    }
}
