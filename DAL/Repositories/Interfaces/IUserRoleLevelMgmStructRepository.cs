using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;


namespace DAL.Repositories.Interfaces
{
    public interface IUserRoleLevelMgmStructRepository : IRepository<UserRoleLevelMgmtStruct>
    {
        IEnumerable<object> GetAllUserRoleLevelMgmStructData(long id);
    }
}
