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
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

