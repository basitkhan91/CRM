using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeLeaveTypeMappingRepository : IRepository<DAL.Models.EmployeeLeaveTypeMapping>
    {
        IEnumerable<DAL.Models.EmployeeLeaveTypeMapping> GetAllData();

    }
}
