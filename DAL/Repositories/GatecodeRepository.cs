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
    public class GatecodeRepository : Repository<DAL.Models.GatecodeClass>, IGatecodeRepository
    {
        public GatecodeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.GatecodeClass> getAllGatecodeInfo()
        {
            return _appContext.Gatecode.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.GateCodeId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
