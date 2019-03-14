using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    class ItemMasterIntegrationPortalRepository : Repository<DAL.Models.ItemMasterIntegrationPortal>, IItemMasterIntegrationPortalRepository
    {
        public ItemMasterIntegrationPortalRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<DAL.Models.ItemMasterIntegrationPortal> GetAllData()
        {

            return _appContext.ItemMasterIntegrationPortal.OrderByDescending(c => c.ItemMasterIntegrationPortalId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
   
}
