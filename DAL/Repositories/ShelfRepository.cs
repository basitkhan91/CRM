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
    public class ShelfRepository:Repository<Shelf>, IShelfRepository
    {
        public ShelfRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> GetAllShelfData()
        {
            try
            {
                var result = (from sh in _appContext.Shelf
                              join l in _appContext.Location on sh.LocationId equals l.LocationId
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId
                              join s in _appContext.Site on w.SiteId equals s.SiteId
                              join ad in _appContext.Address on s.AddressId equals ad.AddressId

                              where sh.IsDelete == false || sh.IsDelete == null
                              select new
                              {
                                  sh,
                                  l,
                                  w,
                                  s,
                                  ad,
                                  sh.ShelfId,
                                  wareHouseName = w.Name,
                                  sh.LocationId,
                                  sh.Name,
                                  sh.Memo,
                                  sh.IsActive,
                                  sh.CreatedDate,
                                  sh.CreatedBy,
                                  sh.UpdatedBy,
                                  sh.UpdatedDate,
                                  
                                   w.WarehouseId,

                                  locationName = l.Name,
                                  Address1 = ad.Line1,
                                  Address2 = ad.Line2,
                                  Address3 = ad.Line3,
                                  ad.Country,
                                  ad.City,
                                  ad.StateOrProvince,
                                  ad.PostalCode,


                                  //w.WarehouseId,
                                  SiteName = s.Name,
                                  s.SiteId
                                  

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
                                  WarehouseName = w.Name,
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

        public IEnumerable<object> GetAllShelfStockData(long id)
        {
            try
            {
                var result = (from sh in _appContext.Shelf
                              join l in _appContext.Location on sh.LocationId equals l.LocationId

                              where l.LocationId == id
                              select new
                              {
                                  
                                  sh.Name,
                                  sh.ShelfId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetAllLocationData(long id)
        {
            try
            {
                var result = (from l in _appContext.Location
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId

                              where w.WarehouseId == id
                              select new
                              {
                                  l,
                                  w,
                                  l.Name,
                                  l.LocationId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetManagementLocation(long id)
        {
            try
            {
                var result = (from l in _appContext.Location
                              join ml in _appContext.ManagementLocation on l.LocationId equals ml.LocationId

                              where l.LocationId == id
                              select new
                              {
                                  ml.ManagementLocationId,
                                  ml.ManagementStructureId



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
