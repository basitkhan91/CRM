using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public class CustomerIntegrationportalRepository : Repository<DAL.Models.CustomerIntegrationPortal>, ICustomerIntegrationPortalRepository
    {
        public CustomerIntegrationportalRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<DAL.Models.CustomerIntegrationPortal> GetAllData()
        {

            return _appContext.CustomerIntegrationPortal.OrderByDescending(c => c.CustomerIntegrationPortalId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
