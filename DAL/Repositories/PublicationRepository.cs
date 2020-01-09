
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
using Microsoft.AspNetCore.Http;
using ExcelDataReader;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;
using EntityFrameworkPaginate;

namespace DAL.Repositories
{
    public class PublicationRepository : Repository<DAL.Models.Publication>, IPublication
    {
        private AppSettings AppSettings { get; set; }
        public PublicationRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

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
            catch (Exception ex)
            {
                throw ex;
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
                        where PublicationItemMaster.IsDeleted == false && PublicationItemMaster.PublicationRecordId == PublicationID
                        && PublicationItemMaster.IsActive == true
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
                        join sc in _appContext.ATASubChapter on it.ATASubChapterId equals sc.ATASubChapterId
                        where PublicationItemMaster.IsDeleted == false && PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true
                        select new
                        {
                            it.ATAChapterName,
                            it.ATASubChapterDescription,
                            it.ATAChapterCode,
                            sc.ATASubChapterCode

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
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId.Value) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId.Value) && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && PublicationItemMaster.IsDeleted != true

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
                            join asc in _appContext.ATASubChapter on it.ATASubChapterId equals asc.ATASubChapterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && PublicationItemMaster.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId) && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, PublicationItemMaster.IsActive, PublicationItemMaster.IsDeleted, asc.ATASubChapterCode }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myATAChapterId != null && myATASubChapterID == null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            join asc in _appContext.ATASubChapter on it.ATASubChapterId equals asc.ATASubChapterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && PublicationItemMaster.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId)
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, PublicationItemMaster.IsActive, PublicationItemMaster.IsDeleted, asc.ATASubChapterCode }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myATAChapterId == null && myATASubChapterID != null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            join asc in _appContext.ATASubChapter on it.ATASubChapterId equals asc.ATASubChapterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && PublicationItemMaster.IsDeleted != true && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted, asc.ATASubChapterCode }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            join pub in _appContext.Publication on PublicationItemMaster.PublicationRecordId equals pub.PublicationRecordId
                            join asc in _appContext.ATASubChapter on it.ATASubChapterId equals asc.ATASubChapterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && PublicationItemMaster.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, pub.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, PublicationItemMaster.IsActive, PublicationItemMaster.IsDeleted, asc.ATASubChapterCode }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
        }

        public IEnumerable<object> GetPublicationsList(Common.Filters<PublicationFilters> pubFilters)
        {
            try
            {
                if (pubFilters.filters == null)
                    pubFilters.filters = new PublicationFilters();
                var pageNumber = pubFilters.first + 1;
                var pageSize = pubFilters.rows;
                int? revisionNo = 0;

                string sortColumn = string.Empty;
                var sorts = new Sorts<PublicationFilters>();

                if (pubFilters.filters.RevisionNum != null)
                    revisionNo = pubFilters.filters.RevisionNum;

                if (string.IsNullOrEmpty(pubFilters.SortField))
                {
                    sortColumn = "CreatedDate";
                    pubFilters.SortOrder = -1;
                    sorts.Add(sortColumn == "CreatedDate", x => x.CreatedDate, true);
                }
                else
                {
                    sortColumn = pubFilters.SortField;
                }

                if (pubFilters.SortOrder == -1)
                {
                    switch (pubFilters.SortField)
                    {
                        case "publicationId":
                            sorts.Add(sortColumn == "publicationId", x => x.PublicationId, true);
                            break;
                        case "description":
                            sorts.Add(sortColumn == "description", x => x.Description, true);
                            break;
                        case "publicationType":
                            sorts.Add(sortColumn == "publicationType", x => x.PublicationType, true);
                            break;
                        case "publishedBy":
                            sorts.Add(sortColumn == "publishedBy", x => x.PublishedBy, true);
                            break;
                        case "revisionDate":
                            sorts.Add(sortColumn == "revisionDate", x => x.RevisionDate, true);
                            break;
                        case "revisionNum":
                            sorts.Add(sortColumn == "revisionNum", x => x.RevisionNum, true);
                            break;
                        case "nextReviewDate":
                            sorts.Add(sortColumn == "nextReviewDate", x => x.NextReviewDate, true);
                            break;
                        case "expirationDate":
                            sorts.Add(sortColumn == "expirationDate", x => x.ExpirationDate, true);
                            break;
                        case "location":
                            sorts.Add(sortColumn == "location", x => x.Location, true);
                            break;
                        case "verifiedBy":
                            sorts.Add(sortColumn == "verifiedBy", x => x.VerifiedBy, true);
                            break;
                        case "verifiedDate":
                            sorts.Add(sortColumn == "verifiedDate", x => x.VerifiedDate, true);
                            break;
                    }
                }
                else
                {
                    switch (pubFilters.SortField)
                    {
                        case "publicationId":
                            sorts.Add(sortColumn == "publicationId", x => x.PublicationId);
                            break;
                        case "description":
                            sorts.Add(sortColumn == "description", x => x.Description);
                            break;
                        case "publicationType":
                            sorts.Add(sortColumn == "publicationType", x => x.PublicationType);
                            break;
                        case "publishedBy":
                            sorts.Add(sortColumn == "publishedBy", x => x.PublishedBy);
                            break;
                        case "revisionDate":
                            sorts.Add(sortColumn == "revisionDate", x => x.RevisionDate);
                            break;
                        case "revisionNum":
                            sorts.Add(sortColumn == "revisionNum", x => x.RevisionNum);
                            break;
                        case "nextReviewDate":
                            sorts.Add(sortColumn == "nextReviewDate", x => x.NextReviewDate);
                            break;
                        case "expirationDate":
                            sorts.Add(sortColumn == "expirationDate", x => x.ExpirationDate);
                            break;
                        case "location":
                            sorts.Add(sortColumn == "location", x => x.Location);
                            break;
                        case "verifiedBy":
                            sorts.Add(sortColumn == "verifiedBy", x => x.VerifiedBy);
                            break;
                        case "verifiedDate":
                            sorts.Add(sortColumn == "verifiedDate", x => x.VerifiedDate);
                            break;
                    }
                }


                var totalRecords = (from p in _appContext.Publication
                                    join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                                    join e in _appContext.Employee on p.VerifiedBy equals e.EmployeeId into emp
                                    from e in emp.DefaultIfEmpty()
                                    where p.IsDeleted == false
                                    && p.PublicationId.Contains(!String.IsNullOrEmpty(pubFilters.filters.PublicationId) ? pubFilters.filters.PublicationId : p.PublicationId)
                                    && p.Description.Contains(!String.IsNullOrEmpty(pubFilters.filters.Description) ? pubFilters.filters.Description : p.Description)
                                    && pt.Name.Contains(!string.IsNullOrEmpty(pubFilters.filters.PublicationType) ? pubFilters.filters.PublicationType : pt.Name)
                                    && p.Publishby.Contains(!String.IsNullOrEmpty(pubFilters.filters.PublishedBy) ? pubFilters.filters.PublishedBy : p.Publishby)
                                    && (e.FirstName == null || e.FirstName.Contains(!string.IsNullOrEmpty(pubFilters.filters.VerifiedBy) ? pubFilters.filters.VerifiedBy : e.FirstName))
                                    && p.Location == (!String.IsNullOrEmpty(pubFilters.filters.Location) ? pubFilters.filters.Location : p.Location)
                                    select new
                                    {
                                        p.PublicationRecordId
                                    }
                          ).Distinct()
                          .Count();

                var list = (from p in _appContext.Publication
                            join pt in _appContext.PublicationType on p.PublicationTypeId equals pt.PublicationTypeId
                            join e in _appContext.Employee on p.EmployeeId equals e.EmployeeId into emp
                            from e in emp.DefaultIfEmpty()
                            where p.IsDeleted == false
                                    && p.PublicationId.Contains(!String.IsNullOrEmpty(pubFilters.filters.PublicationId) ? pubFilters.filters.PublicationId : p.PublicationId)
                                    && p.Description.Contains(!String.IsNullOrEmpty(pubFilters.filters.Description) ? pubFilters.filters.Description : p.Description)
                                    && pt.Name.Contains(!string.IsNullOrEmpty(pubFilters.filters.PublicationType) ? pubFilters.filters.PublicationType : pt.Name)
                                    && p.Publishby.Contains(!String.IsNullOrEmpty(pubFilters.filters.PublishedBy) ? pubFilters.filters.PublishedBy : p.Publishby)
                                    && p.RevisionDate == (pubFilters.filters.RevisionDate != null ? pubFilters.filters.RevisionDate : p.RevisionDate)
                                    && p.RevisionNum == (revisionNo > 0 ? revisionNo : p.RevisionNum)
                                    && p.NextReviewDate == (pubFilters.filters.NextReviewDate != null ? pubFilters.filters.NextReviewDate : p.NextReviewDate)
                                    && p.ExpirationDate == (pubFilters.filters.ExpirationDate != null ? pubFilters.filters.ExpirationDate : p.ExpirationDate)
                                    && p.Location == (!String.IsNullOrEmpty(pubFilters.filters.Location) ? pubFilters.filters.Location : p.Location)
                                    && (e.FirstName == null || e.FirstName.Contains(!string.IsNullOrEmpty(pubFilters.filters.VerifiedBy) ? pubFilters.filters.VerifiedBy : e.FirstName))
                                    && p.VerifiedDate == (pubFilters.filters.VerifiedDate != null ? pubFilters.filters.VerifiedDate : p.VerifiedDate)
                            select new PublicationFilters()
                            {
                                PublicationRecordId = p.PublicationRecordId,
                                PublicationId = p.PublicationId,
                                Description = p.Description,
                                PublicationType = pt.Name,
                                PublishedBy = p.Publishby,
                                RevisionDate = p.RevisionDate,
                                RevisionNum = p.RevisionNum,
                                NextReviewDate = p.NextReviewDate,
                                ExpirationDate = p.ExpirationDate,
                                Location = p.Location,
                                VerifiedBy = e.FirstName == null ? "" : e.FirstName,
                                VerifiedDate = p.VerifiedDate,
                                CreatedDate = p.CreatedDate,
                                IsActive = p.IsActive,
                                TotalRecords = totalRecords
                            }
                          ).Distinct()
                          .Paginate(pageNumber, pageSize, sorts).Results;

                return list;
            }
            catch (Exception ex)
            {
                throw ex;
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
                                         EmployeeName = e.FirstName + ' ' + e.LastName,
                                         RevisionDate = p.RevisionDate,
                                         RevisionNum = p.RevisionNum,
                                         NextReviewDate = p.NextReviewDate,
                                         ExpirationDate = p.ExpirationDate,
                                         VerifiedBy = p.VerifiedBy,
                                         VerifiedDate = p.VerifiedDate,
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
                                              EmployeeName = e.FirstName + ' ' + e.LastName,
                                              RevisionDate = p.RevisionDate,
                                              RevisionNum = p.RevisionNum,
                                              NextReviewDate = p.NextReviewDate,
                                              ExpirationDate = p.ExpirationDate,
                                              VerifiedBy = p.VerifiedBy,
                                              VerifiedDate = p.VerifiedDate,
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
            catch (Exception ex)
            {
                throw ex;
            }


            //return _appContext.Publication.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.PublicationId).ToList();
        }

        public object PublicationView(long publicationRecordId)
        {
            try
            {
                var result = (from pb in _appContext.Publication
                              join pbt in _appContext.PublicationType on pb.PublicationTypeId equals pbt.PublicationTypeId into pbtt
                              from pbt in pbtt.DefaultIfEmpty()
                              join em in _appContext.Employee on pb.EmployeeId equals em.EmployeeId into emm
                              from em in emm.DefaultIfEmpty()
                              select new
                              {
                                  PublicationRecordId = pb.PublicationRecordId,
                                  EntryDate = pb.EntryDate,
                                  PublicationId = pb.PublicationId,
                                  Description = pb.Description,
                                  PublicationType = pbt.Name,
                                  ASD = pb.ASD,
                                  Sequence = pb.Sequence,
                                  Publishby = pb.Publishby,
                                  Location = pb.Location,
                                  RevisionDate = pb.RevisionDate,
                                  ExpirationDate = pb.ExpirationDate,
                                  NextReviewDate = pb.NextReviewDate,
                                  VerifiedBy = pb.VerifiedBy,
                                  VerifiedDate = pb.VerifiedDate,
                                  EmployeeName = em.FirstName + ' ' + em.LastName,
                                  RevisionNum = pb.RevisionNum,
                                  AttachmentDetails = GetAttachmentDetails(publicationRecordId)
                              }).Where(p => p.PublicationRecordId == publicationRecordId)
                           .FirstOrDefault();

                //var result = _appContext.Publication
                //     .Join(_appContext.PublicationType,
                //                p => p.PublicationTypeId,
                //                pt => pt.PublicationTypeId,
                //                (p, pt) => new { p, pt })
                //      .Join(_appContext.Employee,
                //             p1 => p1.p.EmployeeId,
                //             e => e.EmployeeId,
                //             (p1, e) => new { p1, e })
                //      .Select(p => new
                //      {
                //          PublicationRecordId = p.p1.p.PublicationRecordId,
                //          EntryDate = p.p1.p.EntryDate,
                //          PublicationId = p.p1.p.PublicationId,
                //          Description = p.p1.p.Description,
                //          PublicationType = p.p1.pt.Name,
                //          ASD = p.p1.p.ASD,
                //          Sequence = p.p1.p.Sequence,
                //          Publishby = p.p1.p.Publishby,
                //          Location = p.p1.p.Location,
                //          RevisionDate = p.p1.p.RevisionDate,
                //          ExpirationDate = p.p1.p.ExpirationDate,
                //          NextReviewDate = p.p1.p.NextReviewDate,
                //          VerifiedBy = p.p1.p.VerifiedBy,
                //          VerifiedDate = p.p1.p.VerifiedDate,
                //          EmployeeName = p.e.FirstName + ' ' + p.e.LastName,
                //          RevisionNum = p.p1.p.RevisionNum,
                //          AttachmentDetails = GetAttachmentDetails(publicationRecordId)
                //      })
                // .Where(p => p.PublicationRecordId == publicationRecordId)
                // .FirstOrDefault();
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<PublicationsList> getPublicationDropdownData()
        {
            var aircraftResult = (from p in _appContext.Publication
                                  where (p.IsDeleted == null || p.IsDeleted == false) && p.IsActive == true
                                  select new PublicationsList
                                  {
                                      PublicationRecordId = p.PublicationRecordId,
                                      PublicationId = p.PublicationId,
                                  }).OrderByDescending(x => x.UpdatedDate).ToList();

            return aircraftResult;

        }

        public object GetPublicationForWorkFlow(long publicationRecordId)
        {
            var aircraftResult = (from p in _appContext.Publication
                                  where p.PublicationRecordId == publicationRecordId && (p.IsDeleted == null || p.IsDeleted == false)

                                  select new
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
                                      AttachmentDetails = GetAttachmentDetails(publicationRecordId),
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
            var details = _appContext.Attachment
              .Join(_appContext.AttachmentDetails,
                     a => a.AttachmentId,
                     ad => ad.AttachmentId,
                     (a, ad) => new { a, ad })
              .Where(p => p.ad.IsDeleted == false && p.a.ModuleId == Convert.ToInt32(ModuleEnum.Publication) && p.a.ReferenceId == publicationRecordId)
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
            return attachmentDetailsList;
        }

        public IEnumerable<Publication> UploadCustomData(IFormFile file)
        {
            string description = string.Empty;
            string shortName = string.Empty;
            string standard = string.Empty;
            string memo = string.Empty;
            List<Publication> publications = new List<Publication>();
            long? employeeId = 0;
            int count = 0;
            try
            {
                Publication publication;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.Publication), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);

                var publicationTypes = _appContext.PublicationType.Where(p => p.IsDeleted == false && p.IsActive == true).ToList();
                var employees = _appContext.Employee.Where(p => p.IsDeleted == false && p.IsActive == true).ToList();

                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    employeeId = 0;
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(1) != null)
                                    {
                                        var publicationType = publicationTypes.Where(p => p.Name == reader.GetValue(2).ToString()).FirstOrDefault();
                                        var employee = employees.Where(p => p.FirstName == reader.GetValue(4).ToString()).FirstOrDefault();
                                        if (employee != null)
                                            employeeId = employee.EmployeeId;
                                        else
                                            employeeId = 0;
                                        if (publicationType != null)
                                        {
                                            var flag = _appContext.Publication.Any(p => p.IsDeleted == false && p.PublicationId == Convert.ToString(reader.GetValue(0)).Trim() && p.PublicationTypeId == publicationType.PublicationTypeId);
                                            if (!flag)
                                            {
                                                publication = new Publication();
                                                if (reader.GetValue(0) != null)
                                                    publication.PublicationId = Convert.ToString(reader.GetValue(0));
                                                if (reader.GetValue(1) != null)
                                                    publication.Description = Convert.ToString(reader.GetValue(1));
                                                if (reader.GetValue(2) != null)
                                                    publication.PublicationTypeId = publicationType.PublicationTypeId;
                                                if (reader.GetValue(3) != null)
                                                    publication.Publishby = Convert.ToString(reader.GetValue(3));
                                                if (reader.GetValue(4) != null)
                                                    publication.EmployeeId = Convert.ToInt64(employeeId);
                                                if (reader.GetValue(5) != null)
                                                    publication.Location = Convert.ToString(reader.GetValue(5));

                                                publication.MasterCompanyId = 1;
                                                publication.IsActive = true;
                                                publication.IsDeleted = false;
                                                publication.CreatedBy = publication.UpdatedBy = "System";
                                                publication.UpdatedDate = publication.CreatedDate = DateTime.Now;
                                                publication.EntryDate = publication.ExpirationDate = DateTime.Now;
                                                publication.NextReviewDate = publication.RevisionDate = DateTime.Now;
                                                publication.VerifiedDate = DateTime.Now;

                                                _appContext.Publication.Add(publication);
                                                _appContext.SaveChanges();
                                                //publication.UploadStatus = "Success";
                                                publications.Add(publication);
                                            }
                                            else
                                            {
                                                publication = new Publication();
                                                if (reader.GetValue(0) != null)
                                                    publication.PublicationId = Convert.ToString(reader.GetValue(0));
                                                if (reader.GetValue(1) != null)
                                                    publication.Description = Convert.ToString(reader.GetValue(1));
                                                if (reader.GetValue(2) != null)
                                                    publication.PublicationTypeId = publicationType.PublicationTypeId;
                                                if (reader.GetValue(3) != null)
                                                    publication.Publishby = Convert.ToString(reader.GetValue(3));
                                                if (reader.GetValue(4) != null)
                                                    publication.EmployeeId = Convert.ToInt64(employeeId);
                                                if (reader.GetValue(5) != null)
                                                    publication.Location = Convert.ToString(reader.GetValue(5));
                                                publications.Add(publication);
                                            }
                                        }


                                    }
                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return publications;
        }

        public IEnumerable<object> PublicationHistory(long publicationId)
        {
            try
            {
                var list = (from pa in _appContext.PublicationAudit
                            join pt in _appContext.PublicationType on pa.PublicationTypeId equals pt.PublicationTypeId
                            join e in _appContext.Employee on pa.EmployeeId equals e.EmployeeId into emp
                            from e in emp.DefaultIfEmpty()
                            where pa.PublicationRecordId == publicationId
                            select new
                            {
                                pa.PublicationId,
                                pa.Description,
                                PublicationType = pt.Name,
                                pa.Publishby,
                                EmployeeName = e == null ? " " : e.FirstName,
                                pa.Location,
                                pa.IsActive,
                                pa.UpdatedBy,
                                pa.UpdatedDate,
                                pa.RevisionNum
                            }
                          ).OrderByDescending(p => p.UpdatedDate).ToList();


                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
