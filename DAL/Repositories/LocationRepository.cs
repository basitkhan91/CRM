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
using Microsoft.Extensions.Options;
using DAL.Common;
using DAL.Core.DataExtractors; 

namespace DAL.Repositories
{
    public class LocationRepository : Repository<Location>, ILocationRepository
    {
        private AppSettings AppSettings { get; set; }

        public LocationRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }
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

        public IEnumerable<Location> BulkUpload(IFormFile file)
        {
            IEnumerable<Location> locations = Enumerable.Empty<Location>();

            var dataExtractor = new LocationDataExtractor(AppSettings);

            locations = dataExtractor.Extract(file, Common.ModuleEnum.Location);

            foreach (var location in locations)
            {
                if (IsValid(location))
                {
                    var site = GetSiteByName(location.Site.Name);  

                    if(site == null)
                    {
                        location.UploadStatus = "Site name doesnot exist";
                        continue;
                    }

                    location.Site = site;  

                    var wareHouse = GetWareHouseByName(location.Warehouse.Name);

                    if(wareHouse == null)
                    {
                        location.UploadStatus = "Warehouse name doesnot exist";
                        continue;
                    }

                    location.Warehouse = wareHouse; 

                    if(location.Warehouse.SiteId != location.Site.SiteId)
                    {
                        location.UploadStatus = "Site and location mismatch";
                        continue;
                    }

                    location.WarehouseId = location.Warehouse.WarehouseId;
                    
                    if (!LocationNameAlreadyExist(location.Name))
                    {
                        _appContext.Location.Add(location);

                        _appContext.SaveChanges();  

                        location.UploadStatus = "Success";
                    }
                    else
                    {
                        location.UploadStatus = "Duplicate";
                    }
                }
                else
                {
                    location.UploadStatus = "Validation Error";
                }
            }

            return locations;
        }

        private static bool IsValid(Location location)
        {
            return (
                location.Name != string.Empty
               && location.Warehouse.Name != string.Empty
               && location.Site.Name != string.Empty
            );
        }

        private bool LocationNameAlreadyExist(string name)
        {
            return _appContext.Location.Any( location => ((location.IsDelete.HasValue && location.IsDelete.Value == false) || (!location.IsDelete.HasValue))
                                                && location.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
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
