

using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class IntegrationRepository : Repository<DAL.Models.IntegrationPortal>, IIntegration
    {
        public IntegrationRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.IntegrationPortal> getIntegrationData(int id)
        {
            return _appContext.IntegrationPortal.Where(c => (c.IsDeleted == false || c.IsDeleted == null)&&c.IsActive==true).OrderByDescending(c => c.IntegrationPortalId).ToList();

           
        }

        public IEnumerable<DAL.Models.IntegrationPortal> getIntegrationAllData()
        {          
            return _appContext.IntegrationPortal.Where(c => (c.IsDeleted == false || c.IsDeleted == null)).OrderByDescending(c => c.IntegrationPortalId).ToList();


        }
        public IEnumerable<IntegrationPortal> GetIntegrationLite()
        {
            return _appContext.IntegrationPortal.Where(v => v.IsActive == true && (v.IsDeleted == false|| v.IsDeleted ==null))
                .Select(v => new IntegrationPortal { IntegrationPortalId = v.IntegrationPortalId,
                Description = v.Description }).OrderBy(c => c.Description).ToList();
        }

        public IEnumerable<DAL.Models.IntegrationPortalAudit> GetIntegrationPortalAuditDetails(long integrationPortalId)
        {
            return _appContext.IntegrationPortalAudit.Where(c => c.IntegrationPortalId == integrationPortalId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
