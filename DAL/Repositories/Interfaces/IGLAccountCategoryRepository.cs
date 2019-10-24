using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IGLAccountCategoryRepository : IRepository<GLAccountCategory>
    {
        IEnumerable<GLAccountCategory> GetAllItems();
        IEnumerable<GLAccountCategory> BulkUpload(IFormFile file);
        bool IsValid(GLAccountCategory item);
        bool IsDuplicate(GLAccountCategory item, IEnumerable<GLAccountCategory> existingItems);

    }
}
