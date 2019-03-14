using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class StockLineAdjustmentRepository : Repository<StocklineAdjustment>,IStocklineAdjustmentRepository
    {
        public StockLineAdjustmentRepository(ApplicationDbContext context) : base(context)
        { }
        

        public IEnumerable<object> GetAllStockLineAdjustmentDataTypeData()
        {
            try
            { 
                var result = (from slad in _appContext.StocklineAdjustmentDataType

                                  // select new { t, ad, vt }).ToList();
                              select new
                              {
                                  slad.StocklineAdjustmentDataTypeId,
                                  slad.Description,
                                  slad.CreatedBy


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
