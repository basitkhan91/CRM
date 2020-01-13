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
    public class ATASubChapter1Repository : Repository<ATASubChapter>, IATASubChapter1Repository
    {
        public ATASubChapter1Repository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<ATASubChapter> GetAllATAMainnData()
        {
            try
            {
                var result = _appContext.ATASubChapter.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.ATASubChapterId).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public Object GetATASubChapterAuditDetails(long aTASubChapterId)
        {
            return (from asc in _appContext.ATASubChapterAudit
                join ac in _appContext.ATAChapter on asc.ATAChapterId equals ac.ATAChapterId
                where asc.ATASubChapterId == aTASubChapterId 
                          select new
                {
                    asc.ATASubChapterId,
                    asc.ATASubChapterCode,
                    asc.Description,
                    asc.Memo,
                    asc.UpdatedDate,
                    asc.IsActive,
                    ac.ATAChapterId,
                    ac.ATAChapterName,
                    ac.ATAChapterCode,
                    ac.ATAChapterCategory,
                    asc.CreatedBy,
                    asc.CreatedDate,
                    asc.UpdatedBy
                }).OrderByDescending(p => p.UpdatedDate).ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
