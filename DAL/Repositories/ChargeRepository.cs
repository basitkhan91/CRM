using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DAL.Repositories
{
    public class ChargeRepository : Repository<Charge>, ICharge
    {
        
        public ChargeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetAllChargeData()
        {
            try
            {
                var result = (from ch in _appContext.Charge
                              join ms in _appContext.ManagementStructure on ch.ManagementStructureId equals ms.ManagementStructureId
                              join cu in _appContext.Currency on ch.CurrencyId equals cu.CurrencyId
                              join ve in _appContext.Vendor on ch.VendorId equals ve.VendorId
                              join po in _appContext.PurchaseOrder on ch.PurchaseOrderId equals po.PurchaseOrderId
                              join ip in _appContext.IntegrationPortal on ch.IntegrationPortalId equals ip.IntegrationPortalId
                              select new
                              {
                                  ch.ChargeId,
                                  ch.ChargeName,
                                  ch.Quantity,
                                  ch.Description,
                                  ch.CurrencyId,
                                  ch.Cost,
                                  ch.MarkUpPercentage,
                                  ch.PurchaseOrderId,
                                  ch.VendorId,
                                  ch.IntegrationPortalId,
                                  ch.GLAccountId,
                                  ch.Memo,
                                  ch.IsActive,
                                  ch.ManagementStructureId,
                                  ch.BillableAmount,
                                  ms.Code,
                                  cu.Symbol,
                                  po.PurchaseOrderNumber,
                                  ve.VendorName,
                                  IntegrationPortalDescription = ip.Description,
                                 
                                 



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
            
        }

        override
       public IQueryable<DAL.Models.Charge> GetPaginationData()
        {
            return _appContext.Charge.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.ChargeId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    

}
}
