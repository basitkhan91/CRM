
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class ProvisionRepository : Repository<Provision>, IProvisionRepository
    {
        public ProvisionRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Provision> GetAllProvisionData()
        {
            try
            {
                var result = _appContext.Provision.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ProvisionId).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }


        public IEnumerable<ProvisionAudit> GetProvisionHistory(long provisionId)
        {
            try
            {
                return _appContext.ProvisionAudit.Where(p => p.ProvisionId == provisionId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
