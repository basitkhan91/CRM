using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetDepreciationMethod : IRepository<AssetDepreciationMethod>
    {
        IEnumerable<DAL.Models.AssetDepreciationMethodAudit> GetDepreciationMethodAuditDetails(long assetDepreciationMethodId);
    }
}
