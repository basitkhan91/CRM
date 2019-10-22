using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class AssetTypeRepository : Repository<AssetType>, IAssetTypeRepository
    {
        public AssetTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<AssetType> GetAllItems()
        {
            var data = _appContext.AssetType.Where(c => !c.IsDelete).OrderByDescending(c => c.AssetTypeId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
