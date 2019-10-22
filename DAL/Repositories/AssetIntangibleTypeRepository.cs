
using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class AssetIntangibleTypeRepository : Repository<AssetIntangibleType>, IAssetIntangibleTypeRepository
    {
        public AssetIntangibleTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<AssetIntangibleType> GetAllItems()
        {
            var data = _appContext.AssetIntangibleType.Where(c => !(bool)c.IsDelete).OrderByDescending(c => c.AssetIntangibleTypeId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
