
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
    public class DivisionRepository : Repository<DAL.Models.Division>, IDivision
    {
        public DivisionRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Division> GetAllDivisionData()
        {
            return _appContext.Division.Include("MasterCompany").OrderByDescending(c => c.DivisionId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
