
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
            return _appContext.Publication.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderByDescending(c => c.PublicationId).ToList();
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> GetDashNumber(string Mid, long Tid)
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

        public IEnumerable<object> GetPubPNMappingData(string PNIds)
        {
            var myPNids = PNIds.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from iM in _appContext.PublicationItemMasterMapping
                        where myPNids.Contains(iM.ItemMasterId)
                        select new
                        {

                            iM.ItemMasterId,
                            iM.PublicationId,
                            iM.PartNumber,
                            iM.PartNumberDescription,
                            iM.ItemClassification,
                            iM.ItemClassificationId,
                            iM.ItemGroupId,
                            iM.MasterCompanyId


                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetAircraftMappingDataById(long PublicationID)
        {
            var data = (from PublicationItemMaster in _appContext.PublicationItemMasterMapping
                        join it in _appContext.ItemMasterAircraftMapping on PublicationItemMaster.ItemMasterId equals it.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId
                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetATAMappingDataById(long PublicationID)
        {
            var data = (from PublicationItemMaster in _appContext.PublicationItemMasterMapping
                        join it in _appContext.ItemMasterATAMapping on PublicationItemMaster.ItemMasterId equals it.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true
                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.ATAChapterId,
                            it.ATAChapterCode,
                            it.ATAChapterName,
                            it.ATASubChapterId,
                            it.ATASubChapterDescription,
                            it.MasterCompanyId
                        }).ToList();
            return data;
        }
        public IEnumerable<object> GetAircraftMappingDataByMultiTypeId(long PublicationID, string AircraftTypeId)
        {
            var myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }
        public IEnumerable<object> GetAircraftMappingDataByMultiModelId(long PublicationID, string AircraftModelId)
        {
            var myAircraftModelId = AircraftModelId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }
        public IEnumerable<object> GetAircraftMappingDataByMultiDashId(long PublicationID, string DashNumberId)
        {
            var myDashNumberId = DashNumberId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }
        public IEnumerable<object> GetAircraftMappingDataByMultiTypeIdModelID(long PublicationID, string AircraftTypeId, string AircraftModelId)
        {
            var myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }
        public IEnumerable<object> GetAircraftMappingDataByMultiTypeIdModelIDDashID(long PublicationID, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            var myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }

        public IEnumerable<object> GetATAMappingDataByMultiATAIdSUBATAID(long PublicationID, string ATAChapterId, string ATASubChapterID)
        {
            var myATAChapterId = ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var data = (from it in _appContext.ItemMasterATAMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myATAChapterId.Contains(it.ATAChapterId) && myATASubChapterID.Contains(it.ATASubChapterId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.ATAChapterId,
                            it.ATAChapterCode,
                            it.ATAChapterName,
                            it.ATASubChapterId,
                            it.ATASubChapterDescription,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }

        public IEnumerable<object> GetATAMappingDataByMultiATAId(long PublicationID, string ATAChapterId)
        {
            var myATAChapterId = ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from it in _appContext.ItemMasterATAMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myATAChapterId.Contains(it.ATAChapterId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.ATAChapterId,
                            it.ATAChapterCode,
                            it.ATAChapterName,
                            it.ATASubChapterId,
                            it.ATASubChapterDescription,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }
        public IEnumerable<object> GetATAMappingDataByMultiSubChapterId(long PublicationID, string ATASubChapterID)
        {
            var myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var data = (from it in _appContext.ItemMasterATAMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myATASubChapterID.Contains(it.ATASubChapterId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            PublicationItemMaster.PublicationId,
                            it.PartNumber,
                            it.ATAChapterId,
                            it.ATAChapterCode,
                            it.ATAChapterName,
                            it.ATASubChapterId,
                            it.ATASubChapterDescription,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }

        public IEnumerable<object> orGetAircraftMappingDataByMultiTypeIdModelIDDashID(long PublicationID, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            long[] myAircraftTypeId=null;
            long[] myAircraftModelId = null;
            long[] myDashNumberId = null;
            if (AircraftTypeId!=null)
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null)
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null)
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            if (AircraftTypeId !=null && AircraftModelId != null && DashNumberId != null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId)  && it.IsDeleted != true
                            select new{PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId !=null && AircraftModelId != null && DashNumberId == null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && it.IsDeleted != true
                            select new{PublicationItemMaster.ItemMasterId,    PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId,it.DashNumberId,it.DashNumber, it.AircraftType,it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                            return data;
            }
            if (AircraftTypeId !=null && AircraftModelId == null && DashNumberId == null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && it.IsDeleted != true
                            select new{PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType, it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive, it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId !=null && AircraftModelId == null && DashNumberId != null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new{ PublicationItemMaster.ItemMasterId,PublicationItemMaster.PublicationId, it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel, it.Memo,it.MasterCompanyId,it.IsActive, it.IsDeleted }).ToList();
                            return data;
            }
            if (AircraftTypeId ==null && AircraftModelId != null && DashNumberId != null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId)  && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new{ PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber, it.AircraftType, it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive, it.IsDeleted }).ToList();
                            return data;
            }
            if (AircraftTypeId ==null && AircraftModelId == null && DashNumberId != null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new{PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType, it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            else
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true
                            select new{PublicationItemMaster.ItemMasterId,PublicationItemMaster.PublicationId,it.PartNumber, it.AircraftTypeId,it.AircraftModelId,it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo,it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                            return data;
            }
        }

        public IEnumerable<object> orGetATAMappingDataByMultiATAIdSUBATAID(long PublicationID, string ATAChapterId, string ATASubChapterID)
        {
            long[] myATAChapterId = null;
            long[] myATASubChapterID = null;
            if (ATAChapterId != null)
                myATAChapterId =ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (ATASubChapterID != null)
                myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();

            if (myATAChapterId != null && myATASubChapterID != null)
            {               var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true  && myATAChapterId.Contains(it.ATAChapterId) && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new{PublicationItemMaster.ItemMasterId,PublicationItemMaster.PublicationId,it.PartNumber,it.ATAChapterId,it.ATAChapterCode,it.ATAChapterName,it.ATASubChapterId,it.ATASubChapterDescription,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (myATAChapterId != null && myATASubChapterID == null)
            {
                            var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId) 
                            select new{PublicationItemMaster.ItemMasterId,PublicationItemMaster.PublicationId,it.PartNumber,it.ATAChapterId,it.ATAChapterCode,it.ATAChapterName,it.ATASubChapterId,it.ATASubChapterDescription,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (myATAChapterId == null && myATASubChapterID != null)
            {
                            var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true &&  myATASubChapterID.Contains(it.ATASubChapterId)
                            select new{PublicationItemMaster.ItemMasterId,PublicationItemMaster.PublicationId,it.PartNumber,it.ATAChapterId,it.ATAChapterCode,it.ATAChapterName,it.ATASubChapterId,it.ATASubChapterDescription,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            else
            {
                            var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true
                            select new{PublicationItemMaster.ItemMasterId,PublicationItemMaster.PublicationId,it.PartNumber,it.ATAChapterId,it.ATAChapterCode,it.ATAChapterName,it.ATASubChapterId,it.ATASubChapterDescription,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
        }
    }
}
