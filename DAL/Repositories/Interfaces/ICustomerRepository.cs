// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        // IEnumerable<Customer> GetTopActiveCustomers(int count);
        IEnumerable<object> GetAllCustomersData();

        IEnumerable<object> GetCustomerWithid(long customerId);


        //IEnumerable <object> GetCustomerBynameList(string name);
        IEnumerable<object> GetCustomerBynameList(string name);
        IEnumerable<object> getIntegrationData(long id);
        IEnumerable<object> Getdescriptionbypart(string name);

        IEnumerable<Customer> getAllCustomer();
        IEnumerable<Customer> getAllCustomersInfo();
        new IQueryable<Customer> GetPaginationData();
    }
}
