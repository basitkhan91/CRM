using DAL.Models;
using System.Collections.Generic;


namespace DAL.Repositories.Interfaces
{
    public interface IAssetAuditRepository : IRepository<DAL.Models.AssetAudit>
    {
        IEnumerable<AssetAudit> getAllAssetAudit();
    }
}
