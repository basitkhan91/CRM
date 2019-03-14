using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IItemMasterAircraftManafacturerRepository : IRepository<DAL.Models.ItemMasterAircraftManufacturer>
    {
        IEnumerable<DAL.Models.ItemMasterAircraftManufacturer> GetAllData();
    }
}
