using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetAttributeTypeRepository : IRepository<AssetAttributeType>
    {
        IEnumerable<AssetAttributeType> GetAllItems();
        IEnumerable<AssetAttributeType> BulkUpload(IFormFile file);
        bool IsValid(AssetAttributeType item);
        bool IsDuplicate(AssetAttributeType item, IEnumerable<AssetAttributeType> existingItems);

    }
}
