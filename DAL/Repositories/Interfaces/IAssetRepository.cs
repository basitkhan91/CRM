using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  public interface IAssetRepository : IRepository<DAL.Models.Asset>
    {
        IEnumerable<object> getAllAssetList();

    }
    
}
