using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeLicenseType : IRepository<DAL.Models.EmployeeLicenseType>
    {
        IEnumerable<EmployeeLicenseType> GetEmployeeLicenseType();
    }
}

