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
    public class PercentageRepository : Repository<Percentage>,IPercentageRepository
    {
        private AppSettings AppSettings { get; set; }
        public PercentageRepository(DbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<Percentage> GetPercentages()
        {
            return _appContext.Percentage.Where(c => c.IsDeleted == false && c.IsActive == true).ToList();
        }

         private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
