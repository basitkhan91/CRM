using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IStageCodeRepository : IRepository<StageCode>
    {
        IEnumerable<StageCode> GetAllItems();
        IEnumerable<StageCode> BulkUpload(IFormFile file);
        bool IsValid(StageCode item);
        bool IsDuplicate(StageCode item, IEnumerable<StageCode> existingItems);

    }
}
