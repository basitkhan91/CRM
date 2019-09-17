using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class AssetTypeRepository : Repository<DAL.Models.AssetType>, IAssetType
    {
        public AssetTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.AssetType> GetAllAsset()
        {
            //AssetTypeSingleScreen
            var data = _appContext.AssetType.Include("AssetAttributeType").Where(c => c.IsDelete == false || c.IsDelete == null).
                OrderByDescending(c => c.AssetTypeId).ToList();
            return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
