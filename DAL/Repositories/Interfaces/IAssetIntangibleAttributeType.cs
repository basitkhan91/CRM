using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  public interface IAssetIntangibleAttributeType : IRepository<AssetIntangibleAttributeType>
    {
        IEnumerable<AssetIntangibleAttributeType> GetAllItems();
    }
}
