using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    class LegalEntityRepository :Repository<DAL.Models.LegalEntity>, ILegalEntity
    {
        public LegalEntityRepository(ApplicationDbContext context) : base(context)
    { }

        public IEnumerable<DAL.Models.LegalEntity> GetAllLegalEntityData()
        {
            return _appContext.LegalEntity.Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.LegalEntityId).ToList();

        }

    //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

    private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

}
