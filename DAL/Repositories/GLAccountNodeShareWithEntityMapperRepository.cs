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
  
    public class GLAccountNodeShareWithEntityMapperRepository : Repository<DAL.Models.GLAccountNodeShareWithEntityMapper>,IGLAccountNodeShareWithEntityMapper
    {
        public GLAccountNodeShareWithEntityMapperRepository(ApplicationDbContext context) : base(context)
        { }

       


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
