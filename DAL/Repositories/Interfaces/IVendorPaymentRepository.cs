using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IVendorPaymentRepository : IRepository<CheckPayment>
    {
        IEnumerable<CheckPayment> GetVendorPayments();
        IEnumerable<object> GetDomesticWithVendor(long vendorid);

        IEnumerable<object> GetInterWithVedor(long vendorid);

        IEnumerable<object> GetDefaultVendor(long vendorid);

        IEnumerable<VendorPaymentMethod> GetVendorDefaults();
        void Add(VendorPayment defaultPaymentObj);

        //  void CreateAction(DAL.Models.Action action);

    }

   
}
