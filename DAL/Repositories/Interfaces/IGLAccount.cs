using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IGLAccount : IRepository<GLAccount>
    {
        IEnumerable<GLAccount> GetAllglacoounts(long? id);
       new IQueryable<GLAccount> GetPaginationData();
    }
}