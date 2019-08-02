using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IATAChapter : IRepository<ATAChapter>
    {
        IEnumerable<ATAChapter> GetATAChapterData();
        IEnumerable<object> GetATASUBS(long ChID);

    }
}
