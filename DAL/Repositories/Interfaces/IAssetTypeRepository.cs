using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetTypeRepository : IRepository<AssetType>
    {
        IEnumerable<AssetType> GetAllItems();

    }
}
