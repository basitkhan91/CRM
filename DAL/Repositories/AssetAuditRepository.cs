using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Repositories
{
    public class AssetAuditRepository : Repository<DAL.Models.AssetAudit>, IAssetAuditRepository
    {
        public AssetAuditRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<AssetAudit> getAllAssetAudit()
        {
            var asset = _appContext.AssetAudit.Where(c => c.IsDelete == false || c.IsDelete == null);
            return asset.Include("AssetType").ToList();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;


    }
}
