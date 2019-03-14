using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
   
    public interface IAddress : IRepository<Address>
    {
        IEnumerable<Address> GetAddresses();

        IEnumerable<object> GetCheckAddress(long id);
        //  void CreateAction(DAL.Models.Action action);

    }
}
