using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetDepConvention : IRepository<AssetDepConvention>
    {
        IEnumerable<DAL.Models.AssetDepConventionAudit> GetAssetDepConventionAuditDetails(long AssetDepConventionId);
    }
}
