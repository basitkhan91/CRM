using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerDocumentDetail : IRepository<DAL.Models.CustomerDocumentDetail>
    {
        IEnumerable<DAL.Models.CustomerDocumentDetail> GetAllData();
        IEnumerable<object> GetAllDataById(long id);
        IEnumerable<object> GetAttachedDocumentById(long id);
        IEnumerable<object> GetAllAudotHistoryById(long Id,long customerId,int moduleId);
    }
}