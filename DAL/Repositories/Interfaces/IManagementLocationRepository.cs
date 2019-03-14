using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IManagementLocationRepository : IRepository<ManagementLocation>
    {
        IEnumerable<object> GetAllManagementLocationData(long id);
    }
}
