using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetStatus : IRepository<AssetStatus>
    {
        IEnumerable<DAL.Models.AssetStatusAudit> GetAssetStatusAuditDetails(long assetStatusId);
    }
}
