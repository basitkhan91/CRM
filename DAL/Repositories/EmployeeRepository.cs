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

        public IEnumerable<object> GetAllEmployeeData()
        {

            //var empData = _appContext.Employee.Include("EmployeeShiftMapping").ToList().Where(t => t.IsDelete == null || t.IsDelete == false);
            var empData = (from t in _appContext.Employee


                           join orgCountries in _appContext.Countries on t.OriginatingCountryId equals orgCountries.countries_id into cre
                           from orgCountries in cre.DefaultIfEmpty()

                           join nationalCountryId in _appContext.Countries on t.NationalityCountryId equals nationalCountryId.countries_id into nationalCounty
                           from nationalCountryId in nationalCounty.DefaultIfEmpty()

                           join managementStructeInfo in _appContext.ManagementStructure on t.ManagementStructureId equals managementStructeInfo.ManagementStructureId into managmentCompany
                           from managementStructeInfo in managmentCompany.DefaultIfEmpty()
                        
                           join employeeExpertise in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals employeeExpertise.EmployeeExpertiseId into employeeExpertiseInfos
                           from employeeExpertise in employeeExpertiseInfos.DefaultIfEmpty()

                           join jobtype in _appContext.JobType on t.JobTypeId equals jobtype.JobTypeId into jobTypeInfos
                           from jobtype in jobTypeInfos.DefaultIfEmpty()





                           where t.IsDelete == false || t.IsDelete == null
                           // select new { t, ad, vt }).ToList();
                           select new
                           {
                               t.EmployeeId,
                               t.FirstName,
                               t.LastName,
                               t.MiddleName,
                               t.EmployeeIdAsPerPayroll,
                               t.StationId,
                               t.JobTitleId,
                               t.JobTypeId,
                               t.EmployeeExpertiseId,
                               t.DateOfBirth,
                               t.OriginatingCountryId,
                               t.NationalityCountryId,
                               t.StartDate,
                               // cc,
                               t.EmployeeCode,
                               t.MobilePhone,
                               t.WorkPhone,
                               orgCountries,
                               nationalCountryId,
                               managementStructeInfo,
                               employeeExpertise,
                               jobtype,
                               t.Fax,
                               t.Email,
                               t.SSN,

                               t.InMultipleShifts,
                               t.AllowOvertime,
                               t.AllowDoubleTime,

                               t.IsHourly,
                               t.HourlyPay,
                               t.EmployeeCertifyingStaff,
                               t.EmployeeLeaveTypeId,
                               t.SupervisorId,
                               t.MasterCompanyId,
                               t.IsDelete,
                               t.ManagementStructureId,
                               t.MasterCompany,
                               t.IsActive,
                               t.CreatedDate,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.UpdatedDate,

                               //cc.Description
                           }).ToList();





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

        public object GetEmployeeData(long employeeId)
        {
            try
            {
                var data = (from emp in _appContext.Employee
                            where emp.EmployeeId == employeeId
                            select new
                            {
                                FirstName = emp.FirstName,
                                LastName = emp.LastName,
                                MiddleName = emp.MiddleName,
                                EmployeeCode = emp.EmployeeCode,
                                Email = emp.Email
                            }).FirstOrDefault();

                return data;
            }

            catch (Exception)
            {

                throw;
            }
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
