using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class DashNumberRepository : Repository<AircraftDashNumber>, IDashNumberRepository
    {
        public DashNumberRepository(ApplicationDbContext context) : base(context)

        { }
        public IEnumerable<DAL.Models.AircraftDashNumber> GetDashNumbers()
        {
            return _appContext.AircraftDashNumber.Include("AircraftType").Include("AircraftModel").Where(c => (c.IsDeleted == false || c.IsDeleted == null)).OrderByDescending(c => c.AircraftModelId).ToList();
            

        }

        override
       public IQueryable<DAL.Models.AircraftDashNumber> GetPaginationData()
        {
            return _appContext.AircraftDashNumber.Include("AircraftType").Include("AircraftModel").Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.DashNumberId).ToList().AsQueryable();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> getDashListByIDS(string Mid, long Tid, string Did)
        {
            long[] myMids = Mid.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
			long[] myDids = Did.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            var data = (from iM in _appContext.AircraftDashNumber
                        join at in _appContext.AircraftType on iM.AircraftTypeId equals at.AircraftTypeId
                        join am in _appContext.AircraftModel on iM.AircraftModelId equals am.AircraftModelId
                        where myMids.Contains(iM.AircraftModelId) && iM.AircraftTypeId == Tid && myDids.Contains(iM.DashNumberId)
                        select new
                        {
                            aircraft = at.Description,
                            model = am.ModelName,
                            typeid=at.AircraftTypeId,
                            modelid=am.AircraftModelId,
                            iM.DashNumber,
                            iM.DashNumberId,
                            iM.Memo

                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetDashNoByID(string Mid, string Tid)
        {
            long[] myMids = Mid.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            long[] myTids = Tid.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from iM in _appContext.AircraftDashNumber
                        join at in _appContext.AircraftType on iM.AircraftTypeId equals at.AircraftTypeId
                        join am in _appContext.AircraftModel on iM.AircraftModelId equals am.AircraftModelId
                        where myMids.Contains(iM.AircraftModelId) && myTids.Contains(iM.AircraftTypeId)
                        select new
                        {
                            iM.DashNumber,
                            iM.DashNumberId,
                            at.AircraftTypeId,
                            at.Description,
                            am.AircraftModelId,
                            am.ModelName,
                            iM.Memo,
                            iM.MasterCompanyId
                            

                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> getDashListBy_MUTLIIDs(string Mid, string Tid, string Did)
        {
            long[] myMids = Mid.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            string[] myDids = Did.Split(',').Select(x => x).ToArray();
            long[] myTids = Tid.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var data = (from iM in _appContext.AircraftDashNumber
                        join at in _appContext.AircraftType on iM.AircraftTypeId equals at.AircraftTypeId
                        join am in _appContext.AircraftModel on iM.AircraftModelId equals am.AircraftModelId
                        where myMids.Contains(iM.AircraftModelId) && myTids.Contains(iM.AircraftTypeId) && myDids.Contains(iM.DashNumber)
                        select new
                        {
                            aircraft = at.Description,
                            model = am.ModelName,
                            typeid = at.AircraftTypeId,
                            modelid = am.AircraftModelId,
                            iM.DashNumber,
                            iM.DashNumberId,
                            iM.Memo

                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
    }
}
