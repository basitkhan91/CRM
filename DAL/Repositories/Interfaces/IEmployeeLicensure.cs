using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployeeLicensure : IRepository<DAL.Models.EmployeeLicensure>
    {
        IEnumerable<EmployeeLicensure> GetAllEmployeeLicensureData();
    }
}

