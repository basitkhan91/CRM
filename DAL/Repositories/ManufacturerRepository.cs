using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Repositories
{
   public class ManufacturerRepository : Repository<DAL.Models.Manufacturer>, IManufacturerRepository
    {
        public ManufacturerRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Models.Manufacturer> GetAllManufacturerData()
        {
            return _appContext.Manufacturer.Include("MasterCompany").Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.ManufacturerId).ToList();

        }
        override
       public IQueryable<DAL.Models.Manufacturer> GetPaginationData()
        {
            return _appContext.Manufacturer.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.ManufacturerId).ToList().AsQueryable();
        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

