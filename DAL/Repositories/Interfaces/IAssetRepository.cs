using DAL.Models;
using System.Collections.Generic;


namespace DAL.Repositories.Interfaces
{
  public interface IAssetRepository : IRepository<DAL.Models.Asset>
    {
        IEnumerable<object> getAllAssetList();
        IEnumerable<object> getCapabilityData(long id);
        IEnumerable<object> getAssetCapabilityData(long id);
        IEnumerable<object> getCapesList(long id);
        IEnumerable<Asset> getAllAsset();
        IEnumerable<object> GetAsset(long id);
        IEnumerable<object> GetAssetWarrantyStatus();
        IEnumerable<object> GetAssetCapesAudit(long id);
    }
    
}
