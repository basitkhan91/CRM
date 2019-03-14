using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories



{
    public class WarningRepository : Repository<DAL.Models.Warning>, IWarning
    {
        public WarningRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Warning> GetAllData()
        {
            return _appContext.Warning.OrderByDescending(c => c.WarningId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}


