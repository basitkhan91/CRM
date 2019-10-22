using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetIntangibleTypeRepository : IRepository<AssetIntangibleType>
    {
        IEnumerable<AssetIntangibleType> GetAllItems();

    }
}
