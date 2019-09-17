using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerAircraftMapping : IRepository<DAL.Models.CustomerAircraftMapping>
    {
        IEnumerable<DAL.Models.CustomerAircraftMapping> GetCustomerAircraftMappings();
    }
}