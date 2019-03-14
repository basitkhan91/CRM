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
  public  class BusinessUnitRepository : Repository<DAL.Models.BusinessUnit>, IBusinessUnit
    {
        public BusinessUnitRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.BusinessUnit> GetAllBusinessUnitData()
        {
            return _appContext.BusinessUnit.Include("MasterCompany").OrderByDescending(c => c.BusinessUnitId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}