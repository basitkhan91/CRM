using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public class EmployeeShiftMappingRepository : Repository<DAL.Models.EmployeeShiftMapping>, IEmployeeShiftRepository
    {
        public EmployeeShiftMappingRepository(ApplicationDbContext context) : base(context) { }

        public IEnumerable<DAL.Models.EmployeeShiftMapping> GetAllData()
        {

            return _appContext.EmployeeShiftMapping.OrderByDescending(c => c.EmployeeShiftMappingId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}

