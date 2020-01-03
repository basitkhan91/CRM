using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DAL.Repositories.Interfaces
{
  public interface IAssetIntangibleAttributeTypeRepository : IRepository<AssetIntangibleAttributeType>
    {
        IEnumerable<AssetIntangibleAttributeType> GetAllItems();
        IEnumerable<AssetIntangibleAttributeType> BulkUpload(IFormFile file);
    }
}
