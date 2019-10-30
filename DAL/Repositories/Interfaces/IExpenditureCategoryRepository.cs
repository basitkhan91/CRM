using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IExpenditureCategoryRepository : IRepository<ExpenditureCategory>
    {
        IEnumerable<ExpenditureCategory> GetAllItems();
        IEnumerable<ExpenditureCategory> BulkUpload(IFormFile file);
        bool IsValid(ExpenditureCategory item);
        bool IsDuplicate(ExpenditureCategory item, IEnumerable<ExpenditureCategory> existingItems);

    }
}
