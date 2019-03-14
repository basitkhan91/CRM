using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IStockLineList : IRepository<StockLine>
    {
        IEnumerable<object> GetAllStockLinelistData();
        IEnumerable<object> GetAllCompanyData();
        IEnumerable<object> GetAllStockLineAdjustmentlistData(long id);
        IEnumerable<object> GetBinByShelfIdAdjustmentBeforeChange(long id);

        IEnumerable<object>  GetAllStockLineIntegrationPortalData(long id);
        IEnumerable<object>  GetAllTimeLifeData(long id);
    }
}
