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
        //IEnumerable<object> IAssetRepository.getAllAssetList()
        //{
        //    return _appContext.Asset.Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.AssetRecordId).ToList();
        //}
        IEnumerable<object> IAssetRepository.getAllAssetList()
        {
            var data = _appContext.Asset.Include("Manufacturer").Include("GLAccount").Include("Currency").Include("UnitOfMeasure").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.AssetRecordId).ToList();
           

            return data;
        }
    private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
   
}
