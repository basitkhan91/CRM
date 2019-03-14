using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class LaborAndOverheadCostRepository : Repository<DAL.Models.LaborOverloadCost>, ILaborAndOverheadCostRepository
    {
        public LaborAndOverheadCostRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.LaborOverloadCost> GetAllGLLaborAndOverheadCostData()
        {
           return _appContext.LaborOverloadCost.Include("MasterCompany").Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.LaborOverloadCostId).ToList();
            
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}