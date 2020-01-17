using DAL.Common;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IEmployee : IRepository<DAL.Models.Employee>
    {
        IEnumerable<object> GetEmployeeList(Filters<EmployeeFilters> employeeFilters);
        IEnumerable<object> EmployeeGlobalSearch(string filterText, int pageNumber, int pageSize);
        object EmployeeDetailsById(long employeeId);
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
        IEnumerable<object> EmpoyeeManagementStructure(List<EmployeeManagementStructure> objEmployeeManagementStructure);
        IEnumerable<object> GetEmpoyeeManagementStructure(long employeeId);
        IEnumerable<object> GetEmployeeAuditHistoryData(long employeeId);
    }
}
