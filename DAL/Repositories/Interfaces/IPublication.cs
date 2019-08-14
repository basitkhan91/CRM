using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IPublication : IRepository<DAL.Models.Publication>
    {
        IEnumerable<DAL.Models.Publication> GetPublications();
        IEnumerable<object> GetPubPNMappingData(string id);
        IEnumerable<object> GetAircraftMappingDataById(long Publicationid);
        IEnumerable<object> GetATAMappingDataById(long Publicationid);
        IEnumerable<object> GetAircraftMappingDataByMultiTypeId(long PublicationID, string AircraftTypeId);
        IEnumerable<object> GetAircraftMappingDataByMultiModelId(long PublicationID, string AircraftModelID);
        IEnumerable<object> GetAircraftMappingDataByMultiDashId(long PublicationID, string DashNumberId);
        IEnumerable<object> GetAircraftMappingDataByMultiTypeIdModelID(long PublicationId, string AircraftTypeID, string AircraftModelID);
        IEnumerable<object> GetAircraftMappingDataByMultiTypeIdModelIDDashID(long PublicationId, string AircraftTypeID, string AircraftModelID, string DashNumberId);

    }
}
