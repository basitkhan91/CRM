using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{

    public interface IVendorInternationalWirePaymentRepository : IRepository<VendorInternationlWirePayment>
    {
        IEnumerable<VendorInternationlWirePayment> GetVendorInternationalPayments();


        //  void CreateAction(DAL.Models.Action action);

    }
}

