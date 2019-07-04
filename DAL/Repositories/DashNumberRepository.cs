using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class DashNumberRepository : Repository<AircraftDashNumber>, IDashNumberRepository
    {
        public DashNumberRepository(ApplicationDbContext context) : base(context)

        { }
        public IEnumerable<DAL.Models.AircraftDashNumber> GetDashNumbers()
        {
            return _appContext.AircraftDashNumber.Include("AircraftType").Include("AircraftModel").Where(c => (c.IsDeleted == false || c.IsDeleted == null)).OrderByDescending(c => c.AircraftModelId).ToList();
            

        }

        override
       public IQueryable<DAL.Models.AircraftDashNumber> GetPaginationData()
        {
            return _appContext.AircraftDashNumber.Include("AircraftType").Include("AircraftModel").Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.DashNumberId).ToList().AsQueryable();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
