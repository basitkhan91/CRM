using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IBinRepository : IRepository<Bin>
    {
        IEnumerable<object> GetAllBinData();
        IEnumerable<object> GetAllShelfData(long id);
        IEnumerable<object> GetAllAddressData(long id);
        IEnumerable<object> GetAllWarehouseData(long id);
        IEnumerable<object> GetAllLocationData(long id);
        IEnumerable<object> GetAllBinDataById(long id);
        IEnumerable<object>  GetManagementShelf(long id);
    }
}
