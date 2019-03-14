using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  public interface IManufacturerRepository : IRepository<DAL.Models.Manufacturer>
    {
        IEnumerable<DAL.Models.Manufacturer> GetAllManufacturerData();

    }
    
}
