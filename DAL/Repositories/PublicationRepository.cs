
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;
using DAL.Common;

namespace DAL.Repositories
{
    public class PublicationRepository : Repository<DAL.Models.Publication>, IPublication
    {
        public PublicationRepository(ApplicationDbContext context) : base(context)
        { }

        public Publication GetPublicationsById(long ID)
        {
            try
            {
                Publication publication = new Publication();

                publication = _appContext.Publication
                 .Where(p => p.PublicationRecordId == ID)
                 .FirstOrDefault();

                if (publication != null)
                {
                    var attachmentList = _appContext.Attachment.Where(p => p.ReferenceId == ID && p.ModuleId == Convert.ToInt32(ModuleEnum.Publication)).ToList();
                    if (attachmentList != null && attachmentList.Count > 0)
                    {
                        publication.AttachmentDetails = new List<AttachmentDetails>();
                        foreach (var attachment in attachmentList)
                        {
                            publication.AttachmentId = attachment.AttachmentId;

                            var details = _appContext.Attachment
                              .Join(_appContext.AttachmentDetails,
                                     a => a.AttachmentId,
                                     ad => ad.AttachmentId,
                                     (a, ad) => new { a, ad })
                              .Where(p => p.ad.IsDeleted == false
                                    && p.a.AttachmentId == publication.AttachmentId
                                    && p.a.ModuleId == Convert.ToInt32(ModuleEnum.Publication)
                                    && p.a.ReferenceId == ID)
                              .Select(p => new
                              {
                                  AttachmentDetails = p.ad
                              })
                              .ToList();

                            if (details != null && details.Count > 0)
                            {

                                foreach (var item in details)
                                {
                                    publication.AttachmentDetails.Add(item.AttachmentDetails);
                                }
                            }
                        }


                    }
                }

                return publication;

            }
            catch (Exception)
            {
                throw;
            }
        }

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

        public IEnumerable<object> GetPubPNMappingData(string PublicationRecordIds)
        {
            var myPNids = PublicationRecordIds.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from pim in _appContext.PublicationItemMasterMapping
                        join pub in _appContext.Publication on pim.PublicationRecordId equals pub.PublicationRecordId
                        join im in _appContext.ItemMaster on pim.ItemMasterId equals im.ItemMasterId
                        join ic in _appContext.ItemClassification on im.ItemClassificationId equals ic.ItemClassificationId
                        where myPNids.Contains(pim.PublicationRecordId) && pim.IsDeleted != true && pim.IsActive == true
                        select new
                        {
                            pim.ItemMasterId,
                            pub.PublicationId,
                            im.PartNumber,
                            im.PartDescription,
                            ItemClassification = ic.Description,
                            im.ItemClassificationId,
                            im.ItemGroupId,
                            pim.PublicationItemMasterMappingId,
                            pub.PublicationRecordId,
                            pim.MasterCompanyId,
                            pim.IsActive,
                            pim.IsDeleted

                        }).ToList();
            return data;

            throw new NotImplementedException();
        }
        public IEnumerable<object> GetAircraftMappingDataById(long PublicationID)
        {
            var data = (from PublicationItemMaster in _appContext.PublicationItemMasterMapping
                        join it in _appContext.ItemMasterAircraftMapping on PublicationItemMaster.ItemMasterId equals it.ItemMasterId
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where it.IsDeleted==false && PublicationItemMaster.PublicationRecordId == PublicationID

                        select new
                        {
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel
                            
                        }).Distinct()
                        .ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetATAMappingDataById(long PublicationID)
        {
            var data = (from PublicationItemMaster in _appContext.PublicationItemMasterMapping
                        join it in _appContext.ItemMasterATAMapping on PublicationItemMaster.ItemMasterId equals it.ItemMasterId
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where it.IsDeleted==false && PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true
                        select new
                        {
                            it.ATAChapterName,
                            it.ATASubChapterDescription,
                        }).Distinct()
                        .ToList();
            return data;
        }
        public IEnumerable<object> GetAircraftMappingDataByMultiTypeId(long PublicationID, string AircraftTypeId)
        {
            var myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId.Value)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myATAChapterId.Contains(it.ATAChapterId) && myATASubChapterID.Contains(it.ATASubChapterId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myATAChapterId.Contains(it.ATAChapterId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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
                        join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myATASubChapterID.Contains(it.ATASubChapterId)

                        select new
                        {
                            PublicationItemMaster.ItemMasterId,
                            pub.PublicationId,
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

        public IEnumerable<object> searchgetAircraftMappingDataByMultiTypeIdModelIDDashID(long PublicationID, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            long[] myAircraftTypeId = null;
            long[] myAircraftModelId = null;
            long[] myDashNumberId = null;
            if (AircraftTypeId != null && AircraftTypeId != "")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId != "")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            if (myAircraftTypeId != null && myAircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true

                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;

            }

        }

        public IEnumerable<object> searchGetATAMappingDataByMultiATAIdSUBATAID(long PublicationID, string ATAChapterId, string ATASubChapterID)
        {
            long[] myATAChapterId = null;
            long[] myATASubChapterID = null;
            if (ATAChapterId != null && ATAChapterId != "")
                myATAChapterId = ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (ATASubChapterID != null && ATASubChapterID != "")
                myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();

            if (myATAChapterId != null && myATASubChapterID != null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId) && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myATAChapterId != null && myATASubChapterID == null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId)
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myATAChapterId == null && myATASubChapterID != null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
        }

        public GetData<PublicationsList> GetPublicationsList(string publicationId, string description, long publicationTypeId, string publishedBy, long employeeId, string location, int pageNumber, int pageSize)
        {
            try
            {
                if (publicationTypeId == null)
                    publicationTypeId = 0;
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                GetData<PublicationsList> getData = new GetData<PublicationsList>();
                PublicationsList publication;

                getData.TotalRecordsCount = _appContext.Publication
                           .Join(_appContext.PublicationType,
                           p => p.PublicationTypeId,
                           pt => pt.PublicationTypeId,
                           (p, pt) => new { p, pt })
                            .Where(p => (p.p.IsDeleted == null || p.p.IsDeleted == false)
                                   && p.p.PublicationId.Contains(!String.IsNullOrEmpty(publicationId) ? publicationId : p.p.PublicationId)
                                   && p.p.Description.Contains(!String.IsNullOrEmpty(description) ? description : p.p.Description)
                                   && p.p.PublicationTypeId == (publicationTypeId > 0 ? publicationTypeId : p.p.PublicationTypeId)
                                   && p.p.Publishby.Contains(!String.IsNullOrEmpty(publishedBy) ? publishedBy : p.p.Publishby)
                                   && p.p.EmployeeId == p.p.EmployeeId
                                   && p.p.Location == (!String.IsNullOrEmpty(location) ? location : p.p.Location)
                                   )
                            .Count();

                var result = _appContext.Publication
                            .Join(_appContext.PublicationType,
                            p => p.PublicationTypeId,
                            pt => pt.PublicationTypeId,
                            (p, pt) => new { p, pt })
                            .Join(_appContext.Employee,
                            p1 => p1.p.EmployeeId,
                            e => e.EmployeeId,
                            (p1, e) => new { p1, e })
                             .Where(p => (p.p1.p.IsDeleted == null || p.p1.p.IsDeleted == false)
                                    && p.p1.p.PublicationId.Contains(!String.IsNullOrEmpty(publicationId) ? publicationId : p.p1.p.PublicationId)
                                    && p.p1.p.Description.Contains(!String.IsNullOrEmpty(description) ? description : p.p1.p.Description)
                                    && p.p1.p.PublicationTypeId == (publicationTypeId > 0 ? publicationTypeId : p.p1.p.PublicationTypeId)
                                    && p.p1.p.Publishby.Contains(!String.IsNullOrEmpty(publishedBy) ? publishedBy : p.p1.p.Publishby)
                                    && p.p1.p.EmployeeId == p.p1.p.EmployeeId
                                    && p.p1.p.Location == (!String.IsNullOrEmpty(location) ? location : p.p1.p.Location)
                                    )
                             .Select(p => new
                             {
                                 PublicationRecordId = p.p1.p.PublicationRecordId,
                                 PublicationId = p.p1.p.PublicationId,
                                 Description = p.p1.p.Description,
                                 PublicationType = p.p1.pt.Name,
                                 Publishby = p.p1.p.Publishby,
                                 Location = p.p1.p.Location,
                                 IsActive = p.p1.p.IsActive,
                                 UpdatedDate = p.p1.p.UpdatedDate,
                                 EmployeeName = p.e.FirstName + ' ' + p.e.LastName

                             })
                             .OrderByDescending(p => p.UpdatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<PublicationsList>();
                    foreach (var item in result)
                    {
                        publication = new PublicationsList();
                        publication.PublicationRecordId = item.PublicationRecordId;
                        publication.PublicationId = item.PublicationId;
                        publication.Description = item.Description;
                        publication.PublicationType = item.PublicationType;
                        publication.PublishedBy = item.Publishby;
                        publication.Location = item.Location;
                        publication.IsActive = item.IsActive;
                        publication.EmployeeName = item.EmployeeName;

                        getData.PaginationList.Add(publication);
                    }
                }
                return getData;
            }
            catch (Exception ex)
            {
                throw;
            }


            //return _appContext.Publication.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.PublicationId).ToList();
        }

        public GetData<PublicationsList> PublicationsGlobalSearch(long? ataChapterId, long? ataSubChapterId, long? airCraftId, long? modelId, long? dashNumberId, int pageNumber, int pageSize)
        {

            try
            {
                if (ataChapterId == null)
                    ataChapterId = 0;
                if (ataSubChapterId == null)
                    ataSubChapterId = 0;
                if (airCraftId == null)
                    airCraftId = 0;
                if (modelId == null)
                    modelId = 0;
                if (dashNumberId == null)
                    dashNumberId = 0;

                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                GetData<PublicationsList> getData = new GetData<PublicationsList>();
                PublicationsList publication;
                getData.PaginationList = new List<PublicationsList>();

                if (ataChapterId > 0 && airCraftId > 0)
                {
                    var ataresult = (from p in _appContext.Publication
                                     join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                     join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                                     join ima in _appContext.ItemMasterATAMapping on pim.ItemMasterId equals ima.ItemMasterId
                                     join ac in _appContext.ATAChapter on ima.ATAChapterId equals ac.ATAChapterId
                                     join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId
                                     where p.IsDeleted == false && ac.ATAChapterId == ataChapterId
                                           && ima.ATASubChapterId == (ataSubChapterId > 0 ? ataSubChapterId : ima.ATASubChapterId)
                                     select new
                                     {
                                         PublicationRecordId = p.PublicationRecordId,
                                         PublicationId = p.PublicationId,
                                         Description = p.Description,
                                         PublicationType = pt.Name,
                                         Publishby = p.Publishby,
                                         Location = p.Location,
                                         IsActive = p.IsActive,
                                         UpdatedDate = p.UpdatedDate,
                                         EmployeeName = e.FirstName + ' ' + e.LastName
                                     })
                                     .Distinct()
                                     .OrderByDescending(p => p.UpdatedDate)
                                     .ToList();

                    var aircraftResult = (from p in _appContext.Publication
                                          join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                          join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                                          join ima in _appContext.ItemMasterAircraftMapping on pim.ItemMasterId equals ima.ItemMasterId
                                          join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId
                                          join ac in _appContext.AircraftType on ima.AircraftTypeId equals ac.AircraftTypeId
                                          where p.IsDeleted == null || p.IsDeleted == false
                                                && ima.AircraftTypeId == airCraftId
                                                && ima.AircraftModelId == (modelId > 0 ? modelId : ima.AircraftModelId)
                                                && ima.DashNumberId == (dashNumberId > 0 ? dashNumberId : ima.DashNumberId)
                                          select new
                                          {
                                              PublicationRecordId = p.PublicationRecordId,
                                              PublicationId = p.PublicationId,
                                              Description = p.Description,
                                              PublicationType = pt.Name,
                                              Publishby = p.Publishby,
                                              Location = p.Location,
                                              IsActive = p.IsActive,
                                              UpdatedDate = p.UpdatedDate,
                                              EmployeeName = e.FirstName + ' ' + e.LastName
                                          })
                             .Distinct()
                             .OrderByDescending(p => p.UpdatedDate)
                             .ToList();


                    getData.TotalRecordsCount = (from ata in ataresult
                                                 join ac in aircraftResult on ata.PublicationRecordId equals ac.PublicationRecordId
                                                 select new
                                                 {
                                                     ata.PublicationRecordId
                                                 }
                           )
                           .Distinct()
                           .Count();

                    var result = (from ata in ataresult
                                  join ac in aircraftResult on ata.PublicationRecordId equals ac.PublicationRecordId
                                  select new
                                  {
                                      PublicationRecordId = ata.PublicationRecordId,
                                      PublicationId = ata.PublicationId,
                                      Description = ata.Description,
                                      PublicationType = ata.PublicationType,
                                      Publishby = ata.Publishby,
                                      Location = ata.Location,
                                      IsActive = ata.IsActive,
                                      UpdatedDate = ata.UpdatedDate,
                                      EmployeeName = ata.EmployeeName
                                  }
                           )
                           .Distinct()
                           .Skip(skip)
                          .Take(take)
                          .ToList();


                    if (result != null && result.Count > 0)
                    {
                        foreach (var item in result)
                        {
                            publication = new PublicationsList();
                            publication.PublicationRecordId = item.PublicationRecordId;
                            publication.PublicationId = item.PublicationId;
                            publication.Description = item.Description;
                            publication.PublicationType = item.PublicationType;
                            publication.PublishedBy = item.Publishby;
                            publication.Location = item.Location;
                            publication.IsActive = item.IsActive;
                            publication.EmployeeName = item.EmployeeName;
                            getData.PaginationList.Add(publication);
                        }
                    }
                }

                else if (ataChapterId > 0)
                {


                    getData.TotalRecordsCount = (from p in _appContext.Publication
                                                 join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                                 join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                                                 join ima in _appContext.ItemMasterATAMapping on pim.ItemMasterId equals ima.ItemMasterId
                                                 join ac in _appContext.ATAChapter on ima.ATAChapterId equals ac.ATAChapterId
                                                 join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId
                                                 where p.IsDeleted == false && ac.ATAChapterId == ataChapterId
                                                       && ima.ATASubChapterId == (ataSubChapterId > 0 ? ataSubChapterId : ima.ATASubChapterId)
                                                 select new
                                                 {
                                                     p.PublicationRecordId
                                                 })
                                                 .Distinct()
                                                .Count();

                    var ataresult = (from p in _appContext.Publication
                                     join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                     join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                                     join ima in _appContext.ItemMasterATAMapping on pim.ItemMasterId equals ima.ItemMasterId
                                     join ac in _appContext.ATAChapter on ima.ATAChapterId equals ac.ATAChapterId
                                     join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId
                                     where p.IsDeleted == false && ac.ATAChapterId == ataChapterId
                                           && ima.ATASubChapterId == (ataSubChapterId > 0 ? ataSubChapterId : ima.ATASubChapterId)
                                     select new
                                     {
                                         PublicationRecordId = p.PublicationRecordId,
                                         PublicationId = p.PublicationId,
                                         Description = p.Description,
                                         PublicationType = pt.Name,
                                         Publishby = p.Publishby,
                                         Location = p.Location,
                                         IsActive = p.IsActive,
                                         UpdatedDate = p.UpdatedDate,
                                         EmployeeName = e.FirstName + ' ' + e.LastName
                                     })
                                     .Distinct()
                             .OrderByDescending(p => p.UpdatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();

                    if (ataresult != null && ataresult.Count > 0)
                    {
                        foreach (var item in ataresult)
                        {
                            publication = new PublicationsList();
                            publication.PublicationRecordId = item.PublicationRecordId;
                            publication.PublicationId = item.PublicationId;
                            publication.Description = item.Description;
                            publication.PublicationType = item.PublicationType;
                            publication.PublishedBy = item.Publishby;
                            publication.Location = item.Location;
                            publication.IsActive = item.IsActive;
                            publication.EmployeeName = item.EmployeeName;
                            getData.PaginationList.Add(publication);
                        }
                    }
                }
                else if (airCraftId > 0)
                {

                    getData.TotalRecordsCount = (from p in _appContext.Publication
                                                 join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                                 join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                                                 join ima in _appContext.ItemMasterAircraftMapping on pim.ItemMasterId equals ima.ItemMasterId
                                                 join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId
                                                 join ac in _appContext.AircraftType on ima.AircraftTypeId equals ac.AircraftTypeId
                                                 where p.IsDeleted == null || p.IsDeleted == false
                                                       && ima.AircraftTypeId == airCraftId
                                                       && ima.AircraftModelId == (modelId > 0 ? modelId : ima.AircraftModelId)
                                                       && ima.DashNumberId == (dashNumberId > 0 ? dashNumberId : ima.DashNumberId)
                                                 select new
                                                 {
                                                     p.PublicationRecordId
                                                 }).Distinct().Count();

                    var aircraftResult = (from p in _appContext.Publication
                                          join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                          join pim in _appContext.PublicationItemMasterMapping on p.PublicationRecordId equals pim.PublicationRecordId
                                          join ima in _appContext.ItemMasterAircraftMapping on pim.ItemMasterId equals ima.ItemMasterId
                                          join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId
                                          join ac in _appContext.AircraftType on ima.AircraftTypeId equals ac.AircraftTypeId
                                          where p.IsDeleted == null || p.IsDeleted == false
                                                && ima.AircraftTypeId == airCraftId
                                                && ima.AircraftModelId == (modelId > 0 ? modelId : ima.AircraftModelId)
                                                && ima.DashNumberId == (dashNumberId > 0 ? dashNumberId : ima.DashNumberId)
                                          select new
                                          {
                                              PublicationRecordId = p.PublicationRecordId,
                                              PublicationId = p.PublicationId,
                                              Description = p.Description,
                                              PublicationType = pt.Name,
                                              Publishby = p.Publishby,
                                              Location = p.Location,
                                              IsActive = p.IsActive,
                                              UpdatedDate = p.UpdatedDate,
                                              EmployeeName = e.FirstName + ' ' + e.LastName
                                          })
                             .Distinct()
                             .OrderByDescending(p => p.UpdatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();



                    if (aircraftResult != null && aircraftResult.Count > 0)
                    {
                        foreach (var item in aircraftResult)
                        {
                            publication = new PublicationsList();
                            publication.PublicationRecordId = item.PublicationRecordId;
                            publication.PublicationId = item.PublicationId;
                            publication.Description = item.Description;
                            publication.PublicationType = item.PublicationType;
                            publication.PublishedBy = item.Publishby;
                            publication.Location = item.Location;
                            publication.IsActive = item.IsActive;
                            publication.EmployeeName = item.EmployeeName;
                            getData.PaginationList.Add(publication);
                        }

                    }
                }


                return getData;
            }
            catch (Exception)
            {
                throw;
            }


            //return _appContext.Publication.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.PublicationId).ToList();
        }

        public object PublicationView(long publicationRecordId)
        {
            try
            {
                var result = _appContext.Publication
                     .Join(_appContext.PublicationType,
                                p => p.PublicationTypeId,
                                pt => pt.PublicationTypeId,
                                (p, pt) => new { p, pt })
                      .Join(_appContext.Employee,
                             p1 => p1.p.EmployeeId,
                             e => e.EmployeeId,
                             (p1, e) => new { p1, e })
                      .Select(p => new
                      {
                          PublicationRecordId = p.p1.p.PublicationRecordId,
                          EntryDate = p.p1.p.EntryDate,
                          PublicationId = p.p1.p.PublicationId,
                          Description = p.p1.p.Description,
                          PublicationType = p.p1.pt.Name,
                          ASD = p.p1.p.ASD,
                          Sequence = p.p1.p.Sequence,
                          Publishby = p.p1.p.Publishby,
                          Location = p.p1.p.Location,
                          RevisionDate = p.p1.p.RevisionDate,
                          ExpirationDate = p.p1.p.ExpirationDate,
                          NextReviewDate = p.p1.p.NextReviewDate,
                          VerifiedBy = p.p1.p.VerifiedBy,
                          VerifiedDate = p.p1.p.VerifiedDate,
                          EmployeeName = p.e.FirstName + ' ' + p.e.LastName,
                          AttachmentDetails = GetAttachmentDetails(publicationRecordId)
                      })
                 .Where(p => p.PublicationRecordId == publicationRecordId)
                 .FirstOrDefault();
                return result;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void PublicationStatus(long publicationRecordId, bool status, string updatedBy)
        {
            Publication publication = new Publication();
            try
            {
                publication.PublicationRecordId = publicationRecordId;
                publication.UpdatedDate = DateTime.Now;
                publication.UpdatedBy = updatedBy;
                publication.IsActive = status;

                _appContext.Publication.Attach(publication);
                _appContext.Entry(publication).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(publication).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(publication).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetPublicationTypes()
        {
            try
            {
                var result = (from pt in _appContext.PublicationType
                              where pt.IsDeleted == false
                              select new
                              {
                                  pt.PublicationTypeId,
                                  pt.Name
                              })
                              .ToList();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<PublicationsList> getPublicationDropdownData()
        {
            var aircraftResult = (from p in _appContext.Publication
                                  where (p.IsDeleted == null || p.IsDeleted == false)
                                  select new PublicationsList
                                  {
                                      PublicationRecordId = p.PublicationRecordId,
                                      PublicationId = p.PublicationId,
                                  }).OrderByDescending(x => x.UpdatedDate).ToList();

            return aircraftResult;

        }

        public PublicationsList GetPublicationForWorkFlow(long publicationRecordId)
        {
            var aircraftResult = (from p in _appContext.Publication
                                  where p.PublicationRecordId == publicationRecordId && (p.IsDeleted == null || p.IsDeleted == false)

                                  select new PublicationsList
                                  {
                                      PublicationRecordId = p.PublicationRecordId,
                                      PublicationId = p.PublicationId,
                                      Description = p.Description,
                                      PublicationTypeId = p.PublicationTypeId,
                                      PublishedBy = p.Publishby,
                                      Location = p.Location,
                                      IsActive = p.IsActive,
                                      UpdatedDate = p.UpdatedDate,
                                      Sequence = p.Sequence,
                                      RevisionDate = p.RevisionDate,
                                      VerifiedBy = p.VerifiedBy,
                                      VerifiedDate = p.VerifiedDate,
                                      ASD = p.ASD,
                                      ItemMasterAircraftMapping = (from iam in _appContext.ItemMasterAircraftMapping
                                                                   join pim in _appContext.PublicationItemMasterMapping on iam.ItemMasterId equals pim.ItemMasterId
                                                                   where pim.PublicationRecordId == p.PublicationRecordId && iam.IsDeleted == false && pim.IsDeleted == false
                                                                   select iam).ToList()

                                  })
                                 .FirstOrDefault();

            return aircraftResult;

        }

        private List<AttachmentDetails> GetAttachmentDetails(long publicationRecordId)
        {
            List<AttachmentDetails> attachmentDetailsList = new List<AttachmentDetails>();
            AttachmentDetails attachmentDetails;
            var attachment = _appContext.Attachment.Where(p => p.ReferenceId == publicationRecordId && p.ModuleId == Convert.ToInt32(ModuleEnum.Publication)).FirstOrDefault();
            if (attachment != null)
            {
                var details = _appContext.Attachment
                  .Join(_appContext.AttachmentDetails,
                         a => a.AttachmentId,
                         ad => ad.AttachmentId,
                         (a, ad) => new { a, ad })
                  .Where(p => p.ad.IsDeleted == false && p.a.AttachmentId == attachment.AttachmentId && p.a.ModuleId == Convert.ToInt32(ModuleEnum.Publication) && p.a.ReferenceId == publicationRecordId)
                  .Select(p => new
                  {
                      AttachmentDetails = p.ad
                  })
                  .ToList();

                if (details != null && details.Count > 0)
                {

                    foreach (var item in details)
                    {
                        attachmentDetails = new AttachmentDetails();
                        attachmentDetails = item.AttachmentDetails;
                        attachmentDetailsList.Add(attachmentDetails);
                    }
                }
            }

            return attachmentDetailsList;
        }
    }
}
