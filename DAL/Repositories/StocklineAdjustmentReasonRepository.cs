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
        public IEnumerable<object> GetAllAdjustmentReasonData()
        {
            try
            {
                var result = (from ar in _appContext.stocklineAdjustmentReason
                             
                              select new
                              {

                                  ar.AdjustmentReasonId,
                                  ar.Description,
                                  ar.IsActive,
                                  ar.CreatedDate,
                                  ar.UpdatedDate,
                                  

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
