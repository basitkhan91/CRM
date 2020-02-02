using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ILegalEntityShipping : IRepository<LegalEntityShipping>
    {
        IEnumerable<LegalEntityShipping> GetAllLegalEntityShipping();
    }
}
