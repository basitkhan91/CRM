using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    public class FinanceRepository : Repository<Vendor>, IFinance
    {
        public FinanceRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Vendor> GetAllFinanceData()
        {
            return _appContext.Vendor.Include("MasterCompany").OrderByDescending(c => c.VendorId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
