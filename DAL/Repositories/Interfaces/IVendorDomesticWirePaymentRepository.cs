using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IVendorDomesticWirePaymentRepository : IRepository<VendorDomesticWirePayment>
    {
        IEnumerable<VendorDomesticWirePayment> GetVendorDomesticPayments();


        //  void CreateAction(DAL.Models.Action action);

    }
}
