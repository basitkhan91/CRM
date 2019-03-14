using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  public interface IGLAccountCategoriesRepository : IRepository<DAL.Models.GLAccountCategories>
    {
        IEnumerable<DAL.Models.GLAccountCategories> GetAllGLAccountCategoriesData();

    }
}