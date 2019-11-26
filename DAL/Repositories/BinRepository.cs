using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class BinRepository : Repository<Bin>, IBinRepository
    {
            public BinRepository(ApplicationDbContext context) : base(context)
            { }
        public IEnumerable<object> GetAllBinData()
        {
            try
            {
                var result = (from bi in _appContext.Bin
                              join sh in _appContext.Shelf on bi.ShelfId equals sh.ShelfId
                              join l in _appContext.Location on sh.LocationId equals l.LocationId
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId
                              join s in _appContext.Site on w.SiteId equals s.SiteId
                              join ad in _appContext.Address on s.AddressId equals ad.AddressId

                              where bi.IsDelete == false || bi.IsDelete == null
                              select new
                              {
                                  bi,
                                  sh,
                                  l,
                                  w,
                                  s,
                                  ad,
                                  bi.BinId,
                                  bi.ShelfId,
                                  shelfName=sh.Name,
                                  wareHouseName = w.Name,
                                  locationName = l.Name,
                                  SiteName = s.Name,
                                 
                                  bi.Name,
                                  bi.Memo,

                                  bi.CreatedDate,
                                  bi.CreatedBy,
                                  bi.UpdatedBy,
                                  bi.UpdatedDate,

                                  l.LocationId,
                                  w.WarehouseId,
                                  s.SiteId,
                                  bi.IsActive,

                                  Address1 = ad.Line1,
                                  Address2 = ad.Line2,
                                  Address3 = ad.Line3,
                                  ad.Country,
                                  ad.City,
                                  ad.StateOrProvince,
                                  ad.PostalCode

                                  


                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetAllBinDataById(long id)
        {
            try
            {
                var result = (from bi in _appContext.Bin
                              join sh in _appContext.Shelf on bi.ShelfId equals sh.ShelfId

                              where sh.ShelfId == id

                              select new
                              {
                                  bi,
                                  sh,
                                  bi.Name,
                                  bi.BinId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetAllShelfData(long id)
            {
                try
                {
                    var result = (from sh in _appContext.Shelf
                                  join l in _appContext.Location on sh.LocationId equals l.LocationId

                                  where l.LocationId == id

                                  select new
                                  {
                                      l,
                                      sh,
                                      sh.Name,
                                      sh.ShelfId

                                  }).ToList();
                    return result;
                }
                catch (Exception ex)
            {
                throw ex;
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
                throw ex;
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
                throw ex;
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
                                      l.Name,
                                      l.LocationId,
                                      l.WarehouseId



                                  }).ToList();
                    return result;
                }
                catch (Exception ex)
            {
                throw ex;
            }


            }

        public IEnumerable<object> GetManagementShelf(long id)
        {
            try
            {
                var result = (from s in _appContext.Shelf
                              join ms in _appContext.ManagementShelf on s.ShelfId equals ms.ShelfId

                              where s.ShelfId == id
                              select new
                              {
                                  ms.ManagementShelfId,
                                  ms.ManagementStructureId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        }
    }

