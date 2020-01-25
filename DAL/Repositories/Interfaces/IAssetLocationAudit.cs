using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetLocationAudit : IRepository<AssetLocationAudit>
    {
        IEnumerable<DAL.Models.AssetLocationAudit> GetAssetLocationAuditDetails(long AssetLocationId);
    }
}
