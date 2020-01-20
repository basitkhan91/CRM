using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace DAL.Repositories
{
    public class AssetAcquisitionTypeRepository : Repository<AssetAcquisitionType>, IAssetAcquisitionType
    {
        public AssetAcquisitionTypeRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<DAL.Models.AssetAcquisitionTypeAudit> GetAssetAcquisitionTypeAuditDetails(long AssetAcquisitionTypeId)
        {
            return _appContext.AssetAcquisitionTypeAudit.Where(c => c.AssetAcquisitionTypeId == AssetAcquisitionTypeId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
