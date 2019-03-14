using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;

namespace DAL.Repositories
{
    class TaxTypeRepository : Repository<DAL.Models.TaxType>, ITaxTypeRepository
    {
        public TaxTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.TaxType> GetAllTaxTypeData()
        {
            return _appContext.TaxType.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.TaxTypeId).ToList();

        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}




