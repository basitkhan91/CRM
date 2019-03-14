using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IManagementShelfRepository : IRepository<ManagementShelf>
    {
        IEnumerable<object> GetAllManagementShelfData(long id);
    }
}
