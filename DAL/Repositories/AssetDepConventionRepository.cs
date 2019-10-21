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
    public class AssetDepConventionRepository : Repository<AssetDepConvention>, IAssetDepConvention
    {
        public AssetDepConventionRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<DAL.Models.AssetDepConventionAudit> GetAssetDepConventionAuditDetails(long AssetDepConventionId)
        {
            return _appContext.AssetDepConventionAudit.Where(c => c.AssetDepConventionId == AssetDepConventionId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
