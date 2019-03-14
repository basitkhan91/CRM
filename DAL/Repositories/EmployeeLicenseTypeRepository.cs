using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
  public  class EmployeeLicenseTypeRepository: Repository<DAL.Models.EmployeeLicenseType>, IEmployeeLicenseType
    {

        public EmployeeLicenseTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<EmployeeLicenseType> GetEmployeeLicenseType()
        {
            var data = _appContext.EmployeeLicenseType.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.EmployeeLicenseTypeId).ToList();
            return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

