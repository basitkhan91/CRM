using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    

    public interface ICapabilityTypeRepository : IRepository<DAL.Models.CapabilityType>
    {
        IEnumerable<DAL.Models.CapabilityType> GetAllCapabilityListData();
        IEnumerable<object> getAllCapesList(long id);
        object CapabilityTypeEdit(int id);
        bool CapabilityTypeStatusUpdate(int id, bool status, string updatedBy);
        bool CapabilityTypeDelete(int id, string updatedBy);
        IEnumerable<object> GetAllCapabilityTypeDataAudit(int capabilityTypeId);



    }
}
