using DAL.Models;
using System;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerShippingAddress : IRepository<CustomerShippingAddress>
    {
        IEnumerable<CustomerShippingAddress> GetCustomerShippingAddress();
        IEnumerable<Object> GetAllShippingAddressDetails(long id);
        IEnumerable<object> GetAllShipViaDetails(long Selectedrow);
        IEnumerable<object> GetAllCusShippingHistory(long selectedrow);
        //  void CreateAction(DAL.Models.Action action);
        IEnumerable<object> GetCustomerShippingAddressAudit(long customerId,long customerShippingAddressId);

    }
}

   