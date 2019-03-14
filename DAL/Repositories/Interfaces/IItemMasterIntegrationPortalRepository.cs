using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IItemMasterIntegrationPortalRepository : IRepository<DAL.Models.ItemMasterIntegrationPortal>
    {
        IEnumerable<DAL.Models.ItemMasterIntegrationPortal> GetAllData();
    
    }
}
