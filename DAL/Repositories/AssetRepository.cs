using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
   public  class AssetRepository : Repository<DAL.Models.Asset>, IAssetRepository
    {
        public AssetRepository(ApplicationDbContext context) : base(context)
        { }
       
        IEnumerable<object> IAssetRepository.getAllAssetList()
        {
            var data = _appContext.Asset.Include("Manufacturer").Include("GLAccount").Include("Currency").
                Include("UnitOfMeasure").Include("AssetType").Where(c => c.IsDelete == false || c.IsDelete == null).
                OrderByDescending(c => c.AssetRecordId).ToList();
            return data;
        }

    private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
   
}
