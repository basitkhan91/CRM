using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IStageCodeRepository : IRepository<StageCode>
    {
        IEnumerable<StageCode> getAllItems();

    }
}
