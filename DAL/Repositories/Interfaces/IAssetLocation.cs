using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetLocation : IRepository<AssetLocation>
    {
        IEnumerable<DAL.Models.AssetLocationAudit> GetAssetLocationAuditDetails(long AssetLocationId);
    }
}
