using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   public interface IVendorInternationalPaymentRepository :   IRepository<InternationalwirePayment>
    {

        IEnumerable<InternationalwirePayment> GetVendorPayments();
    }
}
