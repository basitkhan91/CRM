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
            var data = _appContext.Asset.Where(c => c.IsDelete == false || c.IsDelete == null);
            var temp = data.Include("Manufacturer");
            var temp1 = temp.Include("GLAccount");
            var temp2 = temp1.Include("Currency");
            var temp3 = temp2.Include("UnitOfMeasure");
            var temp4 = temp3.Include("AssetType");
              var temp5=temp4.OrderByDescending(c => c.AssetRecordId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
   
}
