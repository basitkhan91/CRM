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
    public class JobTitleRepository : Repository<DAL.Models.JobTitle>, IJobTitle
    {
        public JobTitleRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.JobTitle> GetAllJobTitles()
        {
            return _appContext.JobTitle.Where(c => c.IsDeleted == false).OrderByDescending(c => c.JobTitleId).ToList();
          
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

