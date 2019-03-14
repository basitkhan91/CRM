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
    public class SiteRepository:Repository<Site>, ISiteRepository
    {
        public SiteRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> GetAllSiteData()
        {
            try
            {
                var result = (from t in _appContext.Site
                              join ad in _appContext.Address on t.AddressId equals ad.AddressId
                              where t.IsDelete == false
                          
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

                return null;
            }


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
