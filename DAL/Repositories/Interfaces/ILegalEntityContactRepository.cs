using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ILegalEntityContactRepository:IRepository<LegalEntityContact>
    {
        IEnumerable<LegalEntityContact> GetLegalEntityContact();

        IEnumerable<object> GetLegalEntityContactAuditDetails(long entitycontactId, long entityId);
    }
}
