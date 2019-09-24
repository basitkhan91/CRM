
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

        public IEnumerable<object> GetPublications()
        {
            try
            {
                var data = (from Mainpub in _appContext.Publication
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on Mainpub.PublicationRecordId equals PublicationItemMaster.PublicationRecordId
                            join it in _appContext.ItemMasterATAMapping on PublicationItemMaster.ItemMasterId equals it.ItemMasterId
                            join ItemMasterAircraft in _appContext.ItemMasterAircraftMapping on it.ItemMasterId equals ItemMasterAircraft.ItemMasterId
                            where Mainpub.IsDeleted != true
                            select new
                            {
                                Mainpub.PublicationRecordId,
                                Mainpub.PublicationId,
                                Mainpub.Memo,
                                Mainpub.Platform,
                                Mainpub.Description,
                                Mainpub.MasterCompanyId,
                                Mainpub.revision,
                                Mainpub.revisionDate,
                                Mainpub.nextreviewDate,
                                Mainpub.verifieddate,
                                Mainpub.CreatedBy,
                                Mainpub.UpdatedBy,
                                Mainpub.CreatedDate,
                                Mainpub.UpdatedDate,
                                Mainpub.EntryDate,
                                Mainpub.IsActive,
                                Mainpub.IsDeleted,
                                Mainpub.ASD,
                                Mainpub.publishby,
                                Mainpub.location,
                                Mainpub.verifiedby,
                                Mainpub.employee,

                                PublicationItemMaster.PartNumberDescription,
                                ItemMasterAircraft.AircraftModel,
                                ItemMasterAircraft.AircraftType,
                                it.ItemMasterId,
                                it.PartNumber,
                                it.ATAChapterId,
                                it.ATAChapterCode,
                                it.ATAChapterName,
                                it.ATASubChapterId,
                                it.ATASubChapterDescription,
                            }).ToList();
                var uniquedata = data.GroupBy(item => new { item.PartNumber }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            catch (Exception ex)
            {
                throw;
            }


            //return _appContext.Publication.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.PublicationId).ToList();
        }

        public Publication GetPublicationsById(long ID)
        {
            try
            {
                Publication publication = new Publication();
                //var data = (from Mainpub in _appContext.Publication
                //            where Mainpub.IsActive == true && Mainpub.IsDeleted != true && Mainpub.PublicationRecordId == ID
                //            select new
                //            {
                //                Mainpub.PublicationRecordId,
                //                Mainpub.PublicationId,
                //                Mainpub.Memo,
                //                Mainpub.Platform,
                //                Mainpub.Description,
                //                Mainpub.MasterCompanyId,
                //                Mainpub.revision,
                //                Mainpub.revisionDate,
                //                Mainpub.nextreviewDate,
                //                Mainpub.verifieddate,
                //                Mainpub.CreatedBy,
                //                Mainpub.UpdatedBy,
                //                Mainpub.CreatedDate,
                //                Mainpub.UpdatedDate,
                //                Mainpub.EntryDate,
                //                Mainpub.IsActive,
                //                Mainpub.IsDeleted,
                //                Mainpub.ASD,
                //                Mainpub.publishby,
                //                Mainpub.location,
                //                Mainpub.verifiedby,
                //                Mainpub.employee,
                //            }).ToList();
             var result=   _appContext.Publication
               .Join(_appContext.PublicationTypes,
                            p => p.PublicationTypeId,
                            pt => pt.Id,
                            (p, pt) => new { p, pt })
               .Where(p => p.p.PublicationRecordId == ID)
               .Select(p => new
               {
                   Publication=p.p,
                   PublictationType=p.pt.Name
               })
               .FirstOrDefault();

                if(result!=null && result.Publication!=null && result.Publication.PublicationRecordId>0)
                {
                    publication = result.Publication;
                    publication.PublicationType = result.PublictationType;

                    var emp = _appContext.Employee.Where(x => x.EmployeeId == ((string.IsNullOrEmpty(result.Publication.employee)) ? 0 : Convert.ToInt64(result.Publication.employee))).FirstOrDefault();
                    if (emp != null)
                        publication.EmployeeName = emp.FirstName + ' ' + emp.LastName;

                    var attachment= _appContext.Attachment.Where(p => p.ReferenceId == ID && p.ModuleId == Convert.ToInt32(ModuleEnum.Publication)).FirstOrDefault();
                    if (attachment != null)
                    {
                        publication.AttachmentId = attachment.AttachmentId;

                          var details= _appContext.Attachment
                            .Join(_appContext.AttachmentDetails,
                                   a => a.AttachmentId,
                                   ad => ad.AttachmentId,
                                   (a, ad) => new { a, ad })
                            .Where(p => p.ad.IsDeleted == false && p.a.AttachmentId == publication.AttachmentId && p.a.ModuleId == Convert.ToInt32(ModuleEnum.Publication) && p.a.ReferenceId == ID)
                            .Select(p => new
                            {
                                AttachmentDetails = p.ad
                            })
                            .ToList();

                        if(details!=null && details.Count>0)
                        {
                            publication.AttachmentDetails = new List<AttachmentDetails>();
                            foreach (var item in details)
                            {
                                publication.AttachmentDetails.Add(item.AttachmentDetails);
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


            //return _appContext.Publication.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.PublicationId).ToList();
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

        public IEnumerable<object> GetPubPNMappingData(string PublicationRecordIds)
        {
            var myPNids = PublicationRecordIds.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from iM in _appContext.PublicationItemMasterMapping
                        where myPNids.Contains(iM.PublicationRecordId) && iM.IsDeleted != true && iM.IsActive == true
                        select new
                        {
                            iM.ItemMasterId,
                            iM.PublicationId,
                            iM.PartNumber,
                            iM.PartNumberDescription,
                            iM.ItemClassification,
                            iM.ItemClassificationId,
                            iM.ItemGroupId,
                            iM.PublicationItemMasterMappingId,
                            iM.PublicationRecordId,
                            iM.MasterCompanyId,
                            iM.IsActive,
                            iM.IsDeleted

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
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value)

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
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId.Value)

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
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value)

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
                        where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value)

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
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myAircraftModelId.Contains(it.AircraftModelId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myAircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true

                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
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
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId) && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myATAChapterId != null && myATASubChapterID == null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATAChapterId.Contains(it.ATAChapterId)
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (myATAChapterId == null && myATASubChapterID != null)
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true && myATASubChapterID.Contains(it.ATASubChapterId)
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from it in _appContext.ItemMasterATAMapping
                            join PublicationItemMaster in _appContext.PublicationItemMasterMapping on it.ItemMasterId equals PublicationItemMaster.ItemMasterId
                            where PublicationItemMaster.PublicationRecordId == PublicationID && PublicationItemMaster.IsActive == true && it.IsDeleted != true
                            select new { PublicationItemMaster.ItemMasterId, PublicationItemMaster.PublicationId, it.PartNumber, it.ATAChapterId, it.ATAChapterCode, it.ATAChapterName, it.ATASubChapterId, it.ATASubChapterDescription, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
        }

        public GetData<Publication> GetPublicationsList(string publicationId,string description,int? publicationTypeId,string publishedBy,string employee,string location,int pageNumber, int pageSize)
        {
            try
            {
                if (publicationTypeId == null)
                    publicationTypeId = 0;
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                GetData<Publication> getData = new GetData<Publication>();
                Publication publication;

                getData.TotalRecordsCount= _appContext.Publication
                           .Join(_appContext.PublicationTypes,
                           p => p.PublicationTypeId,
                           pt => pt.Id,
                           (p, pt) => new { p, pt })
                            .Where(p => (p.p.IsDeleted == null || p.p.IsDeleted == false)
                                   && p.p.PublicationId.Contains(!String.IsNullOrEmpty(publicationId) ? publicationId : p.p.PublicationId)
                                   && p.p.Description.Contains(!String.IsNullOrEmpty(description) ? description : p.p.Description)
                                   && p.p.PublicationTypeId == (publicationTypeId > 0 ? publicationTypeId : p.p.PublicationTypeId)
                                   && p.p.publishby.Contains(!String.IsNullOrEmpty(publishedBy) ? publishedBy : p.p.publishby)
                                   && p.p.employee == (!String.IsNullOrEmpty(employee) ? employee : p.p.employee)
                                   && p.p.location == (!String.IsNullOrEmpty(location) ? location : p.p.location)
                                   )
                            .Count();

                var result = _appContext.Publication
                            .Join(_appContext.PublicationTypes,
                            p => p.PublicationTypeId,
                            pt => pt.Id,
                            (p, pt) => new { p, pt })
                             .Where(p => (p.p.IsDeleted == null || p.p.IsDeleted == false)
                                    && p.p.PublicationId.Contains(!String.IsNullOrEmpty(publicationId) ? publicationId : p.p.PublicationId)
                                    && p.p.Description.Contains(!String.IsNullOrEmpty(description) ? description : p.p.Description)
                                    && p.p.PublicationTypeId== (publicationTypeId>0 ? publicationTypeId : p.p.PublicationTypeId)
                                    && p.p.publishby.Contains(!String.IsNullOrEmpty(publishedBy) ? publishedBy : p.p.publishby)
                                    && p.p.employee==(!String.IsNullOrEmpty(employee)  ? employee : p.p.employee)
                                    && p.p.location == (!String.IsNullOrEmpty(location) ? location : p.p.location)
                                    )
                             .Select(p => new
                             {
                                 PublicationRecordId = p.p.PublicationRecordId,
                                 PublicationId = p.p.PublicationId,
                                 Description = p.p.Description,
                                 PublicationTypeId = p.p.PublicationTypeId,
                                 PublicationType = p.pt.Name,
                                 Publishby = p.p.publishby,
                                 Employee = p.p.employee,
                                 Location = p.p.location,
                                 IsActive = p.p.IsActive,
                                 UpdatedDate = p.p.UpdatedDate

                             })
                             .OrderByDescending(p => p.UpdatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<Publication>();
                    foreach (var item in result)
                    {
                        publication = new Publication();
                        publication.PublicationRecordId = item.PublicationRecordId;
                        publication.PublicationId = item.PublicationId;
                        publication.Description = item.Description;
                        publication.PublicationTypeId = item.PublicationTypeId;
                        publication.PublicationType = item.PublicationType;
                        publication.publishby = item.Publishby;
                        publication.employee = item.Employee;
                        publication.location = item.Location;
                        publication.IsActive = item.IsActive;

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

        public GetData<Publication> PublicationsGlobalSearch(long? ataChapterId, long? ataSubChapterId, long? airCraftId, long? modelId, long? dashNumberId, int pageNumber, int pageSize)
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

                GetData<Publication> getData = new GetData<Publication>();
                Publication publication;
                if (ataChapterId > 0 && airCraftId > 0)
                {
                    var ataresult = _appContext.Publication
                            .Join(_appContext.PublicationTypes,
                            p => p.PublicationTypeId,
                            pt => pt.Id,
                            (p, pt) => new { p, pt })
                            .Join(_appContext.PublicationItemMasterMapping,
                            p1 => p1.p.PublicationRecordId,
                            pim => pim.PublicationRecordId,
                            (p1, pim) => new { p1, pim })
                            .Join(_appContext.ItemMasterATAMapping,
                            pim1 => pim1.pim.ItemMasterId,
                            ata => ata.ItemMasterId,
                            (pim1, ata) => new { pim1, ata })

                             .Where(p => (p.pim1.p1.p.IsDeleted == null || p.pim1.p1.p.IsDeleted == false)
                                          && p.ata.ATAChapterId == ataChapterId
                                          && p.ata.ATASubChapterId == (ataSubChapterId > 0 ? ataSubChapterId : p.ata.ATASubChapterId))
                             .Select(p => new
                             {
                                 PublicationRecordId = p.pim1.p1.p.PublicationRecordId,
                                 PublicationId = p.pim1.p1.p.PublicationId,
                                 Description = p.pim1.p1.p.Description,
                                 PublicationTypeId = p.pim1.p1.p.PublicationTypeId,
                                 PublicationType = p.pim1.p1.pt.Name,
                                 Publishby = p.pim1.p1.p.publishby,
                                 Employee = p.pim1.p1.p.employee,
                                 Location = p.pim1.p1.p.location,
                                 IsActive = p.pim1.p1.p.IsActive,
                                 UpdatedDate = p.pim1.p1.p.UpdatedDate

                             })
                             .OrderByDescending(p => p.UpdatedDate)
                             .ToList();

                    var aircraftResult = _appContext.Publication
                                .Join(_appContext.PublicationTypes,
                                p => p.PublicationTypeId,
                                pt => pt.Id,
                                (p, pt) => new { p, pt })
                                .Join(_appContext.PublicationItemMasterMapping,
                                p1 => p1.p.PublicationRecordId,
                                pim => pim.PublicationRecordId,
                                (p1, pim) => new { p1, pim })
                                .Join(_appContext.ItemMasterAircraftMapping,
                                pim1 => pim1.pim.ItemMasterId,
                                ata => ata.ItemMasterId,
                                (pim1, ata) => new { pim1, ata })

                                 .Where(p => (p.pim1.p1.p.IsDeleted == null || p.pim1.p1.p.IsDeleted == false)
                                               && p.ata.ItemMasterAircraftMappingId == airCraftId
                                               && p.ata.AircraftModelId == (modelId > 0 ? modelId : p.ata.AircraftModelId)
                                               && p.ata.DashNumberId == (dashNumberId > 0 ? dashNumberId : p.ata.DashNumberId))
                                 .Select(p => new
                                 {
                                     PublicationRecordId = p.pim1.p1.p.PublicationRecordId,
                                     PublicationId = p.pim1.p1.p.PublicationId,
                                     Description = p.pim1.p1.p.Description,
                                     PublicationTypeId = p.pim1.p1.p.PublicationTypeId,
                                     PublicationType = p.pim1.p1.pt.Name,
                                     Publishby = p.pim1.p1.p.publishby,
                                     Employee = p.pim1.p1.p.employee,
                                     Location = p.pim1.p1.p.location,
                                     IsActive = p.pim1.p1.p.IsActive,
                                     UpdatedDate = p.pim1.p1.p.UpdatedDate

                                 })
                                 .OrderByDescending(p => p.UpdatedDate)
                                 .ToList();

                  getData.TotalRecordsCount=  ataresult.
                          Join(aircraftResult,
                              ata => ata.PublicationRecordId,
                              craft => craft.PublicationRecordId,
                              (ata, craft) => new { ata, craft })
                          .Select(p => new
                          {
                              PublicationRecordId = p.ata.PublicationRecordId,
                              PublicationId = p.ata.PublicationId,
                              Description = p.ata.Description,
                              PublicationTypeId = p.ata.PublicationTypeId,
                              PublicationType = p.ata.PublicationType,
                              Publishby = p.ata.Publishby,
                              Employee = p.ata.Employee,
                              Location = p.ata.Location,
                              IsActive = p.ata.IsActive,
                              UpdatedDate = p.ata.UpdatedDate

                          })
                          .Count();

                    var result = ataresult.
                          Join(aircraftResult,
                              ata => ata.PublicationRecordId,
                              craft => craft.PublicationRecordId,
                              (ata, craft) => new { ata, craft })
                          .Select(p => new
                          {
                              PublicationRecordId = p.ata.PublicationRecordId,
                              PublicationId = p.ata.PublicationId,
                              Description = p.ata.Description,
                              PublicationTypeId = p.ata.PublicationTypeId,
                              PublicationType = p.ata.PublicationType,
                              Publishby = p.ata.Publishby,
                              Employee = p.ata.Employee,
                              Location = p.ata.Location,
                              IsActive = p.ata.IsActive,
                              UpdatedDate = p.ata.UpdatedDate

                          })
                          .Skip(skip)
                          .Take(take)
                          .ToList();

                    if (result != null && result.Count > 0)
                    {
                        foreach (var item in result)
                        {
                            publication = new Publication();
                            publication.PublicationRecordId = item.PublicationRecordId;
                            publication.PublicationId = item.PublicationId;
                            publication.Description = item.Description;
                            publication.PublicationTypeId = item.PublicationTypeId;
                            publication.PublicationType = item.PublicationType;
                            publication.publishby = item.Publishby;
                            publication.employee = item.Employee;
                            publication.location = item.Location;
                            publication.IsActive = item.IsActive;
                            getData.PaginationList.Add(publication);
                        }
                    }
                }

                else if (ataChapterId > 0)
                {
                   getData.TotalRecordsCount=  _appContext.Publication
                            .Join(_appContext.PublicationTypes,
                            p => p.PublicationTypeId,
                            pt => pt.Id,
                            (p, pt) => new { p, pt })
                            .Join(_appContext.PublicationItemMasterMapping,
                            p1 => p1.p.PublicationRecordId,
                            pim => pim.PublicationRecordId,
                            (p1, pim) => new { p1, pim })
                            .Join(_appContext.ItemMasterATAMapping,
                            pim1 => pim1.pim.ItemMasterId,
                            ata => ata.ItemMasterId,
                            (pim1, ata) => new { pim1, ata })

                             .Where(p => (p.pim1.p1.p.IsDeleted == null || p.pim1.p1.p.IsDeleted == false)
                                          && p.ata.ATAChapterId == ataChapterId
                                          && p.ata.ATASubChapterId == (ataSubChapterId > 0 ? ataSubChapterId : p.ata.ATASubChapterId))
                             .Count();


                    var ataresult = _appContext.Publication
                            .Join(_appContext.PublicationTypes,
                            p => p.PublicationTypeId,
                            pt => pt.Id,
                            (p, pt) => new { p, pt })
                            .Join(_appContext.PublicationItemMasterMapping,
                            p1 => p1.p.PublicationRecordId,
                            pim => pim.PublicationRecordId,
                            (p1, pim) => new { p1, pim })
                            .Join(_appContext.ItemMasterATAMapping,
                            pim1 => pim1.pim.ItemMasterId,
                            ata => ata.ItemMasterId,
                            (pim1, ata) => new { pim1, ata })

                             .Where(p => (p.pim1.p1.p.IsDeleted == null || p.pim1.p1.p.IsDeleted == false)
                                          && p.ata.ATAChapterId == ataChapterId
                                          && p.ata.ATASubChapterId == (ataSubChapterId > 0 ? ataSubChapterId : p.ata.ATASubChapterId))
                             .Select(p => new
                             {
                                 PublicationRecordId = p.pim1.p1.p.PublicationRecordId,
                                 PublicationId = p.pim1.p1.p.PublicationId,
                                 Description = p.pim1.p1.p.Description,
                                 PublicationTypeId = p.pim1.p1.p.PublicationTypeId,
                                 PublicationType = p.pim1.p1.pt.Name,
                                 Publishby = p.pim1.p1.p.publishby,
                                 Employee = p.pim1.p1.p.employee,
                                 Location = p.pim1.p1.p.location,
                                 IsActive = p.pim1.p1.p.IsActive,
                                 UpdatedDate = p.pim1.p1.p.UpdatedDate

                             })
                             .OrderByDescending(p => p.UpdatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();

                    if (ataresult != null && ataresult.Count > 0)
                    {
                        foreach (var item in ataresult)
                        {
                            publication = new Publication();
                            publication.PublicationRecordId = item.PublicationRecordId;
                            publication.PublicationId = item.PublicationId;
                            publication.Description = item.Description;
                            publication.PublicationTypeId = item.PublicationTypeId;
                            publication.PublicationType = item.PublicationType;
                            publication.publishby = item.Publishby;
                            publication.employee = item.Employee;
                            publication.location = item.Location;
                            publication.IsActive = item.IsActive;
                            getData.PaginationList.Add(publication);
                        }
                    }
                }
                else if (airCraftId > 0)
                {

                    getData.TotalRecordsCount = _appContext.Publication
                               .Join(_appContext.PublicationTypes,
                               p => p.PublicationTypeId,
                               pt => pt.Id,
                               (p, pt) => new { p, pt })
                               .Join(_appContext.PublicationItemMasterMapping,
                               p1 => p1.p.PublicationRecordId,
                               pim => pim.PublicationRecordId,
                               (p1, pim) => new { p1, pim })
                               .Join(_appContext.ItemMasterAircraftMapping,
                               pim1 => pim1.pim.ItemMasterId,
                               ata => ata.ItemMasterId,
                               (pim1, ata) => new { pim1, ata })

                                .Where(p => (p.pim1.p1.p.IsDeleted == null || p.pim1.p1.p.IsDeleted == false)
                                              && p.ata.ItemMasterAircraftMappingId == airCraftId
                                              && p.ata.AircraftModelId == (modelId > 0 ? modelId : p.ata.AircraftModelId)
                                              && p.ata.DashNumberId == (dashNumberId > 0 ? dashNumberId : p.ata.DashNumberId))
                                .Count();

                    var aircraftResult = _appContext.Publication
                               .Join(_appContext.PublicationTypes,
                               p => p.PublicationTypeId,
                               pt => pt.Id,
                               (p, pt) => new { p, pt })
                               .Join(_appContext.PublicationItemMasterMapping,
                               p1 => p1.p.PublicationRecordId,
                               pim => pim.PublicationRecordId,
                               (p1, pim) => new { p1, pim })
                               .Join(_appContext.ItemMasterAircraftMapping,
                               pim1 => pim1.pim.ItemMasterId,
                               ata => ata.ItemMasterId,
                               (pim1, ata) => new { pim1, ata })

                                .Where(p => (p.pim1.p1.p.IsDeleted == null || p.pim1.p1.p.IsDeleted == false)
                                              && p.ata.ItemMasterAircraftMappingId == airCraftId
                                              && p.ata.AircraftModelId == (modelId > 0 ? modelId : p.ata.AircraftModelId)
                                              && p.ata.DashNumberId == (dashNumberId > 0 ? dashNumberId : p.ata.DashNumberId))
                                .Select(p => new
                                {
                                    PublicationRecordId = p.pim1.p1.p.PublicationRecordId,
                                    PublicationId = p.pim1.p1.p.PublicationId,
                                    Description = p.pim1.p1.p.Description,
                                    PublicationTypeId = p.pim1.p1.p.PublicationTypeId,
                                    PublicationType = p.pim1.p1.pt.Name,
                                    Publishby = p.pim1.p1.p.publishby,
                                    Employee = p.pim1.p1.p.employee,
                                    Location = p.pim1.p1.p.location,
                                    IsActive = p.pim1.p1.p.IsActive,
                                    UpdatedDate = p.pim1.p1.p.UpdatedDate

                                })
                                .OrderByDescending(p => p.UpdatedDate)
                                .Skip(skip)
                                .Take(take)
                                .ToList();

                    if (aircraftResult != null && aircraftResult.Count > 0)
                    {
                        foreach (var item in aircraftResult)
                        {
                            publication = new Publication();
                            publication.PublicationRecordId = item.PublicationRecordId;
                            publication.PublicationId = item.PublicationId;
                            publication.Description = item.Description;
                            publication.PublicationTypeId = item.PublicationTypeId;
                            publication.PublicationType = item.PublicationType;
                            publication.publishby = item.Publishby;
                            publication.employee = item.Employee;
                            publication.location = item.Location;
                            publication.IsActive = item.IsActive;
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
    }
}
