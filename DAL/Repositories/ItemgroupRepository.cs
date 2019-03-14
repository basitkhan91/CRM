using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class ItemgroupRepository : Repository<DAL.Models.Itemgroup>, IItemgroup
    {
        public ItemgroupRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Itemgroup> GetItemgroups()
        {
            return _appContext.Itemgroup.Include("MasterCompany").Where(c=> c.IsDelete== false || c.IsDelete == null) .OrderByDescending(c => c.ItemGroupId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
