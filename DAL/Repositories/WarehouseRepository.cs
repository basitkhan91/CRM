using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class WarehouseRepository:Repository<Warehouse>, IWarehouseRepository
    {
        public WarehouseRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> GetAllWarehouseData()
        {
            try
            {
                var result = (from w in _appContext.Warehouse
                              join s in _appContext.Site on w.SiteId equals s.SiteId
                              join ad in _appContext.Address on s.AddressId equals ad.AddressId
                              where w.IsDelete == false || w.IsDelete == null
                              select new
                              {
                                  w,
                                  s,
                                  ad,
                                 
                                  

                                  w.WarehouseId,
                                  w.Name,
                                  w.Memo,
                                  w.CreatedDate,
                                  w.CreatedBy,
                                  w.UpdatedBy,
                                  w.UpdatedDate,
                                  w.IsActive,

                                  Address1 = ad.Line1,
                                  Address2 = ad.Line2,
                                  Address3 = ad.Line3,
                                  ad.Country,
                                    ad.City,
                                  stateOrProvince = ad.StateOrProvince,
                                  ad.PostalCode,

                                  siteName = s.Name,
                                  s.SiteId,
                                  
                                 
                                 
                                 

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetAllAddressData(long id)
        {
            try
            {
                var result = (from s in _appContext.Site
                              join ad in _appContext.Address on s.AddressId equals ad.AddressId
                              
                              where s.SiteId == id
                              select new
                              {
                                 

                                  Address1 = ad.Line1,
                                  Address2 = ad.Line2,
                                  Address3 = ad.Line3,
                                  ad.Country,
                                  ad.City,
                                  stateOrProvince = ad.StateOrProvince,
                                  ad.PostalCode
                                  





                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetAllWareHouseData(long id)
        {
            try
            {
                var result = (from w in _appContext.Warehouse
                              join s in _appContext.Site on w.SiteId equals s.SiteId

                              where s.SiteId == id
                              select new
                              {


                                 
                                 w.Name,
                                 w.WarehouseId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetManagementSite(long id)
        {
            try
            {
                var result = (from s in _appContext.Site
                              join ms in _appContext.ManagementSite on s.SiteId equals ms.SiteId

                              where s.SiteId == id
                              select new
                              {
                                  ms.ManagementSiteId,
                                  ms.ManagementStructureId



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
