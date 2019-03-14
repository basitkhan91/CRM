using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    public class EmployeeLeaveTypeRepository : Repository<EmployeeLeaveType>, IEmployeeLeaveType
    {
        public EmployeeLeaveTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<EmployeeLeaveType> GetAllEmployeeLeaveTypeData()
        {
            return _appContext.EmployeeLeaveType.OrderByDescending(c => c.EmployeeLeaveTypeId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
