using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IStocklineAdjustmentReasonRepository : IRepository<StocklineAdjustmentReason>
    {
        IEnumerable<object> GetAllAdjustmentReasonData();
    }
}
