using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   
  public class TimelifeRepository : Repository<Models.TimeLife>, ITimeLife
    {
        public TimelifeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.TimeLife> GetAllTimelifeData()
        {
            return _appContext.TimeLife.Include("MasterCompany").OrderByDescending(c => c.TimeLifeCyclesId).ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
