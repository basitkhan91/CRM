using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    
    public interface ICustomerShipping : IRepository<CustomerShipping>
    {
        IEnumerable<CustomerShipping> GetAllCustomerShipping();


        //  void CreateAction(DAL.Models.Action action);

    }
}
