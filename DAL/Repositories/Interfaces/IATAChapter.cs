using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IATAChapter : IRepository<ATAChapter>
    {
        IEnumerable<ATAChapter> GetATAChapterData(); 
        IEnumerable<object> GetATASUBS(long ChID);
        IEnumerable<object> GetMultiATASUBS(string ChapterID);
        IEnumerable<ATAChapterAudit> GetATAChapterHistory(long ataChapterId);

        IEnumerable<DAL.Models.ATAChapter> UploadCustomData(IFormFile file);

    }
}
