using DAL.Models;
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

        public IEnumerable<Asset> getAllAsset() {
            var asset = _appContext.Asset.Where(c => c.IsDelete == false || c.IsDelete == null);
            return asset.Include("AssetType").ToList();
        }

        public IEnumerable<object> getCapabilityData(long id)
        {
            {
                var data = (from capability in _appContext.Capability
                            where capability.AssetRecordId == id

                            select new
                            {
                               capability

                            }).ToList();
                return data;
            }
        }
        public IEnumerable<object> getCapesList(long id)
        {
            {
                var data = _appContext.Capability.Where(a => a.AssetRecordId == id).Include("Asset").Include("AircraftModel").Include("AircraftType").Include("CapabilityType").ToList();
                  
                return data;
            }
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
   
}
