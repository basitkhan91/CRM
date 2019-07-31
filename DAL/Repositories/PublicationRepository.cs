
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
    public class PublicationRepository : Repository<DAL.Models.Publication>, IPublication
    {
        public PublicationRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Publication> GetPublications()
        {
            return _appContext.Publication.Include("MasterCompany").Where(c=>c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.PublicationId).ToList();
        }
        
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> GetDashNumber(string Mid,long Tid)
        {
            {
                int[] myMids = Mid.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
            
                var data = (from iM in _appContext.AircraftDashNumber
                            where myMids.ToString().Contains(Mid) && iM.AircraftTypeId == Tid
                            select new
                            {
                                iM.DashNumber

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> GetDashNoByID(string Mid, long Tid)
        {
            long[] myMids = Mid.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from iM in _appContext.AircraftDashNumber
                        where myMids.Contains(iM.AircraftModelId) && iM.AircraftTypeId == Tid
                        select new
                        {
                            iM.DashNumber

                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetATASUBS(long ChID)
        {
            //from c in _appContext.CheckPayment
            //join ad in _appContext.Address on c.AddressId equals ad.AddressId
            var data = (from iM in _appContext.ATASubChapter
                        join Mc in _appContext.ATAChapter on iM.ATAChapterId equals Mc.ATAChapterId
                        where iM.ATAChapterId==ChID
                        select new
                        {
                            iM.ATASubChapterId,iM.Description,Mc.ATAChapterName
                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetPublicationAircraftList()
        {
            {
                var data = (from t in _appContext.AircraftDashNumber
                            join at in _appContext.AircraftType on t.AircraftTypeId equals at.AircraftTypeId
                            join am in _appContext.AircraftModel on t.AircraftModelId equals am.AircraftModelId
                            select new
                            {
                                t.DashNumber,
                                t.Memo,
                                aircraft = at.Description,
                                model = am.ModelName,
                            }).ToList();
                return data;

            }

        }
    }
}
