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
    }
}
