using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface ICustomerType : IRepository<DAL.Models.CustomerType>
    {
        IEnumerable<DAL.Models.CustomerType> GetCustomerTypes();


       

    }
}
