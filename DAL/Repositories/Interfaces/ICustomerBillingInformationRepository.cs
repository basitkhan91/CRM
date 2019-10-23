using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerBillingInformationRepository : IRepository<CustomerBillingAddress>
    {
        IEnumerable<CustomerBillingAddress> GetAllCustomerBillingAddress();
        IEnumerable<object> GetAllCusBillingDetails(long selectedrow);
        IEnumerable<object> GetAllCusBillingHistory(long selectedrow);
    }
    
}
