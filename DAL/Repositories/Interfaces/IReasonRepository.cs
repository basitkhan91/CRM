using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IReasonRepository : IRepository<Reason>
    {
        IEnumerable<Reason> GetAllReasonData();
        new IQueryable<Reason> GetPaginationData();
    }
}
