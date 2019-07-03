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
                                  ch.MarkUp,
                                  ch.PurchaseOrderId,
                                  ch.VendorId,
                                  ch.IntegrationPortalId,
                                  ch.GeneralLedgerId,
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

        public IEnumerable<object> getCurrencyData()
        {
            try
            {
                var result = (from cu in _appContext.Currency
                              

                              select new
                              {
                                  cu.CurrencyId,
                                  cu.Code,
                                  cu.Symbol
                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public IEnumerable<object> getPurchaseOrderNumbers()
        {
            try
            {
                var result = (from po in _appContext.PurchaseOrder

                              select new
                              {
                                  po.PurchaseOrderId,
                                  po.PurchaseOrderNumber
                                 
                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public IEnumerable<object> getVendorNmaes()
        {
            try
            {
                var result = (from vo in _appContext.Vendor

                              select new
                              {
                                  vo.VendorId,
                                  vo.VendorName

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public IEnumerable<object> IntegrationPortal()
        {
            try
            {
                var result = (from ip in _appContext.IntegrationPortal

                              select new
                              {
                                  ip.IntegrationPortalId,
                                  ip.Description

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
            return _appContext.Charge.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.ChargeId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    

}
}
