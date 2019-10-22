using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class StageCodeRepository : Repository<StageCode>, IStageCodeRepository
    {
        public StageCodeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<StageCode> getAllItems()
        {
            var data = _appContext.StageCode.Where(c => !(c.IsDelete ?? false)).OrderByDescending(c => c.StageCodeId).ToList();
            return data;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
