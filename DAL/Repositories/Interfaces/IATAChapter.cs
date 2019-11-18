using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IATAChapter : IRepository<ATAChapter>
    {
        IEnumerable<ATAChapter> GetATAChapterData(); 
        IEnumerable<object> GetATASUBS(long ChID);
        IEnumerable<object> GetMultiATASUBS(string ChapterID);
        IEnumerable<ATAChapterAudit> GetATAChapterHistory(long ataChapterId);

    }
}
