using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class StocklineAdjustmentReasonRepository : Repository<StocklineAdjustmentReason>, IStocklineAdjustmentReasonRepository
    {
        public StocklineAdjustmentReasonRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<DAL.Models.StocklineAdjustmentReason> GetAllAdjustmentReasonData(long adjustmentReasonId)
        {
            return _appContext.stocklineAdjustmentReason.Where(c => c.AdjustmentReasonId == adjustmentReasonId).OrderByDescending(p => p.UpdatedDate).ToList();
        }
        public IEnumerable<DAL.Models.StocklineAdjustmentReasonAudit> GetStocklineAdjustmentReasonAuditDetails(long iD)
        {
            return _appContext.stocklineAdjustmentReasonAudit.Where(c => c.AdjustmentReasonId == iD).OrderByDescending(p => p.UpdatedDate).ToList();

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
