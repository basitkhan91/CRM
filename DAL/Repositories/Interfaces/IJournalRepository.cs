using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IJournalRepository: IRepository<JournalManual>
    {
        IEnumerable<JournalManual> GetManualJournalList();
    }
}
