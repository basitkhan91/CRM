using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    

    public interface ICapabilityTypeRepository : IRepository<DAL.Models.CapabilityType>
    {
        IEnumerable<DAL.Models.CapabilityType> GetAllCapabilityListData();


        //  void CreateAction(DAL.Models.Action action);

    }
}
