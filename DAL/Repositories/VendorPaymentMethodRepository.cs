using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    class VendorPaymentMethodRepository : Repository<VendorPaymentMethod>, IVendorPaymentMethodRepository
    {
        public VendorPaymentMethodRepository(ApplicationDbContext context) : base(context)
        { }



        public IEnumerable<VendorPaymentMethod> GetVendorPayments()
        {
            try
            {
                return _appContext.VendorPaymentMethod.Include("MasterCompany").OrderBy(c => c.VendorPaymentMethodId).ToList();

            }
            catch (Exception ex)
            {

                return null;
            }

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
