using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IVendorShippingAddress : IRepository<VendorShippingAddress>
    {
        IEnumerable<VendorShippingAddress> GetVendorShippingAddresses();
        IEnumerable<Object> GetAllShippingAddressDetails(long id);
        IEnumerable<object> GetAllShipViaDetails(long Selectedrow);
        //  void CreateAction(DAL.Models.Action action);

    }
}
