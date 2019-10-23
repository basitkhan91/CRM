using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetIntangibleTypeRepository : IRepository<AssetIntangibleType>
    {
        IEnumerable<AssetIntangibleType> GetAllItems();
        IEnumerable<AssetIntangibleType> BulkUpload(IFormFile file);
        bool IsValid(AssetIntangibleType item);
        bool IsDuplicate(AssetIntangibleType item, IEnumerable<AssetIntangibleType> existingItems);

    }
}
