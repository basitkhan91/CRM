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
            return _appContext.Itemgroup.Include("MasterCompany").Where(c=> c.IsDelete== false) .OrderByDescending(c => c.ItemGroupId).ToList();
        }

        public IEnumerable<DAL.Models.ItemgroupAudit> GetItemGroupAuditDetails(long itemGroupId)
        {
            return _appContext.ItemGroupAudit.Where(c => c.ItemGroupId == itemGroupId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        override
        public IQueryable<DAL.Models.Itemgroup> GetPaginationData()
        {
            return _appContext.Itemgroup.Where(c => (c.IsDelete == false || c.IsDelete == null))
                .OrderByDescending(c => c.ItemGroupId).ToList().AsQueryable();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
