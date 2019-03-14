using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IAuditHistoryRepository : IRepository<AuditHistory>
    {
        IEnumerable<AuditHistory> GetAllHistory(string tableName,long recordId);
    }
}
