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
        public IEnumerable<object> GetATASUBS(long ChID)
        {
            //from c in _appContext.CheckPayment
            //join ad in _appContext.Address on c.AddressId equals ad.AddressId
            var data = (from iM in _appContext.ATASubChapter
                        join Mc in _appContext.ATAChapter on iM.ATAChapterId equals Mc.ATAChapterId
                        where iM.ATAChapterId == ChID
                        select new
                        {
                            iM.ATASubChapterId,
                            iM.ATASubChapterCode,
                            iM.Description,
                            iM.Memo,
                            iM.ATAChapterId,
                            iM.MasterCompanyId,
                            Mc.ATAChapterName,
                            Mc.ATAChapterCategory,
                            Mc.ATAChapterCode
                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetMultiATASUBS(string ChapterID)
        {
            var myATAIds = ChapterID.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from iM in _appContext.ATASubChapter
                        join Mc in _appContext.ATAChapter on iM.ATAChapterId equals Mc.ATAChapterId
                        where myATAIds.Contains(iM.ATAChapterId)
                        select new
                        {
                            iM.ATASubChapterId,
                            iM.ATASubChapterCode,
                            iM.Description,
                            iM.Memo,
                            iM.ATAChapterId,
                            iM.MasterCompanyId,
                            Mc.ATAChapterName,
                            Mc.ATAChapterCategory,
                            Mc.ATAChapterCode
                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
    }
}
