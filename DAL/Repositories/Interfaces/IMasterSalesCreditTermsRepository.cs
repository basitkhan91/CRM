using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterSalesCreditTermsRepository
    {
        IEnumerable<DAL.Models.MasterSalesCreditTerms> GetAll();
    }
}
