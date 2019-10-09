using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class AircraftModelRepository : Repository<DAL.Models.AircraftModel>, IAircraftModel
    {
        public AircraftModelRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetSelectedAircraftModeldata(long id)
        {

            var q =

             from x in _appContext.ItemMasterAircraftModel
             join ad in _appContext.AircraftModel on x.AircraftModelId equals ad.AircraftModelId
             join at in _appContext.AircraftType on ad.AircraftTypeId equals at.AircraftTypeId
             where x.ItemMasterId==id


               //                // select new { t, ad, vt }).ToList();
               select new
             {
                 x.AircraftModelId,
                 ad.ModelName,
                 ad.AircraftTypeId,
                 at.Description,
                 ad,
                 x,
                 x.DashNumber,

             };

           // var data1 = _appContext.ItemMasterAircraftModel.Include("AircraftModel").Where(a=>a.ItemMasterId==id).OrderByDescending(c => c.AircraftModelId).ToList();
            return q;
        }



        public IEnumerable<object> GetCapesWithMasterid(long id)
        {



            var q =

             from c in _appContext.Capability
             join imc in _appContext.ItemMasterCapes on c.CapabilityId equals imc.CapabilityId
             join am in _appContext.AircraftModel on c.AircraftModelId equals am.AircraftModelId
             join at in  _appContext.AircraftType  on c.AircraftTypeId equals at.AircraftTypeId
             join ata in _appContext.ATAChapter  on c.ATAChapterId equals ata.ATAChapterId
             where imc.ItemMasterId == id


             //                // select new { t, ad, vt }).ToList();
             select new
             {
                 atcChapterId1=ata.ATAChapterId,
                 at.Description,
                 am.ModelName,
                 modelname1 = c.Description,
                 ata.ATAChapterName,
                 entrydate1=c.EntryDate,
                 isCMMExist1=c.IsCMMExist,
                 verifiedBy1=c.VerifiedBy,
                 isVerified1= c.IsVerified,
                 dateVerified1=c.DateVerified,
                 memo1=c.Memo,
                 c.CapabilityTypeId,
                 c.CapabilityId,
                 at.AircraftTypeId,
                 am.AircraftModelId,
                 c.ManufacturerId

             };

            // var data1 = _appContext.ItemMasterAircraftModel.Include("AircraftModel").Where(a=>a.ItemMasterId==id).OrderByDescending(c => c.AircraftModelId).ToList();
            return q;
        }

        public IEnumerable<object> GetAllAircraftModelData(string id)
        {
			int[] myInts = id.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
			// int[] myInts1 = { 63, 62 };
			//var q =

			//  from x in _appContext.AircraftModel join ad in _appContext.AircraftType on x.AircraftTypeId equals ad.AircraftTypeId

			//  where myInts.Contains(x.AircraftTypeId)

			//  select new
			//  {
			//      t.AircraftModelId,
			//      t.ModelName,
			//      t.AircraftTypeId,
			//      ad.Description,
			//      ad,
			//      t
			//  }).ToList();
			var q =

			   from x in _appContext.AircraftModel
			   join ad in _appContext.AircraftType on x.AircraftTypeId equals ad.AircraftTypeId
			   where myInts.Contains(x.AircraftTypeId) && x.IsDeleted != true
			   select new
			   {
				   x.AircraftModelId,
				   x.AircraftTypeId,
				   x.ModelName,
				   x.Memo,
				   x.IsActive,
				   x.IsDeleted,
				   ad.Description

			   };

			return q.ToArray();

		}



        public IEnumerable<DAL.Models.AircraftModel> GetAllAircraftModel()
        {
            return _appContext.AircraftModel.Include("AircraftType").Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.AircraftModelId).ToList();

        }

        public IQueryable<DAL.Models.AircraftModel> GetPaginationData()
        {
            return _appContext.AircraftModel.Include("AircraftType").Where(c => (c.IsDeleted == false || c.IsDeleted == null))
                .OrderByDescending(c => c.AircraftModelId).ToList().AsQueryable();
        }

        public IEnumerable<AircraftModelAudit> GetAircraftModelHistory(long aircraftModelId)
        {
            try
            {
                return _appContext.AircraftModelAudit.Where(p => p.AircraftModelId == aircraftModelId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
