using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IStocklineAdjustmentRepository : IRepository<StocklineAdjustment>
    {
        IEnumerable<object> GetAllStockLineAdjustmentDataTypeData();

        
    }

     

}
