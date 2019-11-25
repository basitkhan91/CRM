using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IATASubChapter1Repository : IRepository<ATASubChapter>
    {
        IEnumerable<ATASubChapter> GetAllATAMainnData();
        IEnumerable<ATASubChapterAudit> GetATASubChapterAuditDetails(long aTASubChapterId);

    }
}
