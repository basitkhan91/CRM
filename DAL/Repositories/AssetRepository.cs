using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   public  class AssetRepository : Repository<DAL.Models.Asset>, IAssetRepository
    {
        public AssetRepository(ApplicationDbContext context) : base(context)
        { }
        //public IEnumerable<DAL.Models.Asset>  getAllAssetList()
        //{
        //    return _appContext.Asset.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.AssetRecordId).ToList();
        //}

        IEnumerable<object> IAssetRepository.getAllAssetList()
        {
            return _appContext.Asset.Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.AssetRecordId).ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
   
}
