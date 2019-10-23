using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IStageCodeRepository : IRepository<StageCode>
    {
        IEnumerable<StageCode> getAllItems();
        IEnumerable<StageCode> BulkUpload(IFormFile file);
    }
}
