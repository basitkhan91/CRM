using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IDepartment : IRepository<DAL.Models.Department>
    {
        IEnumerable<DAL.Models.Department> GetAllDepartmentData();
   

    }
}