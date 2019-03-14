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
    public class EmployeeLicensureRepository : Repository<DAL.Models.EmployeeLicensure>, IEmployeeLicensure
    {
        public EmployeeLicensureRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.EmployeeLicensure> GetAllEmployeeLicensureData()
        {
            return _appContext.EmployeeLicensure.Include("MasterCompany").OrderByDescending(c => c.EmployeeLicensureId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
