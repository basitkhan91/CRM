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
    public class ManagementBinRepository : Repository<ManagementBin>, IManagementBinRepository
    {
        public ManagementBinRepository(ApplicationDbContext context) : base(context)
        { }
        

            public IEnumerable<object> GetAllManagementBinData(long id)
        {
            try
            {
                var result = (from m in _appContext.ManagementBin
                              join ms in _appContext.ManagementStructure on m.ManagementStructureId equals ms.ManagementStructureId
                              where m.BinId == id

                              // select new { t, ad, vt }).ToList();
                              select new
                              {
                                  m,
                                  ms,
                                  ms.ParentId,
                                  ms.Code,
                                  ms.Description,
                                  m.ManagementBinId,
                                  m.ManagementStructureId,
                                  m.MasterCompanyId,
                                  m.BinId

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
