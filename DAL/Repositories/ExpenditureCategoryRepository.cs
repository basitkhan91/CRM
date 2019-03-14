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
    public class ExpenditureCategoryRepository : Repository<DAL.Models.ExpenditureCategory>, IExpenditureCategory
    {


        public ExpenditureCategoryRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.ExpenditureCategory> getAllExpenditureCategoryInfo()
        {
            return _appContext.ExpenditureCategory.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ExpenditureCategoryId).ToList();

        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
