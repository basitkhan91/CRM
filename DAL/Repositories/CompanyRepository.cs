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
    public class CompanyRepository : Repository<DAL.Models.Company>, ICompany
    {
        public CompanyRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Company> GetAllCompanyData()
        {
            return _appContext.Company.Include("MasterCompany").OrderByDescending(c => c.CompanyId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
