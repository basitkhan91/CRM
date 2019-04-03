using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
   public interface IGLAccountClassRespository : IRepository<DAL.Models.GLAccountClass>
    {
        IEnumerable<DAL.Models.GLAccountClass> GetAllGLAccountClassData();
        IEnumerable<object> getShareWithEntityNodeById(long id);
    }
}
