using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IShipping : IRepository<VendorShipping>
    {
        IEnumerable<VendorShipping> GetAllShipping();
        

        //  void CreateAction(DAL.Models.Action action);

    }
}
