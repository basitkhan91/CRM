using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DAL.Repositories
{
    public class UserRoleLevelRepository : Repository<DAL.Models.UserRoleLevel>, IUserRoleLevelRepository
    {
        public UserRoleLevelRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<Models.UserRoleLevel> GetAllUserRoleLevelData()
        {
            return _appContext.UserRoleLevel.OrderByDescending(a => a.UserRoleLevelId).ToList();

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
