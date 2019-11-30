using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IVendorDocumentDetailRepository : IRepository<DAL.Models.VendorDocumentDetails>
    {
        IEnumerable<DAL.Models.VendorDocumentDetails> GetAllData();
        IEnumerable<object> GetAllDataById(long id);
        IEnumerable<object> GetAttachedDocumentById(long id);
    }
}
