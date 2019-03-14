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
    //class ActionAttributeRepository
    //{
    //}


    public class ActionAttributeRepository : Repository<Models.ActionAttribute>, IActionAttributeRepository
    {
        public ActionAttributeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.ActionAttribute> GetActionAttributes()
        {
            //return _appContext.ActionAttribute.Include("MasterCompany").OrderByDescending(c => c.ActionAttributeId).ToList();
            return _appContext.ActionAttribute.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ActionAttributeId).ToList();
            //var data = _appContext.ActionAttribute.Where(a => a.IsDelete == false).OrderByDescending(a => a.ActionAttributeId).ToList();
            //return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
