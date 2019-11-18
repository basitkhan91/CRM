using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IStocklineAdjustmentReasonRepository : IRepository<StocklineAdjustmentReason>
    {
        IEnumerable<DAL.Models.StocklineAdjustmentReason> GetAllAdjustmentReasonData(long adjustmentReasonId);
        IEnumerable<DAL.Models.StocklineAdjustmentReasonAudit> GetStocklineAdjustmentReasonAuditDetails(long adjustmentReasonId);
    }
}
