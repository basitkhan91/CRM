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
    public class VendorCheckPaymentRepository : Repository<VendorCheckPayment>, IVendorCheckPaymentRepository
    {
        public VendorCheckPaymentRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorCheckPayment> GetVendorCheckPayments()
        {
            return _appContext.VendorCheckPayment.Include("MasterCompany").Where((c =>c.IsDeleted == false)).OrderByDescending(c => c.CheckPaymentId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
