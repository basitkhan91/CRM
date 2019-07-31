using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IPublication : IRepository<DAL.Models.Publication>
    {
        IEnumerable<DAL.Models.Publication> GetPublications();
        IEnumerable<object> GetDashNoByID(string Mid,long Tid);

        IEnumerable<object> GetATASUBS(long ChID);

        //  void CreateAction(DAL.Models.Action action);
        IEnumerable<object> GetPublicationAircraftList();
    }
}
