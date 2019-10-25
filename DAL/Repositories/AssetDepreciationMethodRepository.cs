﻿using DAL.Common;
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
    public class AssetDepreciationMethodRepository : Repository<AssetDepreciationMethod>, IAssetDepreciationMethod
    {
        public AssetDepreciationMethodRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<DAL.Models.AssetDepreciationMethodAudit> GetDepreciationMethodAuditDetails(long assetDepreciationMethodId)
        {
            return _appContext.AssetDepreciationMethodAudit.Where(c => c.AssetDepreciationMethodId == assetDepreciationMethodId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
