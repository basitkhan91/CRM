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
   public class AssetDepreciationIntervalRepository : Repository<AssetDepreciationInterval>, IAssetDepreciationInterval
    {
        public AssetDepreciationIntervalRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<DAL.Models.AssetDepreciationIntervalAudit> GetAssetDepIntervalAuditDetails(long assetDepreciationIntervalId)
        {
            return _appContext.AssetDepreciationIntervalAudit.Where(c => c.AssetDepreciationIntervalId == assetDepreciationIntervalId).OrderByDescending(p => p.UpdatedDate).ToList();

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
