using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetTypeRepository : IRepository<AssetType>
    {
        IEnumerable<AssetType> GetAllItems();
        IEnumerable<AssetType> BulkUpload(IFormFile file);
        //bool IsValid(AssetType item);
        //bool IsDuplicate(AssetType item, IEnumerable<AssetType> existingItems);

    }
}
