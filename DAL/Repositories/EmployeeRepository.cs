using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class EmployeeRepository : Repository<DAL.Models.Employee>, IEmployee
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.Employee> GetAllEmployeeData()
        {
            var empData = _appContext.Employee.Include("EmployeeShiftMapping").ToList().Where(t => t.IsDelete == null || t.IsDelete == false);
            return empData;
        }


        public IEnumerable<object> GetEMployeelicensuerDetails(long employeeId)
        {

            {
                var data = (

                    from t in _appContext.EmployeeLicensure

                        //join ad in _appContext.EmployeeShift on t.EmployeeId equals ad.EmployeeId into pt

                        //from ad in pt.DefaultIfEmpty()


                    where t.EmployeeId == employeeId
                    // select new { t, ad, vt }).ToList();
                    select new
                    {
                        t
                    }).ToList();
                return data;

            }

        }
        public IEnumerable<object> GetEmpTariningDetails(long employeeId)
        {

            {
                var data = (from t in _appContext.EmployeeTraining.Include("EmployeeTrainingType")
                                // join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                // join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId

                            where t.EmployeeId == employeeId
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t,


                            }).ToList();
                return data;

            }

        }

        //public IEnumerable<object> employeeshiftData(long id)
        //{

        //    {
        //        var data = (from iM in _appContext.EmployeeShift
        //                    where iM.EmployeeId == id

        //                    select new
        //                    {
        //                        iM.EmployeeShiftId,
        //                        iM.EmployeeId,
        //                        iM.ShiftId,
        //                        iM.IsActive


        //                    }).ToList();
        //        return data;
        //    }
        //}

        public IEnumerable<object> getEmployeeLeaveData(long id)
        {
            {
                var data = (from iM in _appContext.EmployeeLeaveTypeMapping
                            where iM.EmployeeId == id

                            select new
                            {
                                iM.EmployeeLeaveTypeMappingId,
                                iM.EmployeeId,
                                iM.EmployeeLeaveTypeId,
                                iM.IsActive


                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getEmployeeShiftData(long id)
        {
            {
                var data = (from iM in _appContext.EmployeeShiftMapping
                            where iM.EmployeeId == id

                            select new
                            {
                                iM.EmployeeShiftMappingId,
                                iM.EmployeeId,
                                iM.ShiftId,
                                iM.IsActive


                            }).ToList();
                return data;
            }
        }

        public List<Employee> getAllEmployeeInfo()
        {
            var employees = _appContext.Employee.Select(x =>
                new Employee
                {
                    EmployeeId = x.EmployeeId,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    MiddleName = x.MiddleName
                }
            ).ToList();
            return employees;
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
