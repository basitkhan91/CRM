using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class AssetIntangibleTypeRepository : Repository<DAL.Models.AssetIntangibleType>, IAssetIntangibleType
    {
        public AssetIntangibleTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.AssetIntangibleType> GetAllIntangibleType()
        {
            var data = _appContext.AssetIntangibleType.Include("AssetIntangibleTypeSingleScreen").Where(c => c.IsDelete == false || c.IsDelete == null).
               OrderByDescending(c => c.AssetIntangibleTypeId).ToList();
            return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
