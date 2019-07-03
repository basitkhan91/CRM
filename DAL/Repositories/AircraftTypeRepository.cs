using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class AircraftTypeRepository : Repository<DAL.Models.AircraftType>, IAircraftType
    {
        public AircraftTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.AircraftType> getAircraftTypeData()
        {
            return _appContext.AircraftType.OrderBy(c => c.AircraftTypeId).ToList();


        }
        override
        public IQueryable<DAL.Models.AircraftType> GetPaginationData()
        {
            return _appContext.AircraftType.Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.AircraftTypeId).ToList().AsQueryable();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

