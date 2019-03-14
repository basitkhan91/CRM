using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface ICustomerAircraftType : IRepository<DAL.Models.CustomerAircraftType>
    {
        IEnumerable<DAL.Models.CustomerAircraftType> GetAllData();




    }
}
