using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
   public interface IGLAccountClassRespository : IRepository<GLAccountClass>
    {
        IEnumerable<DAL.Models.GLAccountClass> GetAllGLAccountClassData();
        IEnumerable<object> getShareWithEntityNodeById(long id);
        new IQueryable<GLAccountClass> GetPaginationData();
        IEnumerable<DAL.Models.GLAccountClassAudit> GetGLAccountClassAuditDetails(long gLAccountClassId);
    }
}
