using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IManagementWarehouseRepository : IRepository<ManagementWarehouse>
    {
        IEnumerable<object> GetAllManagementWarehouseData(long id);
    }
}
