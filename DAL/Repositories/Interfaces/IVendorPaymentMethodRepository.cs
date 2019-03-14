using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IVendorPaymentMethodRepository : IRepository<VendorPaymentMethod>
    {
        IEnumerable<VendorPaymentMethod> GetVendorPayments();
    }
}
