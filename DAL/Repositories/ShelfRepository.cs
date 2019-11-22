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
using Microsoft.Extensions.Options;
using DAL.Common;
using DAL.Core.DataExtractors;

namespace DAL.Repositories
{
    public class ShelfRepository:Repository<Shelf>, IShelfRepository
    {
        private AppSettings AppSettings { get; set; }

        public ShelfRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

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
                                  w,
                                  l.Name,
                                  l.LocationId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
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
                throw ex;
            }


        }

        public IEnumerable<Shelf> BulkUpload(IFormFile file)
        {
            IEnumerable<Shelf> shelfs = Enumerable.Empty<Shelf>();

            var dataExtractor = new ShelfDataExtractor(AppSettings);

            shelfs = dataExtractor.Extract(file, Common.ModuleEnum.Shelf);

            foreach (var shelf in shelfs)
            {
                if (IsValid(shelf))
                {
                    var site = GetSiteByName(shelf.Site.Name);

                    if (site == null)
                    {
                        shelf.UploadStatus = "Site name doesnot exist";
                        continue;
                    }

                    shelf.Site = site;

                    var wareHouse = GetWareHouseByName(shelf.Warehouse.Name);

                    if (wareHouse == null)
                    {
                        shelf.UploadStatus = "Warehouse name doesnot exist";
                        continue;
                    }

                    shelf.Warehouse = wareHouse;

                    if (shelf.Warehouse.SiteId != shelf.Site.SiteId)
                    {
                        shelf.UploadStatus = "Site and location mismatch";
                        continue;
                    }

                    var location = GetLocationByName(shelf.Location.Name);

                    if (location == null)
                    {
                        shelf.UploadStatus = "location name name doesnot exist";
                        continue;

                    }

                    shelf.Location = location;

                    if (shelf.Location.WarehouseId != shelf.Warehouse.WarehouseId)
                    {
                        shelf.UploadStatus = "Location and warehouse mismatch ";
                        continue;
                    }

                    shelf.LocationId = shelf.Location.LocationId;

                    if (!ShelfNameAlreadyExist(shelf.Location.Name))
                    {
                        _appContext.Shelf.Add(shelf);

                        _appContext.SaveChanges();

                        shelf.UploadStatus = "Success";
                    }
                    else
                    {
                        shelf.UploadStatus = "Duplicate";
                    }
                }
                else
                {
                    shelf.UploadStatus = "Validation Error";
                }
            }

            return shelfs;
        }

        private static bool IsValid(Shelf shelf)
        {
            return (
                shelf.Name != string.Empty
                && shelf.Location.Name != string.Empty
                && shelf.Warehouse.Name != string.Empty
                && shelf.Site.Name != string.Empty
            );
        }

        private bool ShelfNameAlreadyExist(string name)
        {
            return _appContext.Shelf.Any(shelf => ((shelf.IsDelete.HasValue && shelf.IsDelete.Value == false) || (!shelf.IsDelete.HasValue))
                                               && shelf.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
        }

        private Location GetLocationByName(string name)
        {
            return _appContext.Location.Where(location => location.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
        }

        private Warehouse GetWareHouseByName(string name)
        {
            return _appContext.Warehouse.Where(wareHouse => wareHouse.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
        }

        private Site GetSiteByName(string name)
        {
            return _appContext.Site.Where(site => site.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
        }



        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
