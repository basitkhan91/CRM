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

using DAL.Core.DataExtractors;
using DAL.Common;
using Microsoft.Extensions.Options;

namespace DAL.Repositories
{
    public class WarehouseRepository:Repository<Warehouse>, IWarehouseRepository
    {
        private AppSettings AppSettings { get; set; }

        public WarehouseRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

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

        public IEnumerable<Warehouse> BulkUpload(IFormFile file)
        {
            IEnumerable<Warehouse> wareHouses = Enumerable.Empty<Warehouse>();

            var dataExtractor = new WareHouseDataExtractor(AppSettings);

            wareHouses = dataExtractor.Extract(file, Common.ModuleEnum.WareHouse);

            foreach (var wareHouse in wareHouses)
            {
                if (IsValid(wareHouse))
                {
                    var site = GetSiteByName(wareHouse.Site.Name);  

                    if(site == null)
                    {
                        wareHouse.UploadStatus = "Site doesnot exist";

                        continue;
                    }

                    wareHouse.SiteId = site.SiteId;

                    wareHouse.Site = site;

                    if (!WareHouseNameAlreadyExist(wareHouse.Name))
                    {
                        _appContext.Warehouse.Add(wareHouse);

                        _appContext.SaveChanges();

                        wareHouse.WarehouseId = wareHouse.WarehouseId;

                        wareHouse.UploadStatus = "Success";
                    }
                    else
                    {
                        wareHouse.UploadStatus = "Duplicate";
                    }
                }
                else
                {
                    wareHouse.UploadStatus = "Required fields are missing";
                }
            }

            return wareHouses;
        }

        private bool IsValid(Warehouse warehouse)
        {
            return warehouse.Name != string.Empty && warehouse.Site.Name != string.Empty;  
        }

        private Site GetSiteByName(string name)
        {
            return _appContext.Site.Where(site => site.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
        }

        private bool WareHouseNameAlreadyExist(string value)
        {
            return _appContext.Warehouse.Any(wareHouse => 
                                            ((wareHouse.IsDelete.HasValue && wareHouse.IsDelete.Value == false) || (!wareHouse.IsDelete.HasValue))
                                             && wareHouse.Name.Equals(value, StringComparison.InvariantCultureIgnoreCase));
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
