using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
   public class EmployeeTrainingTypeRepository : Repository<EmployeeTrainingType>, IEmployeeTrainingTypeRepository
    {
        public EmployeeTrainingTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<EmployeeTrainingType> GetAllEmployeeTrainingType()
        {
            return _appContext.EmployeeTrainingType.OrderByDescending(c => c.EmployeeTrainingTypeId).ToList();
        }



        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

    

