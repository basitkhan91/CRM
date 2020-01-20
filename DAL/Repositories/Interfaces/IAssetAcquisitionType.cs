using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAssetAcquisitionType : IRepository<AssetAcquisitionType>
    {
        IEnumerable<DAL.Models.AssetAcquisitionTypeAudit> GetAssetAcquisitionTypeAuditDetails(long AssetAcquisitionTypeId);
    }
}
