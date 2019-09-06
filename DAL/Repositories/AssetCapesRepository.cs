using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
   public class AssetCapesRepository : Repository<AssetCapes>, IAssetCapes
    {
        public AssetCapesRepository(ApplicationDbContext context)
            :base(context)
        {

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
