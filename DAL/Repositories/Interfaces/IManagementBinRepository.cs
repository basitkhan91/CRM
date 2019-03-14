using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IManagementBinRepository : IRepository<ManagementBin>
    {
        IEnumerable<object> GetAllManagementBinData(long id);
    }
}
