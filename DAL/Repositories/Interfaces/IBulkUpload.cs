using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IBulkUpload<T>
    {
        IEnumerable<T> BulkUpload(IFormFile file);

    }

}
