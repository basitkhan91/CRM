using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IVendorContactRepository : IRepository<VendorContact>
    {
        IEnumerable<VendorContact> GetVendorContacts();
        VendorContact GetVendorContactsbyContctId(long contctId);


        //  void CreateAction(DAL.Models.Action action);

    }
}
