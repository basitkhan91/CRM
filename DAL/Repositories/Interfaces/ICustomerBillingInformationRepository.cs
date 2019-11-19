using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerBillingInformationRepository : IRepository<CustomerBillingAddress>
    {
        IEnumerable<CustomerBillingAddress> GetAllCustomerBillingAddress();
        IEnumerable<object> GetAllCusBillingDetails(long selectedrow);
        IEnumerable<object> GetAllCusBillingHistory(long selectedrow);
        IEnumerable<object> GetAllCustomerBillingAddressAudit(long customerId, long addressId);
    }
    
}
