using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ILegalEntityBillnformationRepository : IRepository<LegalEntityBillingAddress>
    {
        IEnumerable<LegalEntityBillingAddress> GetAllLegalEntityBillingAddress();
        IEnumerable<object> GetAllLegalEntityBillingDetails(long selectedrow);
        IEnumerable<object> GetAllLegalEntityBillingHistory(long selectedrow);
        IEnumerable<object> GetAllLegalEntityBillingAddressAudit(long LegalEntityId, long addressId);
    }
}
