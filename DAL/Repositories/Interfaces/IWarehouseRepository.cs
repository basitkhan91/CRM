using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IWarehouseRepository : IRepository<Warehouse>
    {
        IEnumerable<object> GetAllWarehouseData();
        IEnumerable<object> GetAllAddressData(long id);
        IEnumerable<object> GetManagementSite(long id);
        IEnumerable<object> GetAllWareHouseData(long id);

    }
}
