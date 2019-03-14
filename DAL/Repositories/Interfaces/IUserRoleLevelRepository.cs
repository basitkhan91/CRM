using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;


namespace DAL.Repositories.Interfaces
{
    public interface IUserRoleLevelRepository : IRepository<UserRoleLevel>
    {
        IEnumerable<DAL.Models.UserRoleLevel> GetAllUserRoleLevelData();
        //IEnumerable<object> GetAllUserRoleLevelData();
    }
}
