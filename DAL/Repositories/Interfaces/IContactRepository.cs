using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IContactRepository : IRepository<Contact>
    {
        IEnumerable<object> GetContacts(long id);
        IEnumerable<object> GetCompleteContacts();

        IEnumerable<object> GetCustomerContacts(long id);
        IEnumerable<object> GetVendorContactsAudit(long vendorId, long vendorContactId);
        IEnumerable<object> GetContactsById(long id);

        //  void CreateAction(DAL.Models.Action action);

    }
}
