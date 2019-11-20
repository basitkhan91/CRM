using DAL.Models;
using DAL.Repositories.Interfaces;
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
    public class UserRoleLevelMgmStructRepository : Repository<UserRoleLevelMgmtStruct>, IUserRoleLevelMgmStructRepository
    {
        public UserRoleLevelMgmStructRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetAllUserRoleLevelMgmStructData(long id)
        {
            try
            {
                var result = (from ur in _appContext.UserRoleLevelMgmtStruct
                              join ms in _appContext.ManagementStructure on ur.ManagementStructureId equals ms.ManagementStructureId
                              where ur.UserRoleLevelId == id

                              select new
                              {
                                  ur,
                                  ms,
                                  ms.Code,
                                  ms.Description,
                                  ur.UserRoleManagementStructureId,
                                  ur.ManagementStructureId,
                                  ur.MasterCompanyId,
                                  ur.UserRoleLevelId

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
