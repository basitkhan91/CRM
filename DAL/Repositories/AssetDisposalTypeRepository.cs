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
    public class AssetDisposalTypeRepository : Repository<AssetDisposalType>, IAssetDisposalType
    {
        public AssetDisposalTypeRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<DAL.Models.AssetDisposalTypeAudit> GetDisposalTypeAuditDetails(long assetDisposalTypeId)
        {
            return _appContext.AssetDisposalTypeAudit.Where(c => c.AssetDisposalTypeId == assetDisposalTypeId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
