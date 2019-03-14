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
    public class VendorDomesticPaymentRepository : Repository<DomesticWirePayment>, IVendorDomesticPaymentRepository
    {
        public VendorDomesticPaymentRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<DomesticWirePayment> GetVendorPayments()
        {
            try
            {
                return _appContext.DomesticWirePayment.Include("MasterCompany").OrderByDescending(c => c.DomesticWirePaymentId).ToList();

            }
            catch (Exception ex)
            {

                return null;
            }


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
