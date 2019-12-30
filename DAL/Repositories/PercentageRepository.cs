using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.Extensions.Options;
using DAL.Common;

namespace DAL.Repositories
{
    public class PercentageRepository : Repository<DAL.Models.Percentage>, IPercentageRepository
    {
        private AppSettings AppSettings { get; set; }
        public PercentageRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<Percentage> GetPercentages()
        {
            return _appContext.Percent.Where(c => c.IsDeleted == false ).ToList();
        }

        public IEnumerable<PercentageAudit> GetpercentageAuditDetails(long Id)
        {
            return _appContext.PercentAudit.Where(c => c.PercentId == Id).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
