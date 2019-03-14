
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class ItemMasterAircraftManafacturerRepository : Repository<DAL.Models.ItemMasterAircraftManufacturer>,IItemMasterAircraftManafacturerRepository
    { 
        public ItemMasterAircraftManafacturerRepository(ApplicationDbContext context) : base(context) { }

    public IEnumerable<DAL.Models.ItemMasterAircraftManufacturer> GetAllData()
    {

            return _appContext.ItemMasterAircraftManufacturer.OrderByDescending(c => c.ItemMasterAircraftManufacturerId).ToList();
        }


    //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

    private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
}
}
