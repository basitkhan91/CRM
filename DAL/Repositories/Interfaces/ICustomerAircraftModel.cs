using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface ICustomerAircraftModel : IRepository<DAL.Models.CustomerAircraftModel>
    {
        IEnumerable<DAL.Models.CustomerAircraftModel> GetAllData();
        IEnumerable<object> GetSelectedAircraftModeldata(long id);

        //  void CreateAction(DAL.Models.Action action);

    }
}
