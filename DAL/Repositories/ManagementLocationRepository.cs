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
    public class ManagementLocationRepository : Repository<ManagementLocation>, IManagementLocationRepository
    {
        public ManagementLocationRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> GetAllManagementLocationData(long id)
        {
            try
            {
                var result = (from m in _appContext.ManagementLocation
                              join ms in _appContext.ManagementStructure on m.ManagementStructureId equals ms.ManagementStructureId
                              where m.LocationId == id

                              // select new { t, ad, vt }).ToList();
                              select new
                              {
                                  m,
                                  ms,
                                  ms.Code,
                                  ms.Description,
                                  m.ManagementLocationId,
                                  m.ManagementStructureId,
                                  m.MasterCompanyId,
                                  m.LocationId

                              }).ToList(); return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
