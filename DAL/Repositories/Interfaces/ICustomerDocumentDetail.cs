using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerDocumentDetail : IRepository<DAL.Models.CustomerDocumentDetail>
    {
        IEnumerable<DAL.Models.CustomerDocumentDetail> GetAllData();
    }
}