using AutoMapper;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
namespace QuickApp.Pro.Controllers
{


    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private IUnitOfWork _unitOfWork;

        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        private const string GetActionByIdActionName = "GetActionById";

        public EmployeeController(ApplicationDbContext context, IUnitOfWork unitOfWork, ILogger<EmployeeController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }


        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult Get()
        {
            var allEmployeeinfo = _unitOfWork.employee.GetAllEmployeeData(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("GetAllEmployeeInfo")]
        public List<Employee> getAllEmployeeInfo()
        {
            var employees = _unitOfWork.employee.getAllEmployeeInfo();
            return employees;

        }

        [HttpGet("GetforView/{employeeId}")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public Object GetforView(long employeeId)
        {
            var allEmployeeinfo = _context.Employee.Include("EmployeeLicensure").Include("EmployeeTraining").
              Include("EmployeeLeaveTypeMapping").Include("EmployeeShiftMapping").Where(a => a.EmployeeId == employeeId).ToList();
            return allEmployeeinfo;


        }

        [HttpGet("RolesGet")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult RolesGet()
        {
            var allEmployeeinfo = _context.UIRoleEntity.OrderByDescending(a => a.UIRoleEntityId).ToList(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("UserRolelevelList")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult UserRolelevelList()
        {
            var allEmployeeinfo = _context.UserRoleLevel.OrderByDescending(a => a.UserRoleLevelId).ToList(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("shiftGet")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult Getshift()
        {
            var allEmployeeinfo = _unitOfWork.shift.Getshift(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("CountriesGet")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult GetCountries()
        {
            var allEmployeeinfo = _unitOfWork.Countries.GetCountries(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("EmployeeTrainingTypeGet")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult GetemployeeTrainingType()
        {
            var allEmployeeinfo = _unitOfWork.EmployeeTrainingType.GetAllEmployeeTrainingType(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("EmployeeLeaveTypeGet")]
        [Produces(typeof(List<EmployeeLeaveTypeViewModel>))]
        public IActionResult GetEmployeeLeaveType()
        {
            var allEmployeeinfo = _unitOfWork.EmployeeLeaveType.GetAllEmployeeLeaveTypeData(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("empTrainingTypesGet")]
        [Produces(typeof(List<EmployeeTrainingType>))]
        public IActionResult empTrainingTypesGet()
        {
            var allEmployeeinfo = _unitOfWork.EmployeeTrainingType.GetAllEmployeeTrainingType(); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("EmpTrainingGet/{id}")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult EmpTrainingGet(long id)
        {
            var allEmployeeinfo = _unitOfWork.employee.GetEmpTariningDetails(id); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("employeecertificationpost/{id}")]
        [Produces(typeof(List<EmployeeViewModel>))]
        public IActionResult employeecertificationpost(long id)
        {
            var allEmployeeinfo = _unitOfWork.employee.GetEMployeelicensuerDetails(id); //.GetAllCustomersData();
            return Ok(allEmployeeinfo);

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Employee", id); //.GetAllCustomersData();
            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);
                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("employeepost")]
        public IActionResult CreateAction([FromBody] EmployeeViewModel employeeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (employeeViewModel == null)
                    return BadRequest($"{nameof(employeeViewModel)} cannot be null");
                var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == employeeViewModel.ManagementStructureId).SingleOrDefault();
                DAL.Models.Employee employeeobject = new DAL.Models.Employee();

                employeeobject.MasterCompanyId = 1;
                employeeobject.IsActive = true;
                employeeobject.FirstName = employeeViewModel.FirstName;
                employeeobject.LastName = employeeViewModel.LastName;
                employeeobject.MiddleName = employeeViewModel.MiddleName;
                employeeobject.MobilePhone = employeeViewModel.MobilePhone;
                employeeobject.JobTitleId = employeeViewModel.JobTitleId;
                employeeobject.JobTypeId = employeeViewModel.JobTypeId;
                employeeobject.EmployeeIdAsPerPayroll = employeeViewModel.EmployeeIdAsPerPayroll;
                employeeobject.StationId = employeeViewModel.StationId;
                employeeobject.EmployeeExpertiseId = employeeViewModel.EmployeeExpertiseId;


                employeeobject.DateOfBirth = employeeViewModel.DateOfBirth;
                employeeobject.OriginatingCountryId = employeeViewModel.OriginatingCountryId;
                employeeobject.NationalityCountryId = employeeViewModel.NationalityCountryId;
                employeeobject.StartDate = employeeViewModel.StartDate;
                employeeobject.WorkPhone = employeeViewModel.WorkPhone;
                employeeobject.Fax = employeeViewModel.Fax;
                employeeobject.ManagementStructureId = employeeViewModel.ManagementStructureId;
                if(entityobject != null && entityobject.LegalEntityId != null)
                {
                    employeeobject.LegalEntityId = entityobject.LegalEntityId;
                }
                else
                {
                    var legalEntityobject = _context.LegalEntity.OrderByDescending(p => p.LegalEntityId).FirstOrDefault();
                    employeeobject.LegalEntityId = legalEntityobject.LegalEntityId;
                }


                employeeobject.SSN = employeeViewModel.SSN;
                employeeobject.Email = employeeViewModel.Email;
                employeeobject.AllowDoubleTime = employeeViewModel.AllowDoubleTime;
                employeeobject.AllowOvertime = employeeViewModel.AllowOvertime;
                employeeobject.InMultipleShifts = employeeViewModel.InMultipleShifts;
                employeeobject.SupervisorId = employeeViewModel.SupervisorId;
                employeeobject.IsHourly = employeeViewModel.IsHourly;
                employeeobject.HourlyPay = employeeViewModel.HourlyPay;
                employeeobject.SupervisorId = employeeViewModel.SupervisorId;
                employeeobject.EmployeeCertifyingStaff = employeeViewModel.EmployeeCertifyingStaff;
                employeeobject.CreatedDate = DateTime.Now;
                employeeobject.UpdatedDate = DateTime.Now;
                employeeobject.CreatedBy = employeeViewModel.CreatedBy;
                employeeobject.UpdatedBy = employeeViewModel.UpdatedBy;
                employeeobject.Memo = employeeViewModel.Memo;

                employeeobject.CurrencyId = employeeViewModel.CurrencyId;

                if(employeeViewModel.IsHeWorksInShop == null)
                {
                    employeeobject.IsHeWorksInShop = false;
                }
                else
                {
                    employeeobject.IsHeWorksInShop = employeeViewModel.IsHeWorksInShop;
                }
               

                _unitOfWork.employee.Add(employeeobject);
                _unitOfWork.SaveChanges();

                long? empGeneratedId = employeeobject.EmployeeId;

                long? empId = empGeneratedId;


                var existingResult = _unitOfWork.employee.GetSingleOrDefault(c => c.EmployeeId == employeeobject.EmployeeId);

                existingResult.EmployeeCode = "EMP" + employeeobject.EmployeeId;
                _unitOfWork.employee.Update(existingResult);

                _unitOfWork.SaveChanges();



                return Ok(employeeobject);
            }
            return Ok(ModelState);
        }

        //employees leave type adding

        [HttpPost("employeepostAddLeaveType")]
        public IActionResult employeepostAddLeaveType([FromBody] EmployeeViewModel employeetypeViewModel)
        {

            if (employeetypeViewModel == null)
                return BadRequest($"{nameof(employeetypeViewModel)} cannot be null");
            DAL.Models.EmployeeLeaveTypeMapping integrationTypes = new DAL.Models.EmployeeLeaveTypeMapping();
            integrationTypes.EmployeeLeaveTypeId = employeetypeViewModel.LeaveTypeId;
            integrationTypes.MasterCompanyId = 1;
            // integrationTypes.EmployeeId = empId;
            //integrationTypes.EmployeeId = aarayEmpid;
            //  integrationTypes2.EmployeeId = ShiftaarayEmpid;
            integrationTypes.JobTypeId = employeetypeViewModel.JobTypeId;
            integrationTypes.EmployeeId = employeetypeViewModel.EmployeeId;
            integrationTypes.CreatedBy = employeetypeViewModel.CreatedBy;
            integrationTypes.UpdatedBy = employeetypeViewModel.UpdatedBy;
            integrationTypes.CreatedDate = DateTime.Now;
            integrationTypes.UpdatedDate = DateTime.Now;

            integrationTypes.IsActive = true;
            _unitOfWork.EmployeeLeaveTypeMappingRepository.Add(integrationTypes);
            _unitOfWork.SaveChanges();

            return Ok(integrationTypes);
        }

        [HttpPost("employeepostRemoveLeaveType")]
        public IActionResult employeepostRemoveLeaveType([FromBody] EmployeeViewModel employeetypeViewModel)
        {

            if (employeetypeViewModel == null)
                return BadRequest($"{nameof(employeetypeViewModel)} cannot be null");
            DAL.Models.EmployeeShiftMapping integrationTypes = new DAL.Models.EmployeeShiftMapping();
            var x = (from y in _appContext.EmployeeLeaveTypeMapping

                     where y.EmployeeId == employeetypeViewModel.EmployeeId && y.EmployeeLeaveTypeId == employeetypeViewModel.LeaveTypeId
                     orderby y.EmployeeId descending
                     select y).FirstOrDefault();

            _appContext.EmployeeLeaveTypeMapping.Remove(x);
            _appContext.SaveChanges();

            integrationTypes.ShiftId = employeetypeViewModel.ShiftTypeId;
            integrationTypes.MasterCompanyId = 1;
            return Ok(integrationTypes);
        }

        [HttpPost("employeepostAddShiftType")]
        public IActionResult employeepostAddShiftType([FromBody] EmployeeViewModel employeetypeViewModel)
        {

            if (employeetypeViewModel == null)
                return BadRequest($"{nameof(employeetypeViewModel)} cannot be null");
            DAL.Models.EmployeeShiftMapping integrationTypes = new DAL.Models.EmployeeShiftMapping();
            // integrationTypes.EmployeeId = empId;
            //integrationTypes.EmployeeId = aarayEmpid;
            integrationTypes.ShiftId = employeetypeViewModel.ShiftTypeId;
            integrationTypes.MasterCompanyId = 1;
            //  integrationTypes2.EmployeeId = ShiftaarayEmpid;
            integrationTypes.JobTypeId = employeetypeViewModel.JobTypeId;
            integrationTypes.EmployeeId = employeetypeViewModel.EmployeeId;
            integrationTypes.CreatedBy = employeetypeViewModel.CreatedBy;
            integrationTypes.UpdatedBy = employeetypeViewModel.UpdatedBy;
            integrationTypes.CreatedDate = DateTime.Now;
            integrationTypes.UpdatedDate = DateTime.Now;
            integrationTypes.IsActive = true;
            _unitOfWork.EmployeeShiftMappingRepository.Add(integrationTypes);
            _unitOfWork.SaveChanges();

            return Ok(integrationTypes);
        }

        [HttpPost("employeepostRemoveShiftType")]
        public IActionResult employeepostRemoveShiftType([FromBody] EmployeeViewModel employeetypeViewModel)
        {

            if (employeetypeViewModel == null)
                return BadRequest($"{nameof(employeetypeViewModel)} cannot be null");
            DAL.Models.EmployeeShiftMapping integrationTypes = new DAL.Models.EmployeeShiftMapping();
            var x = (from y in _appContext.EmployeeShiftMapping

                     where y.EmployeeId == employeetypeViewModel.EmployeeId && y.ShiftId == employeetypeViewModel.ShiftTypeId
                     orderby y.EmployeeId descending
                     select y).FirstOrDefault();

            _appContext.EmployeeShiftMapping.Remove(x);
            _appContext.SaveChanges();

            integrationTypes.ShiftId = employeetypeViewModel.ShiftTypeId;
            integrationTypes.MasterCompanyId = 1;
            return Ok(integrationTypes);
        }



        [HttpPut("employeelistgpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] EmployeeViewModel employeeViewModel)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine("This is C#" + employeeViewModel.IsHourly);
                if (employeeViewModel == null)
                    return BadRequest($"{nameof(EmployeeViewModel)} cannot be null");
                var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == employeeViewModel.ManagementStructureId).SingleOrDefault();
                var existingResult = _unitOfWork.employee.GetSingleOrDefault(c => c.EmployeeId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = employeeViewModel.UpdatedBy;
                existingResult.FirstName = employeeViewModel.FirstName;
                existingResult.MobilePhone = employeeViewModel.MobilePhone;
                existingResult.LastName = employeeViewModel.LastName;
                existingResult.MiddleName = employeeViewModel.MiddleName;
                existingResult.EmployeeIdAsPerPayroll = employeeViewModel.EmployeeIdAsPerPayroll;
                existingResult.StationId = employeeViewModel.StationId;
                existingResult.JobTitleId = employeeViewModel.JobTitleId;
                existingResult.JobTypeId = employeeViewModel.JobTypeId;
                existingResult.EmployeeExpertiseId = employeeViewModel.EmployeeExpertiseId;
                existingResult.DateOfBirth = employeeViewModel.DateOfBirth;
                existingResult.OriginatingCountryId = employeeViewModel.OriginatingCountryId;
                existingResult.NationalityCountryId = employeeViewModel.NationalityCountryId;
                existingResult.StartDate = employeeViewModel.StartDate;
                existingResult.WorkPhone = employeeViewModel.WorkPhone;
                existingResult.Fax = employeeViewModel.Fax;
                existingResult.SSN = employeeViewModel.SSN;
                existingResult.Email = employeeViewModel.Email;
                existingResult.AllowDoubleTime = employeeViewModel.AllowDoubleTime;
                existingResult.AllowOvertime = employeeViewModel.AllowOvertime;
                existingResult.InMultipleShifts = employeeViewModel.InMultipleShifts;
                existingResult.IsHourly = employeeViewModel.IsHourly;
                existingResult.HourlyPay = employeeViewModel.HourlyPay;
                existingResult.ManagementStructureId = employeeViewModel.ManagementStructureId;
                //existingResult.LegalEntityId = entityobject.LegalEntityId;
                existingResult.SupervisorId = employeeViewModel.SupervisorId;
                existingResult.EmployeeCertifyingStaff = employeeViewModel.EmployeeCertifyingStaff;
                existingResult.MasterCompanyId = 1;
                existingResult.Memo = employeeViewModel.Memo;
                existingResult.CurrencyId = employeeViewModel.CurrencyId;

                if (entityobject != null && entityobject.LegalEntityId != null)
                {
                    existingResult.LegalEntityId = entityobject.LegalEntityId;
                }                

                if (employeeViewModel.IsHeWorksInShop == null)
                {
                    existingResult.IsHeWorksInShop = false;
                }
                else
                {
                    existingResult.IsHeWorksInShop = employeeViewModel.IsHeWorksInShop;
                }

                if (employeeViewModel.EmployeeLeaveTypeId != null)
                {
                    var integrationList = _unitOfWork.EmployeeLeaveTypeMappingRepository.GetAllData().ToList();
                    integrationList.Where(a => a.EmployeeId == id).ToList().ForEach(a => _unitOfWork.EmployeeLeaveTypeMappingRepository.Remove(a));
                    _unitOfWork.SaveChanges();
                    foreach (string s in employeeViewModel.EmployeeLeaveTypeId)
                    {
                        if (s != "")
                        {
                            var integrationTypes = new EmployeeLeaveTypeMapping();
                            integrationTypes.EmployeeLeaveTypeId = Convert.ToByte(s);
                            integrationTypes.EmployeeId = id;
                            integrationTypes.MasterCompanyId = 1;
                            integrationTypes.CreatedBy = employeeViewModel.CreatedBy;
                            integrationTypes.UpdatedBy = employeeViewModel.UpdatedBy;
                            integrationTypes.CreatedDate = DateTime.Now;
                            integrationTypes.UpdatedDate = DateTime.Now;
                            integrationTypes.IsActive = true;
                            _unitOfWork.EmployeeLeaveTypeMappingRepository.Add(integrationTypes);
                            _unitOfWork.SaveChanges();
                        }
                    }
                }

                if (employeeViewModel.ShiftId != null)
                {
                    var integrationList = _unitOfWork.EmployeeShiftMappingRepository.GetAllData().ToList();
                    integrationList.Where(a => a.EmployeeId == id).ToList().ForEach(a => _unitOfWork.EmployeeShiftMappingRepository.Remove(a));
                    _unitOfWork.SaveChanges();
                    foreach (string s in employeeViewModel.ShiftId)
                    {
                        if (s != "")
                        {
                            var integrationTypes = new EmployeeShiftMapping();
                            integrationTypes.ShiftId = Convert.ToByte(s);
                            integrationTypes.EmployeeId = id;
                            integrationTypes.MasterCompanyId = 1;
                            integrationTypes.CreatedBy = employeeViewModel.CreatedBy;
                            integrationTypes.UpdatedBy = employeeViewModel.UpdatedBy;
                            integrationTypes.CreatedDate = DateTime.Now;
                            integrationTypes.UpdatedDate = DateTime.Now;
                            integrationTypes.IsActive = true;
                            //  _unitOfWork.EmployeeShiftMappingRepository.Add(integrationTypes);
                            //    _unitOfWork.SaveChanges();
                            return Ok(integrationTypes);
                        }

                    }
                }
                _unitOfWork.employee.Update(existingResult);

                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }

        [HttpPut("employeeupdatememo")]
        public IActionResult EmployeeUpdateAction(long employyeId, string memo)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(memo))
            {              
                try
                {                   
                    var existingResult = _unitOfWork.employee.GetSingleOrDefault(c => c.EmployeeId == employyeId);
                    existingResult.Memo = memo;
                    _unitOfWork.employee.Update(existingResult);
                    _unitOfWork.SaveChanges();
                    result = true;
                }
                catch (Exception)
                {
                    throw;
                }                
               
            }
            return Ok(result);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult addEmployeeShiftDetails([FromBody] long employeeid, int shifid, EmployeeViewModel employeeViewModel)
        {
            EmployeeShiftMapping employeeLicensureViewModel = new EmployeeShiftMapping();

            if (ModelState.IsValid)
            {
                if (employeeLicensureViewModel == null)
                    return BadRequest($"{nameof(employeeLicensureViewModel)} cannot be null");
                DAL.Models.EmployeeShiftMapping employeeobject = new DAL.Models.EmployeeShiftMapping();
                employeeobject.MasterCompanyId = 1;

                employeeobject.IsActive = employeeLicensureViewModel.IsActive;
                employeeobject.EmployeeId = employeeid;
                employeeobject.ShiftId = shifid;
                employeeobject.CreatedBy = employeeViewModel.CreatedBy;
                employeeobject.UpdatedBy = employeeViewModel.UpdatedBy;


                employeeobject.CreatedDate = DateTime.Now;
                employeeobject.UpdatedDate = DateTime.Now;

                employeeobject.UpdatedBy = employeeLicensureViewModel.UpdatedBy;
                _unitOfWork.EmployeeShiftMappingRepository.Add(employeeobject);
                _unitOfWork.SaveChanges();
                return Ok(employeeobject);
            }
            return Ok(ModelState);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult updateShiftDetials([FromBody] long employeeid, int shifid, EmployeeViewModel employeeViewModel)
        {
            EmployeeShiftMapping employeeLicensureViewModel = new EmployeeShiftMapping();

            if (ModelState.IsValid)
            {
                var employeeobject = _unitOfWork.EmployeeShiftMappingRepository.GetSingleOrDefault(a => a.EmployeeId == employeeid);
                if (Convert.ToBoolean(employeeobject.EmployeeShiftMappingId))
                {
                    employeeobject.MasterCompanyId = 1;

                    employeeobject.IsActive = employeeLicensureViewModel.IsActive;
                    employeeobject.EmployeeId = employeeid;
                    employeeobject.ShiftId = shifid;
                    employeeobject.CreatedBy = employeeViewModel.CreatedBy;
                    employeeobject.UpdatedBy = employeeViewModel.UpdatedBy;


                    employeeobject.CreatedDate = DateTime.Now;
                    employeeobject.UpdatedDate = DateTime.Now;

                    employeeobject.UpdatedBy = employeeLicensureViewModel.UpdatedBy;
                    _unitOfWork.EmployeeShiftMappingRepository.Add(employeeobject);
                    _unitOfWork.SaveChanges();
                    return Ok(employeeobject);
                }





            }
            return Ok(ModelState);
        }

        [HttpPost("newLeavepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] EmployeeLeaveTypeViewModel employeeLeaveTypeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (employeeLeaveTypeViewModel == null)
                    return BadRequest($"{nameof(employeeLeaveTypeViewModel)} cannot be null");

                DAL.Models.EmployeeLeaveType jobTitleObj = new DAL.Models.EmployeeLeaveType();
                jobTitleObj.Description = employeeLeaveTypeViewModel.Description;
                jobTitleObj.IsActive = true;
                _unitOfWork.EmployeeLeaveType.Add(jobTitleObj);
                _unitOfWork.SaveChanges();
                return Ok(jobTitleObj);

            }

            return Ok(ModelState);
        }

        [HttpPut("newLeavepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] EmployeeLeaveTypeViewModel employeeLeaveTypeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (employeeLeaveTypeViewModel == null)
                    return BadRequest($"{nameof(employeeLeaveTypeViewModel)} cannot be null");

                var existingResult = _unitOfWork.EmployeeLeaveType.GetSingleOrDefault(c => c.EmployeeLeaveTypeId == id);
                existingResult.Description = employeeLeaveTypeViewModel.Description;
                existingResult.IsActive = employeeLeaveTypeViewModel.IsActive;
                _unitOfWork.EmployeeLeaveType.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }

        [HttpGet("getleavelistdata/{id}")]
        [Produces(typeof(List<EmployeeLeaveTypeViewModel>))]
        public IActionResult getleavelistdata(int id)
        {
            var leaves = _unitOfWork.EmployeeLeaveType.GetAllEmployeeLeaveTypeData(); //.GetAllCustomersData();
            return Ok(leaves);
        }


        [HttpPost("saveShifts")]
        public IActionResult createmultishifts([FromBody] EmployeeShiftMappingViewModel employeeShiftMappingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.EmployeeShiftMapping.Any(o => o.ShiftId == employeeShiftMappingViewModel.ShiftId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresule = _context.EmployeeShiftMapping.Where(c => c.EmployeeShiftMappingId == employeeShiftMappingViewModel.ShiftId).FirstOrDefault();
                    existingresule.EmployeeShiftMappingId = employeeShiftMappingViewModel.ShiftId;

                    existingresule.EmployeeId = employeeShiftMappingViewModel.EmployeeId;
                    existingresule.CreatedBy = employeeShiftMappingViewModel.CreatedBy;
                    existingresule.UpdatedBy = employeeShiftMappingViewModel.UpdatedBy;
                    existingresule.MasterCompanyId = 1;
                    existingresule.CreatedDate = DateTime.Now;
                    existingresule.UpdatedDate = DateTime.Now;
                    _context.EmployeeShiftMapping.Update(existingresule);
                    _context.SaveChanges();
                }
                else
                {
                    EmployeeShiftMapping cp = new EmployeeShiftMapping();
                    cp.ShiftId = employeeShiftMappingViewModel.ShiftId;
                    cp.EmployeeId = employeeShiftMappingViewModel.EmployeeId;
                    cp.MasterCompanyId = 1;
                    cp.CreatedBy = employeeShiftMappingViewModel.CreatedBy;
                    cp.UpdatedBy = employeeShiftMappingViewModel.UpdatedBy;
                    cp.CreatedDate = DateTime.Now;
                    cp.UpdatedDate = DateTime.Now;
                    _context.EmployeeShiftMapping.Add(cp);
                    _context.SaveChanges();
                }
            }
            return Ok(employeeShiftMappingViewModel);
            // return Ok(ModelState);
        }



        [HttpPost("saveLeavelist")]
        public IActionResult saveLeavelist([FromBody]  EmployeeLeaveTypeViewModel employeeShiftViewModel)
        {

            if (ModelState.IsValid)
            {
                if (employeeShiftViewModel == null)
                    return BadRequest($"{nameof(employeeShiftViewModel)} cannot be null");
                EmployeeLeaveType employeeshiftObj = new EmployeeLeaveType();
                employeeshiftObj.EmployeeLeaveTypeId = employeeShiftViewModel.EmployeeLeaveTypeId;
                employeeshiftObj.IsActive = employeeShiftViewModel.IsActive;
                _unitOfWork.EmployeeLeaveType.Add(employeeshiftObj);
                _unitOfWork.SaveChanges();
                return Ok(employeeshiftObj);
            }

            return Ok(ModelState);
        }


        //[HttpPost("employeecertifi")]
        //public IActionResult CreateCertificationAction([FromBody] EmployeeLicensureViewModel employeeLicensureViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        if (employeeLicensureViewModel == null)
        //            return BadRequest($"{nameof(employeeLicensureViewModel)} cannot be null");
        //        DAL.Models.EmployeeLicensure employeeobject = new DAL.Models.EmployeeLicensure();

        //        employeeobject.MasterCompanyId = 1;
        //        employeeobject.IsActive = true;
        //        employeeobject.EmployeeId = employeeLicensureViewModel.EmployeeId;
        //        employeeobject.CertificationDate = employeeLicensureViewModel.CertificationDate;
        //        employeeobject.CertifyingInstitution = employeeLicensureViewModel.CertifyingInstitution;
        //        employeeobject.LicenseNumber = employeeLicensureViewModel.LicenseNumber;
        //        employeeobject.EmployeeId = employeeLicensureViewModel.EmployeeId;
        //        employeeobject.IsLicenseInForce = employeeLicensureViewModel.IsLicenseInForce;
        //        employeeLicensureViewModel.EmployeeLicenseTypeId = employeeLicensureViewModel.EmployeeLicenseTypeId;
        //        employeeobject.CreatedDate = DateTime.Now;
        //        employeeobject.UpdatedDate = DateTime.Now;
        //        employeeobject.UpdatedBy = employeeLicensureViewModel.UpdatedBy;
        //        _unitOfWork.employeeLicensure.Add(employeeobject);
        //        _unitOfWork.SaveChanges();
        //        return Ok(employeeobject);
        //    }
        //    return Ok(ModelState);
        //}

        [HttpPost("employeecertifi")]
        public IActionResult CreateCertificationAction([FromBody] EmployeeLicensureViewModel employeeLicensureViewModel)
        {
            if (ModelState.IsValid)
            {
                if (employeeLicensureViewModel == null)
                    return BadRequest($"{nameof(employeeLicensureViewModel)} cannot be null");
                DAL.Models.EmployeeLicensure employeeobject = new DAL.Models.EmployeeLicensure();

                employeeobject.MasterCompanyId = 1;
                employeeobject.IsActive = true;
                employeeobject.EmployeeId = employeeLicensureViewModel.EmployeeId;
                employeeobject.CertificationDate = employeeLicensureViewModel.CertificationDate;
                employeeobject.ExpirationDate = employeeLicensureViewModel.ExpirationDate;
                employeeobject.IsExpirationDate = employeeLicensureViewModel.IsExpirationDate;
                employeeobject.CertifyingInstitution = employeeLicensureViewModel.CertifyingInstitution;
                employeeobject.LicenseNumber = employeeLicensureViewModel.LicenseNumber;
                employeeobject.EmployeeId = employeeLicensureViewModel.EmployeeId;
                employeeobject.IsLicenseInForce = employeeLicensureViewModel.IsLicenseInForce;
                employeeobject.EmployeeLicenseTypeId = employeeLicensureViewModel.EmployeeLicenseTypeId;
                //  employeeobject.EmployeeLicenseTypeId = 10;
                employeeobject.CreatedBy = employeeLicensureViewModel.UpdatedBy;
                employeeobject.CreatedBy = employeeLicensureViewModel.UpdatedBy;
                employeeobject.CreatedDate = DateTime.Now;
                employeeobject.UpdatedDate = DateTime.Now;
                employeeobject.UpdatedBy = employeeLicensureViewModel.UpdatedBy;
                // employeeobject.ExpirationDate = DateTime.Now;
                //  employeeobject.IsExpirationDate = false;

                _unitOfWork.employeeLicensure.Add(employeeobject);
                _unitOfWork.SaveChanges();
                return Ok(employeeobject);
            }
            return Ok(ModelState);
        }

        [HttpPut("certifilistgpost/{id}")]
        public IActionResult UpdateCertificationAction(long id, [FromBody] EmployeeLicensureViewModel employeeLicensureViewModel)
        {

            if (ModelState.IsValid)
            {
                if (employeeLicensureViewModel == null)
                    return BadRequest($"{nameof(EmployeeLicensureViewModel)} cannot be null");
                var existingResult = _unitOfWork.employeeLicensure.GetSingleOrDefault(c => c.EmployeeLicensureId == id);

                existingResult.MasterCompanyId = 1;
                existingResult.IsActive = employeeLicensureViewModel.IsActive;
                existingResult.CertificationDate = employeeLicensureViewModel.CertificationDate;
                existingResult.CertifyingInstitution = employeeLicensureViewModel.CertifyingInstitution;
                existingResult.EmployeeId = employeeLicensureViewModel.EmployeeId;
                existingResult.LicenseNumber = employeeLicensureViewModel.LicenseNumber;
                existingResult.EmployeeLicenseTypeId = employeeLicensureViewModel.EmployeeLicenseTypeId;
                existingResult.IsLicenseInForce = employeeLicensureViewModel.IsLicenseInForce;
                existingResult.IsExpirationDate = employeeLicensureViewModel.IsExpirationDate;
                existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = employeeLicensureViewModel.UpdatedBy;
                _unitOfWork.employeeLicensure.Update(existingResult);
                _unitOfWork.SaveChanges();
                return Ok(existingResult);
            }
            return Ok(ModelState);
        }


        [HttpPost("employeetraingpost")]
        public IActionResult TraingAction([FromBody] EmployeeTrainingViewModel employeeTrainingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (employeeTrainingViewModel == null)
                    return BadRequest($"{nameof(employeeTrainingViewModel)} cannot be null");
                DAL.Models.EmployeeTraining employeeobject = new DAL.Models.EmployeeTraining();

                employeeobject.MasterCompanyId = employeeTrainingViewModel.MasterCompanyId;
                employeeobject.IsActive = true;
                employeeobject.AircraftModelId = employeeTrainingViewModel.AircraftModelId;
                employeeobject.EmployeeTrainingTypeId = employeeTrainingViewModel.EmployeeTrainingTypeId;
                employeeobject.ScheduleDate = employeeTrainingViewModel.ScheduleDate;
                employeeobject.EmployeeId = employeeTrainingViewModel.EmployeeId;
                employeeobject.FrequencyOfTraining = employeeTrainingViewModel.FrequencyOfTraining;
                employeeobject.CompletionDate = employeeTrainingViewModel.CompletionDate;
                employeeobject.Provider = employeeTrainingViewModel.Provider;
                employeeobject.Cost = employeeTrainingViewModel.Cost;
                employeeobject.Duration = employeeTrainingViewModel.Duration;
                employeeobject.IndustryCode = employeeTrainingViewModel.IndustryCode;
                employeeobject.ExpirationDate = employeeTrainingViewModel.ExpirationDate;
                employeeobject.UnitOfMeasureId = employeeTrainingViewModel.UnitOfMeasureId;
                employeeobject.CreatedBy = employeeTrainingViewModel.CreatedBy;
                employeeobject.FrequencyOfTrainingId = employeeTrainingViewModel.FrequencyOfTrainingId;
             
               

                employeeobject.CreatedDate = DateTime.Now;
                employeeobject.UpdatedDate = DateTime.Now;

                employeeobject.UpdatedBy = employeeTrainingViewModel.UpdatedBy;
                _unitOfWork.employeeTraining.Add(employeeobject);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }


        [HttpPut("traininglistgpost/{id}")]
        public IActionResult UpdateTrainingAction(long id, [FromBody] EmployeeTrainingViewModel employeeTrainingViewModel)
        {

            if (ModelState.IsValid)
            {
                if (employeeTrainingViewModel == null)
                    return BadRequest($"{nameof(EmployeeTrainingViewModel)} cannot be null");
                var existingResult = _unitOfWork.employeeTraining.GetSingleOrDefault(c => c.EmployeeTrainingId == id);

                existingResult.MasterCompanyId = employeeTrainingViewModel.MasterCompanyId;
                // existingResult.IsActive = employeeTrainingViewModel.IsActive;
                existingResult.AircraftModelId = employeeTrainingViewModel.AircraftModelId;
                existingResult.EmployeeTrainingTypeId = employeeTrainingViewModel.EmployeeTrainingTypeId;
                existingResult.ScheduleDate = employeeTrainingViewModel.ScheduleDate;

                existingResult.FrequencyOfTraining = employeeTrainingViewModel.FrequencyOfTraining;
                existingResult.CompletionDate = employeeTrainingViewModel.CompletionDate;
                existingResult.Provider = employeeTrainingViewModel.Provider;
                existingResult.Cost = employeeTrainingViewModel.Cost;
                existingResult.Duration = employeeTrainingViewModel.Duration;
                existingResult.IndustryCode = employeeTrainingViewModel.IndustryCode;
                existingResult.ExpirationDate = employeeTrainingViewModel.ExpirationDate;
                existingResult.UnitOfMeasureId = employeeTrainingViewModel.UnitOfMeasureId;
                //existingResult.CreatedDate = DateTime.Now;
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = employeeTrainingViewModel.UpdatedBy;

                existingResult.FrequencyOfTrainingId = employeeTrainingViewModel.FrequencyOfTrainingId;
                _unitOfWork.employeeTraining.Update(existingResult);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }

        [HttpPost("savemultileavetypes")]
        public IActionResult createmultiLeaves([FromBody] EmployeeLeaveTypeMappingViewModel employeeLeaveTypeMappingViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.EmployeeLeaveTypeMapping.Any(o => o.EmployeeLeaveTypeId == employeeLeaveTypeMappingViewModel.EmployeeLeaveTypeId))
                {
                    // return BadRequest($"{nameof(capesInfoViewModel)} cannot be null");
                    var existingresule = _context.EmployeeLeaveTypeMapping.Where(c => c.EmployeeLeaveTypeId == employeeLeaveTypeMappingViewModel.EmployeeLeaveTypeId).FirstOrDefault();
                    existingresule.EmployeeLeaveTypeId = employeeLeaveTypeMappingViewModel.EmployeeLeaveTypeId;

                    existingresule.EmployeeId = employeeLeaveTypeMappingViewModel.EmployeeId;
                    existingresule.CreatedBy = employeeLeaveTypeMappingViewModel.CreatedBy;
                    existingresule.UpdatedBy = employeeLeaveTypeMappingViewModel.UpdatedBy;
                    existingresule.MasterCompanyId = 1;
                    existingresule.CreatedDate = DateTime.Now;
                    existingresule.UpdatedDate = DateTime.Now;
                    _context.EmployeeLeaveTypeMapping.Update(existingresule);
                    _context.SaveChanges();
                }
                else
                {
                    EmployeeLeaveTypeMapping cp = new EmployeeLeaveTypeMapping();
                    cp.EmployeeLeaveTypeId = employeeLeaveTypeMappingViewModel.EmployeeLeaveTypeId;
                    cp.EmployeeId = employeeLeaveTypeMappingViewModel.EmployeeId;
                    cp.MasterCompanyId = 1;
                    cp.CreatedBy = employeeLeaveTypeMappingViewModel.CreatedBy;
                    cp.UpdatedBy = employeeLeaveTypeMappingViewModel.UpdatedBy;
                    cp.CreatedDate = DateTime.Now;
                    cp.UpdatedDate = DateTime.Now;
                    _context.EmployeeLeaveTypeMapping.Add(cp);
                    _context.SaveChanges();
                }
            }
            return Ok(employeeLeaveTypeMappingViewModel);
            // return Ok(ModelState);
        }

        [HttpGet("GetLeaveData/{id}")]
        [Produces(typeof(List<EmployeeLeaveTypeMappingViewModel>))]
        public IActionResult integrationGet(int id)
        {
            var employeeleaveType = _unitOfWork.employee.getEmployeeLeaveData(id); //.GetAllCustomersData();
            return Ok(employeeleaveType);

        }


        [HttpGet("getshiftdata/{id}")]
        [Produces(typeof(List<EmployeeShiftMappingViewModel>))]
        public IActionResult getShift(int id)
        {
            var employeeleaveType = _unitOfWork.employee.getEmployeeShiftData(id);
            return Ok(employeeleaveType);

        }



        [HttpPut("employeeUpdateforActive/{id}")]
        public IActionResult customersUpdateforActive(long id, [FromBody]EmployeeViewModel employee)
        {
            if (ModelState.IsValid)
            {
                var Empobi = _unitOfWork.employee.GetSingleOrDefault(a => a.EmployeeId == id);
                employee.MasterCompanyId = 1;
                Empobi.IsActive = employee.IsActive;
                Empobi.UpdatedDate = DateTime.Now;
                Empobi.UpdatedBy = employee.UpdatedBy;
                Empobi.EmployeeId = employee.EmployeeId;
                _unitOfWork.employee.Update(Empobi);
                _unitOfWork.SaveChanges();
                return Ok(Empobi);
            }

            return Ok(ModelState);
        }


        [HttpPut("employeepost/{id}")]
        [Produces(typeof(EmployeeViewModel))]
        public IActionResult EmpDeleteAction(long id, [FromBody]EmployeeViewModel employee)
        {
            var existingResult = _unitOfWork.employee.GetSingleOrDefault(c => c.EmployeeId == id);
            existingResult.IsDeleted = true;

            _unitOfWork.employee.Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpPost("AddRolesData")]
        public IActionResult AddRolesData([FromBody] UserRoleLevelEntityViewModel uirolelevEntity)
        {
            var existingobj = _context.UserRoleLevelEntity.Where(a => a.UserRoleLevelId == uirolelevEntity.UserRoleLevelId).ToList();

            if (existingobj.Count > 0)
            {
                for (var i = 0; i < existingobj.Count; i++)
                {
                    _context.UserRoleLevelEntity.Remove(existingobj[i]);
                    _context.SaveChanges();
                }

            }
            //if (ModelState.IsValid)
            //{
            //    if (uirolelevEntity == null)
            //        return BadRequest($"{nameof(uirolelevEntity)} cannot be null");
            //    if (uirolelevEntity.isAdd == true)
            //    {
            //        DAL.Models.UserRoleLevelEntity employeeobject = new DAL.Models.UserRoleLevelEntity();
            //        employeeobject.MasterCompanyId = uirolelevEntity.MasterCompanyId;
            //        employeeobject.IsActive = uirolelevEntity.IsActive;
            //        employeeobject.UserRoleLevelId = uirolelevEntity.UserRoleLevelId;
            //        employeeobject.UIRoleEntityId = uirolelevEntity.UIRoleEntityId;
            //        employeeobject.PermittedEditActionId =1;

            //        employeeobject.CreatedDate = DateTime.Now;
            //        employeeobject.UpdatedDate = DateTime.Now;

            //        employeeobject.UpdatedBy = uirolelevEntity.UpdatedBy;
            //        _context.UserRoleLevelEntity.Add(employeeobject);
            //        _context.SaveChanges();
            //    }

            //    if (uirolelevEntity.isViewed == true)
            //    {
            //        DAL.Models.UserRoleLevelEntity employeeobject1 = new DAL.Models.UserRoleLevelEntity();
            //        employeeobject1.MasterCompanyId = uirolelevEntity.MasterCompanyId;
            //        employeeobject1.IsActive = uirolelevEntity.IsActive;
            //        employeeobject1.UserRoleLevelId = uirolelevEntity.UserRoleLevelId;
            //        employeeobject1.UIRoleEntityId = uirolelevEntity.UIRoleEntityId;
            //        employeeobject1.PermittedEditActionId = 6;

            //        employeeobject1.CreatedDate = DateTime.Now;
            //        employeeobject1.UpdatedDate = DateTime.Now;

            //        employeeobject1.UpdatedBy = uirolelevEntity.UpdatedBy;
            //        _context.UserRoleLevelEntity.Add(employeeobject1);
            //        _context.SaveChanges();
            //    }
            //     if (uirolelevEntity.isUpdate == true)
            //    {
            //        DAL.Models.UserRoleLevelEntity employeeobject2 = new DAL.Models.UserRoleLevelEntity();

            //        employeeobject2.MasterCompanyId = uirolelevEntity.MasterCompanyId;
            //        employeeobject2.IsActive = uirolelevEntity.IsActive;
            //        employeeobject2.UserRoleLevelId = uirolelevEntity.UserRoleLevelId;
            //        employeeobject2.UIRoleEntityId = uirolelevEntity.UIRoleEntityId;
            //        employeeobject2.PermittedEditActionId = 2;

            //        employeeobject2.CreatedDate = DateTime.Now;
            //        employeeobject2.UpdatedDate = DateTime.Now;

            //        employeeobject2.UpdatedBy = uirolelevEntity.UpdatedBy;
            //        _context.UserRoleLevelEntity.Add(employeeobject2);
            //        _context.SaveChanges();
            //    }
            //    if (uirolelevEntity.isDelete == true)
            //    {
            //        DAL.Models.UserRoleLevelEntity employeeobject3 = new DAL.Models.UserRoleLevelEntity();

            //        employeeobject3.MasterCompanyId = uirolelevEntity.MasterCompanyId;
            //        employeeobject3.IsActive = uirolelevEntity.IsActive;
            //        employeeobject3.UserRoleLevelId = uirolelevEntity.UserRoleLevelId;
            //        employeeobject3.UIRoleEntityId = uirolelevEntity.UIRoleEntityId;
            //        employeeobject3.PermittedEditActionId = 3;

            //        employeeobject3.CreatedDate = DateTime.Now;
            //        employeeobject3.UpdatedDate = DateTime.Now;

            //        employeeobject3.UpdatedBy = uirolelevEntity.UpdatedBy;
            //        _context.UserRoleLevelEntity.Add(employeeobject3);
            //        _context.SaveChanges();
            //    }

            //    return Ok(ModelState);
            //}
            return Ok(ModelState);
        }
        //    [HttpDelete("employeepost/{id}")]
        //    [Produces(typeof(EmployeeViewModel))]
        //    public IActionResult DeleteAction(long id)
        //    {
        //        var existingResult = _unitOfWork.Employee.GetSingleOrDefault(c => c.employeeId == id);
        //        existingResult.IsDelete = true;
        //        _unitOfWork.Employee.Update(existingResult);

        //        //_unitOfWork.ActionAttribute.Remove(existingResult);

        //        _unitOfWork.SaveChanges();

        //        return Ok(id);
        //    }


        [HttpGet("employeedata/{employeeId}")]
        public IActionResult GetEmployeeData(long employeeId)
        {
            var result = _unitOfWork.employee.GetEmployeeData(employeeId);
            return Ok(result);

        }

        /// <summary>
        /// To Save Employee user multiple roles
        /// </summary>
        /// <param name="objEmployeeUserRoles"></param>
        /// <returns></returns>
        [HttpPost("employeeroles")]
        public IActionResult EmpoyeeUserRole([FromBody]List<EmployeeUserRole> objEmployeeUserRoles)
        {
            var result = _unitOfWork.employee.EmployeeUserRole(objEmployeeUserRoles);
            return Ok(result);
        }

        /// <summary>
        /// To Get Employee roles based in employeeId
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet("getEmployeeRoles")]
        public IActionResult GetEmpoyeeUserRole(long employeeId)
        {
            var result = _unitOfWork.employee.GetEmployeeUserRole(employeeId);
            return Ok(result);
        }

        /// <summary>
        /// To save Employee management structure
        /// </summary>
        /// <param name="objEmployeeManagementStructure"></param>
        /// <returns></returns>
        [HttpPost("employeeManagementStructure")]
        public IActionResult EmpoyeeManagementStructure([FromBody]List<EmployeeManagementStructure> objEmployeeManagementStructure)
        {
            var result = _unitOfWork.employee.EmpoyeeManagementStructure(objEmployeeManagementStructure);
            return Ok(result);
        }

        /// <summary>
        /// To get management structure based on employeeid
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet("getemployeeManagementStructure")]
        public IActionResult GetEmpoyeeManagementStructure(long employeeId)
        {
            var result = _unitOfWork.employee.GetEmpoyeeManagementStructure(employeeId);
            return Ok(result);
        }

        [HttpGet("GetEmployeeAuditHistory/{employeeId}")]        
        public IActionResult GetEmployeeAuditHistoryByEmployeeId(long employeeId)
        {
            var result = _unitOfWork.employee.GetEmployeeAuditHistoryData(employeeId);
            return Ok(result);
        }

        [HttpPost("employeeDocumentUpload")]
        [Produces("application/json")]
        public IActionResult EmployeeDocumentUploadAction()
        {
            try
            {
                Attachment objAttachment = new Attachment();
              
                if (ModelState.IsValid)
                {
                    if (Request.Form == null)
                        return BadRequest($"{nameof(objAttachment)} cannot be null");
                    objAttachment.MasterCompanyId = 1;
                    objAttachment.UpdatedBy = Request.Form["UpdatedBy"];
                    objAttachment.ReferenceId = Convert.ToInt64(Request.Form["EmployeeId"]);
                    //objAttachment.ModuleId= Convert.ToInt32(Request.Form["ModuleId"]);
                    //string moduleName = Request.Form["ModuleName"];
                   

                    if (objAttachment.ReferenceId > 0)
                    {
                        var attachmentData = _context.Attachment.Where(p => p.ReferenceId == objAttachment.ReferenceId && p.ModuleId == Convert.ToInt32(ModuleEnum.Employee)).FirstOrDefault();

                        if (attachmentData != null)
                        {
                            objAttachment.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objAttachment.ReferenceId,
                                                         Convert.ToInt32(ModuleEnum.Employee), Convert.ToString(ModuleEnum.Employee), objAttachment.UpdatedBy, objAttachment.MasterCompanyId, attachmentData.AttachmentId);


                        }
                        else
                        {
                            objAttachment.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objAttachment.ReferenceId,
                                                                       Convert.ToInt32(ModuleEnum.Employee), Convert.ToString(ModuleEnum.Employee), objAttachment.UpdatedBy, objAttachment.MasterCompanyId);

                        }

                    }

                    return Ok(objAttachment);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}