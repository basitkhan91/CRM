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
    public class ManagementWarehouseRepository : Repository<ManagementWarehouse>, IManagementWarehouseRepository
    {
        public ManagementWarehouseRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<object> GetAllManagementWarehouseData(long id)
        {
            try
            {
                var result = (from mw in _appContext.ManagementWarehouse
                              join ms in _appContext.ManagementStructure on mw.ManagementStructureId equals ms.ManagementStructureId
                              where mw.WarehouseId == id

                              // select new { t, ad, vt }).ToList();
                              select new
                              {
                                  mw,
                                  ms,
                                  ms.Code,
                                  ms.Description,
                                  mw.ManagementWarehouseId,
                                  mw.ManagementStructureId,
                                  mw.MasterCompanyId,
                                  mw.WarehouseId

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
