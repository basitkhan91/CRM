using System.Collections.Generic;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRoleRepository : IRepository<DAL.Models.UserRole>
    {
        IEnumerable<UserRole> GetAllUserRoles();
        UserRole GetUserRoles(long userRoleId);
        IEnumerable<UserRole> GetUserRoleWithPermission(string userId);
    }
}