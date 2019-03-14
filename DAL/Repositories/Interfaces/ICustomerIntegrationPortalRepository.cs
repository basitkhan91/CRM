using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerIntegrationPortalRepository : IRepository<DAL.Models.CustomerIntegrationPortal>
    {
        IEnumerable<DAL.Models.CustomerIntegrationPortal> GetAllData();

    }
}
