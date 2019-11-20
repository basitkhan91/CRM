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
    public class VendorInrernationalPaymentRepository : Repository<InternationalwirePayment>, IVendorInternationalPaymentRepository
    {
        public VendorInrernationalPaymentRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<InternationalwirePayment> GetVendorPayments()
        {
            try
            {
                return _appContext.InternationalWirePayment.Include("MasterCompany").OrderBy(c => c.InternationalWirePaymentId).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
