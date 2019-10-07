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
            //return _appContext.JobTitle.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.JobTitleId).ToList();
            return _appContext.JobTitle.Include("MasterCompany").Where(c =>  c.IsDelete == false ).OrderByDescending(c => c.JobTitleId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

