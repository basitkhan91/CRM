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
    public class EmployeeExpertiseRepository : Repository<DAL.Models.EmployeeExpertise>, IEmployeeExpertiseRepository
    {
        public EmployeeExpertiseRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.EmployeeExpertise> getAllEmployeeExpertiseInfo()
        {
            //return _appContext.EmployeeExpertise.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.EmployeeExpertiseId).ToList();
            return _appContext.EmployeeExpertise.Include("MasterCompany").Where(c => c.IsActive == true && c.IsDelete != null).OrderByDescending(c => c.EmployeeExpertiseId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
