
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterCompanyRepository : IRepository<MasterCompany>
    {
        IEnumerable<MasterCompany> GetAllMasterComapnyData();
    }
}
