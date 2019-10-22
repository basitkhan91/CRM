using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerWarning : IRepository<CustomerWarning>
    {
        IEnumerable<CustomerWarning> GetCustomerWarnings();
        IEnumerable<object> GetCustomerwarningWithid(long CustomerId);
        IEnumerable<object> GetCustomerwarning(long CustomerId);
    }
    
}
