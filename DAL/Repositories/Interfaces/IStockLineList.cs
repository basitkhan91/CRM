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
        IEnumerable<Object> GetListGlobalFilter(string value, int pageNumber, int pageSize);

        IEnumerable<object>  GetAllStockLineIntegrationPortalData(long id);
        IEnumerable<object> GetAllIntegrationPortalData();
        IEnumerable<object> getStocklineDataById(long id);
        IEnumerable<object> getStocklineDetailsById(long id);
        object GetStocklineDataByStockLineId(long id);
        IEnumerable<object>  GetAllTimeLifeData(long id);
        void StocklineStatus(long StocklineId, bool status, string updatedBy);
        IEnumerable<StockLineDraft> getStockLinesByIds(long[] ids);
        void CreateStockLine(StockLine model);
        IEnumerable<StockLineReport> GenerateStockLineReoprt();
        IEnumerable<object> StockLineReoprtView(Filters<StockLineReportFilter> slReportFilter);


        IEnumerable<object> GetAllWarehouseData(long siteId);
        IEnumerable<object> GetAllLocationData(long warehouseId);
        IEnumerable<object> GetAllShelfData(long locationId);
        IEnumerable<object> GetAllBinData(long shelfId);

    }
}
