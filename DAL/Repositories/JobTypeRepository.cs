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
    public class JobTypeRepository : Repository<DAL.Models.JobType>, IJobType
    {

        public JobTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.JobType> GetAllJobTypes()
        {
            return _appContext.JobType.Where(c => c.IsDeleted == false).OrderByDescending(c => c.JobTypeId).ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }


    }