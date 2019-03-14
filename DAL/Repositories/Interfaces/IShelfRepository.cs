using DAL.Models;
using System.Collections.Generic;
using System;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IShelfRepository : IRepository<Shelf>
    {
        IEnumerable<object> GetAllShelfData();
        IEnumerable<object> GetAllAddressData(long id);
        IEnumerable<object> GetAllWarehouseData(long id);
        IEnumerable<object> GetAllLocationData(long id);
        IEnumerable<object>  GetManagementLocation(long id);
        IEnumerable<object>  GetAllShelfStockData(long id);
    }
}
