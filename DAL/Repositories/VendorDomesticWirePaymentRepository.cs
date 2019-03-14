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
    public class VendorDomesticWirePaymentRepository : Repository<VendorDomesticWirePayment>, IVendorDomesticWirePaymentRepository
    {
        public VendorDomesticWirePaymentRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<VendorDomesticWirePayment> GetVendorDomesticPayments()
        {
            return _appContext.VendorDomesticWirePayment.Include("MasterCompany").OrderByDescending(c => c.VendorDomesticWirePaymentId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}