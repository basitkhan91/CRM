using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetDisposalType : IRepository<AssetDisposalType>
    {
        IEnumerable<DAL.Models.AssetDisposalTypeAudit> GetDisposalTypeAuditDetails(long assetDisposalTypeId);
    }
}
