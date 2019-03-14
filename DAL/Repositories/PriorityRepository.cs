﻿


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
    public class PriorityRepository : Repository<DAL.Models.Priority>, IPriority
    {
        public PriorityRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Priority> GetPriorities()
        {
            return _appContext.Priority.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.PriorityId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
