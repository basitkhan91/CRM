using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IStockLineList : IRepository<StockLine>
    {
        IEnumerable<object> GetAllStockLinelistData();
        IEnumerable<object> GetAllStockLinelistData(Filters<StockListFilters> stockListFilters);
        IEnumerable<object> GetAllCompanyData();
        IEnumerable<object> GetAllStockLineAdjustmentlistData(long id);
        IEnumerable<object> GetBinByShelfIdAdjustmentBeforeChange(long id);
        IEnumerable<Object> GetList(Filters<StockLineListFilters> stockLineFilters);
        IEnumerable<Object> GetListGlobalFilter(string value, int pageNumber, int pageSize);

        IEnumerable<object>  GetAllStockLineIntegrationPortalData(long id);
        IEnumerable<object> getStocklineDataById(long id);
        IEnumerable<object>  GetAllTimeLifeData(long id);
        void StocklineStatus(long StocklineId, bool status, string updatedBy);
        IEnumerable<StockLine> getStockLinesByIds(long[] ids);
        void CreateStockLine(StockLine model);
        IEnumerable<StockLineReport> GenerateStockLineReoprt();
    }
}
