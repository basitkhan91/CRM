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
    public class ShippingRepository : Repository<VendorShipping>, IShipping
    {
        public ShippingRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorShipping> GetAllShipping()
        {
            return _appContext.VendorShipping.Include("MasterCompany").OrderByDescending(c => c.VendorShippingId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}