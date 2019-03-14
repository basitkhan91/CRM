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
    public class VendorInternationalWirePaymentRepository : Repository<VendorInternationlWirePayment>, IVendorInternationalWirePaymentRepository
    {
        public VendorInternationalWirePaymentRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorInternationlWirePayment> GetVendorInternationalPayments()
        {
            return _appContext.VendorInternationlWirePayment.Include("MasterCompany").OrderByDescending(c => c.InternationalWirePaymentId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}