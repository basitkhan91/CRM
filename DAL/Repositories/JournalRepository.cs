using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;

namespace DAL.Repositories
{
    public class JournalRepository : Repository<JournalManual>, IJournalRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public JournalRepository(ApplicationDbContext context) : base(context)
        {

        }
        //public IEnumerable<object> GetEmployeeDataForJournal()
        //{
        //    var result = (from emp in _appContext.Employee
        //                  select new
        //                  {

        //                  });

        //    return result;
        //}
        public IEnumerable<JournalManual> GetManualJournalList()
        {
            throw new System.NotImplementedException();
        }
    }
}
