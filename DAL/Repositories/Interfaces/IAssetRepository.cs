using System.Collections.Generic;


namespace DAL.Repositories.Interfaces
{
  public interface IAssetRepository : IRepository<DAL.Models.Asset>
    {
        IEnumerable<object> getAllAssetList();
        IEnumerable<object> getCapabilityData(long id);
        IEnumerable<object> getCapesList(long id);
    }
    
}
