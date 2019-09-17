using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
   public class AssetIntangibleAttributeTypeRepository : Repository<AssetIntangibleAttributeType>, IAssetIntangibleAttributeType
    {
        public AssetIntangibleAttributeTypeRepository(ApplicationDbContext context)
            :base(context)
        {

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
