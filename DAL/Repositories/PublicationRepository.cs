﻿
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

        public IEnumerable<object> GetPubPNMappingData(string PNIds)
        {
            string[] myPNids = PNIds.Split(',').Select(n => n).ToArray();
            var data = (from iM in _appContext.PublicationItemMasterMapping
                        where myPNids.Contains(iM.PartNumber)
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


    }
}
