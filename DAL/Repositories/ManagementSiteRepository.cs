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
    public class ManagementSiteRepository : Repository<ManagementSite>, IManagementSiteRepository
    {
        public ManagementSiteRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> GetAllManagementSiteData(long id)
        {
            try
            {
                var result = (from m in _appContext.ManagementSite
                              join ms in _appContext.ManagementStructure on m.ManagementStructureId equals ms.ManagementStructureId
                              where m.SiteId==id

                              // select new { t, ad, vt }).ToList();
                              select new
                              {
                                 m,
                                 ms,
                                 ms.Code,
                                 ms.Description,
                                 m.ManagementSiteId,
                                 m.ManagementStructureId,
                                 m.MasterCompanyId,
                                 m.SiteId

                              }).ToList(); return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

       
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
