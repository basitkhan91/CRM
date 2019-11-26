

using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    public class IntegrationRepository : Repository<DAL.Models.IntegrationPortal>, IIntegration
    {
        public IntegrationRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.IntegrationPortal> getIntegrationData(int id)
        {
            return _appContext.IntegrationPortal.Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.IntegrationPortalId).ToList();

           
        }
        public IEnumerable<IntegrationPortal> GetIntegrationLite()
        {
            return _appContext.IntegrationPortal.Where(v => v.IsActive == true && (v.IsDelete == false|| v.IsDelete==null))
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
