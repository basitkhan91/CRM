using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ILegalEntityShippingAddress : IRepository<LegalEntityShippingAddress>
    {
        IEnumerable<LegalEntityShippingAddress> GetLegalEntityShippingAddress();
        IEnumerable<Object> GetAllShippingAddressDetails(long id);
        IEnumerable<object> GetAllShipViaDetails(long Selectedrow);
        IEnumerable<Object> GetLegalEntityShippingAudit(long LegalEntityId, long LegalEntityShippingAddressId, long LegalEntityShippingId);
        IEnumerable<object> GetAllCusShippingHistory(long selectedrow);
        IEnumerable<object> GetLegalEntityShippingAddressAudit(long LegalEntityId, long LegalEntityShippingAddressId);
    }
}
