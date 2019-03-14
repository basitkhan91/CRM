using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   public  class EmployeeLeaveTypeMappingRepository : Repository<DAL.Models.EmployeeLeaveTypeMapping>, IEmployeeLeaveTypeMappingRepository
    {
        public EmployeeLeaveTypeMappingRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<DAL.Models.EmployeeLeaveTypeMapping> GetAllData()
        {

            return _appContext.EmployeeLeaveTypeMapping.OrderByDescending(c => c.EmployeeLeaveTypeMappingId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
