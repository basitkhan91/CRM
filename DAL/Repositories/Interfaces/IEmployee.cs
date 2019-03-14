using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployee:IRepository<DAL.Models.Employee>
    {
        IEnumerable<Employee> GetAllEmployeeData();
       
        IEnumerable<object> GetEMployeelicensuerDetails(long employeeId);
        IEnumerable<object> GetEmpTariningDetails(long id);
        IEnumerable<object> employeeshiftData(long id);
        IEnumerable<object> getEmployeeLeaveData(long id);
        IEnumerable<object> getEmployeeShiftData(long id);
    }
}
