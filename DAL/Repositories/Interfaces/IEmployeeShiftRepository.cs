using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeShiftRepository : IRepository<DAL.Models.EmployeeShiftMapping>
    {
        IEnumerable<DAL.Models.EmployeeShiftMapping> GetAllData();

    }
}
