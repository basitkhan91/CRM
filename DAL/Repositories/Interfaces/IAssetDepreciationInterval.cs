using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   public interface IAssetDepreciationInterval : IRepository<AssetDepreciationInterval>
    {
        IEnumerable<DAL.Models.AssetDepreciationIntervalAudit> GetAssetDepIntervalAuditDetails(long assetDepreciationIntervalId);
    }
}
