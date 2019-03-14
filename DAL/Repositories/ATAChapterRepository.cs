using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class ATAChapterRepository : Repository<DAL.Models.ATAChapter>, IATAChapter
    {
        public ATAChapterRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.ATAChapter> GetATAChapterData()
        {
            return _appContext.ATAChapter.OrderByDescending(c => c.ATAChapterId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
