using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class GlCashFlowRepository : Repository<DAL.Models.GlClassFlowClassification>, IGlCashFlowRepository
    {
        public GlCashFlowRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.GlClassFlowClassification> GetAllGlCashFlowData()
        {
            return _appContext.GlClassFlowClassification.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.GlClassFlowClassificationId).ToList();
        }

        override
       public IQueryable<DAL.Models.GlClassFlowClassification> GetPaginationData()
        {
            return _appContext.GlClassFlowClassification.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.GlClassFlowClassificationId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
