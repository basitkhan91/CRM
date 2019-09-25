using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IPublication : IRepository<DAL.Models.Publication>
    {
        Publication GetPublicationsById(long id);
        IEnumerable<object> GetPubPNMappingData(string id);
        IEnumerable<object> GetAircraftMappingDataById(long Publicationid);
        IEnumerable<object> GetATAMappingDataById(long Publicationid);
        IEnumerable<object> GetAircraftMappingDataByMultiTypeId(long PublicationID, string AircraftTypeId);
        IEnumerable<object> GetAircraftMappingDataByMultiModelId(long PublicationID, string AircraftModelID);
        IEnumerable<object> GetAircraftMappingDataByMultiDashId(long PublicationID, string DashNumberId);
        IEnumerable<object> GetAircraftMappingDataByMultiTypeIdModelID(long PublicationId, string AircraftTypeID, string AircraftModelID);
        IEnumerable<object> GetAircraftMappingDataByMultiTypeIdModelIDDashID(long PublicationId, string AircraftTypeID, string AircraftModelID, string DashNumberId);
        IEnumerable<object> GetATAMappingDataByMultiATAIdSUBATAID(long PublicationId, string ATAChapterID, string SubATAChapterID);
        IEnumerable<object> GetATAMappingDataByMultiATAId(long PublicationId, string ATAChapterID);
        IEnumerable<object> GetATAMappingDataByMultiSubChapterId(long PublicationId, string SubATAChapterID);
        IEnumerable<object> searchgetAircraftMappingDataByMultiTypeIdModelIDDashID(long PublicationId, string aircraftTypeID, string aircraftModelID, string dashNumberId);
        IEnumerable<object> searchGetATAMappingDataByMultiATAIdSUBATAID(long PublicationId, string ATAChapterID, string SubATAChapterID);

        GetData<PublicationsList> GetPublicationsList(string publicationId, string description, int? publicationTypeId, string publishedBy, long employeeId, string location, int pageNumber, int pageSize);
        GetData<PublicationsList> PublicationsGlobalSearch(long? ataChapterId, long? ataSubChapterId, long? airCraftId, long? modelId, long? dashNumberId, int pageNumber, int pageSize);
        object PublicationView(long publicationRecordId);



    }
}
