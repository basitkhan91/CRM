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
    public class EmployeeTrainingRepository : Repository<DAL.Models.EmployeeTraining>, IEmployeeTraining
    {
        public EmployeeTrainingRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.EmployeeTraining> GetEmployeeTrainingData()
        {
            return _appContext.EmployeeTraining.Include("MasterCompany").Include("EmployeeTrainingType").OrderByDescending(c => c.EmployeeTrainingId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
