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
      public class ActionRepository : Repository<DAL.Models.Action>, IActionRepository
    {
        public ActionRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Action> GetAllActionData()
        {
            
            var data =_appContext.Action.Include("MasterCompany").Where(a => a.IsDelete==false || a.IsDelete==null).OrderByDescending(a => a.ActionId).ToList();
            //var fnlData= { };
            //data.CopyTo(fnlData, 5);
            return data;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
