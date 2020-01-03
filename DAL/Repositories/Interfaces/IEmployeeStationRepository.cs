using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeStationRepository : IRepository<EmployeeStation>
    {
        IEnumerable<object> GetAllEmployeeStationData(bool isActive);
        object EmployeeStationEdit(long id);
        bool EmployeeStationStatusUpdate(long id, bool status, string updatedBy);
        bool EmployeeStationDelete(long id, string updatedBy);
        IEnumerable<object> GetAllEmployeeStationDataAudit(long stationId);
    }
}
