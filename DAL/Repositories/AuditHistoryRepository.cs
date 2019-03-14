
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class AuditHistoryRepository : Repository<AuditHistory>, IAuditHistoryRepository
    {
        public AuditHistoryRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<AuditHistory> GetAllHistory(string tableName, long recordId)
        {
            try
            {
                var result = _appContext.AuditHistory.Where(c=>c.TableName== tableName && c.TableRecordId==recordId).OrderByDescending(c => c.AuditHistoryId).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
