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
    public class AssetStatusRepository : Repository<AssetStatus>, IAssetStatus
    {
        public AssetStatusRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<DAL.Models.AssetStatusAudit> GetAssetStatusAuditDetails(long assetStatusId)
        {
            return _appContext.AssetStatusAudit.Where(c => c.AssetStatusId == assetStatusId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
