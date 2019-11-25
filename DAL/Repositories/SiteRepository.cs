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
using DAL.Core.DataExtractors;
using Microsoft.Extensions.Options;
using DAL.Common; 

namespace DAL.Repositories
{
    public class SiteRepository:Repository<Site>, ISiteRepository
    {
        private AppSettings AppSettings { get; set; }

        private ApplicationDbContext Context { get; set; }
        public SiteRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            Context = context;  

            AppSettings = settings.Value;
        }

        public IEnumerable<object> GetAllSiteData()
        {
            try
            {
                var result = (from t in _appContext.Site
                              join ad in _appContext.Address on t.AddressId equals ad.AddressId
                              where  ( !t.IsDelete.HasValue || t.IsDelete.Value == false )                          
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                ad,
                                t,
                                t.Name,
                                ad.City,
                                ad.StateOrProvince,
                                t.IsActive,
                                t.SiteId,
                                t.Memo,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                               
                                
                               
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,
                                
                            }).ToList();
                //var result = _appContext.Site.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.SiteId).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public IEnumerable<Site> BulkUpload(IFormFile file)
        {
            IEnumerable<Site> sites = Enumerable.Empty<Site>();

            var dataExtractor = new SiteDataExtractor(AppSettings);

            sites = dataExtractor.Extract(file, Common.ModuleEnum.Site);

            foreach(var site in sites)
            {
                if (IsValid(site))
                {
                    if (!SiteNameAlreadyExist(site.Name))
                    {
                        Context.Address.Add(site.Address);

                        Context.SaveChanges();

                        site.AddressId = site.Address.AddressId;

                        Context.Site.Add(site);

                        Context.SaveChanges();

                        site.UploadStatus = "Success";
                    }
                    else
                    {
                        site.UploadStatus = "Duplicate";
                    }
                }
                else
                {
                    site.UploadStatus = "Validation Error";
                }
            }

            return sites;
        }

        private static bool IsValid(Site site)
        {
            return (
                site.Name != string.Empty
                && site.Address.Line1 != string.Empty
                && site.Address.City != string.Empty
                && site.Address.StateOrProvince != string.Empty
                && site.Address.Country != string.Empty
                && site.Address.PostalCode != string.Empty
            );
        }

        private bool SiteNameAlreadyExist(string value)
        {
            return Context.Site.Any(site =>  ( ( site.IsDelete.HasValue && site.IsDelete.Value == false ) || ( !site.IsDelete.HasValue ) )  
                                                && site.Name == value);
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
