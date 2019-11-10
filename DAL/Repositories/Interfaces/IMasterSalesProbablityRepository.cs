using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IMasterSalesProbablityRepository
    {
        IEnumerable<DAL.Models.MasterSalesProbablity> GetAll();
    }
}
