using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    public class UserRoleRepository : Repository<DAL.Models.UserRole>, IUserRoleRepository
    {
        #region Private Members

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        #endregion Private Members

        #region Constructor

        public UserRoleRepository(ApplicationDbContext context) : base(context)
        { }

        #endregion Constructor

        #region Public Methods

        public IEnumerable<UserRole> GetAllUserRoles()
        {
            var data = _appContext.UserRole.Include("RolePermissions").Where(a => a.isDelete == false).OrderByDescending(a => a.Id).ToList();
            return data;
        }

        public UserRole GetUserRoles(long userRoleId)
        {
            var data = _appContext.UserRole.Include("RolePermissions").Where(a => a.Id == userRoleId && a.isDelete == false).FirstOrDefault();
            return data;
        }

        #endregion Public Methods

    }
}
