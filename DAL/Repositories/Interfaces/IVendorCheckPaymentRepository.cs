using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
 
    public interface IVendorCheckPaymentRepository : IRepository<VendorCheckPayment>
    {
        IEnumerable<VendorCheckPayment> GetVendorCheckPayments();


        //  void CreateAction(DAL.Models.Action action);

    }
}
