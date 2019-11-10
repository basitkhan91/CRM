using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterSalesLeadSourcesRepository
    {
        IEnumerable<DAL.Models.MasterSalesLeadSources> GetAll();
    }
}
