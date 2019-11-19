using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployee : IRepository<DAL.Models.Employee>
    {
        IEnumerable<object> GetAllEmployeeData();

        IEnumerable<object> GetEMployeelicensuerDetails(long employeeId);
        IEnumerable<object> GetEmpTariningDetails(long id);
        //IEnumerable<object> employeeshiftData(long id);
        IEnumerable<object> getEmployeeLeaveData(long id);
        IEnumerable<object> getEmployeeShiftData(long id);
        List<Employee> getAllEmployeeInfo();
        object GetEmployeeData(long employeeId);
        IEnumerable<object> EmployeeUserRole(List<EmployeeUserRole> objEmployeeUserRoles);
        IEnumerable<object> GetEmployeeUserRole(long employeeId);
    }
}
