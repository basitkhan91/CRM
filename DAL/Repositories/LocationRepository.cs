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

using System.Threading.Tasks;
using DAL.Core;

namespace DAL.Repositories
{
    public class LocationRepository : Repository<Location>, ILocationRepository
    {
        public LocationRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> GetAllLocationData()
        {
            try
            {
                var result = (from l in _appContext.Location
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId
                              join s in _appContext.Site on w.SiteId equals s.SiteId
                              join ad in _appContext.Address on s.AddressId equals ad.AddressId

                              where l.IsDelete == false || l.IsDelete == null
                              select new
                              {
                                  l,
                                  w,
                                  s,
                                  ad,
                                  l.LocationId,
                                  l.WarehouseId,
                                  l.Name,
                                  l.Memo,
                                  l.CreatedDate,
                                  l.CreatedBy,
                                  l.UpdatedBy,
                                  l.UpdatedDate,
                                  l.IsActive,
                                  //l.siteId,

                                  warehouseName = w.Name,

                                  Address1 = ad.Line1,
                                  Address2 = ad.Line2,
                                  Address3 = ad.Line3,
                                  ad.Country,
                                  ad.City,
                                  ad.StateOrProvince,
                                  ad.PostalCode,

                                 
                                  //w.WarehouseId,
                                  SiteName = s.Name,
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

        public IEnumerable<object> GetAllWarehouseData(long id)
        {
            try
            {
                var result = (from w in _appContext.Warehouse
                              join s in _appContext.Site on w.SiteId equals s.SiteId

                              where s.SiteId == id
                              select new
                              {
                                  WarehouseName=w.Name,
                                  w.WarehouseId,
                                  w.SiteId

                                 

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetLocationStockData(long id)
        {
            try
            {
                var result = (from l in _appContext.Location
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId

                              where w.WarehouseId == id
                              select new
                              {
                                  LocationName = l.Name,
                                  l.LocationId
                                 



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetManagementWareHouse(long id)
        {
            try
            {
                var result = (from w in _appContext.Warehouse
                              join mw in _appContext.ManagementWarehouse on w.WarehouseId equals mw.WarehouseId

                              where w.WarehouseId == id
                              select new
                              {
                                  mw.ManagementWarehouseId,
                                  mw.ManagementStructureId



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
