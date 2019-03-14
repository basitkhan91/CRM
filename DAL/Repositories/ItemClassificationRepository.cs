using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class ItemClassificationRepository : Repository<DAL.Models.ItemClassfication>, IItemClassification
    {
        public ItemClassificationRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.ItemClassfication> getItemClassification()
        {
            return _appContext.ItemClassification.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ItemClassificationId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
