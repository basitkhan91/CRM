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
            var temp5= temp4.OrderByDescending(c => c.AssetRecordId).ToList();
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
                //var data = _appContext.AssetCapes.Where(a => a.AssetRecordId == id).ToList();

                var data = (from ac in _appContext.AssetCapes join im 
                            in _appContext.ItemMaster on ac.ItemMasterId equals im.ItemMasterId
                            join cap in _appContext.Capability on ac.CapabilityId equals cap.CapabilityId
                            join captype in _appContext.capabilityType on cap.CapabilityTypeId equals captype.CapabilityTypeId 
                            join act in _appContext.AircraftType on ac.AircraftTypeId equals act.AircraftTypeId
                            join acm in _appContext.AircraftModel on ac.AircraftModelId equals acm.AircraftModelId
                            join dn in _appContext.AircraftDashNumber on ac.AircraftDashNumberId equals dn.DashNumberId
                            where ac.AssetRecordId == id && (ac.IsDelete == false || ac.IsDelete == null)

                            select new
                            {
                                ac.AssetCapesId,ac.ItemMasterId,im.PartNumber,im.PartDescription,captypedescription = captype.Description,
                                manufacturer = act.Description,modelname = acm.ModelName,dashnumber= dn.DashNumber, ac.IsActive, ac.AircraftTypeId

                            }).ToList();
                return data;
            }
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
   
}
