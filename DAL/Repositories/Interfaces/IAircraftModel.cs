using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IAircraftModel : IRepository<DAL.Models.AircraftModel>
    {
        //IEnumerable<DAL.Models.AircraftModel> GetAllAircraftModelData();


        IEnumerable<object> GetAllAircraftModelData(string id);

        IEnumerable<object> GetSelectedAircraftModeldata(long id);
        IEnumerable<object> GetCapesWithMasterid(long id);
    }
}
