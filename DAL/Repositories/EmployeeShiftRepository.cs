using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class EmployeeShiftRepository : Repository<DAL.Models.EmployeeShift>, IEmployeeShift
    {
        public EmployeeShiftRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.EmployeeShift> GetAllEmployeeShiftData(int id)
        {
            return _appContext.EmployeeShift.Include("MasterCompany").OrderByDescending(c => c.EmployeeShiftId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
