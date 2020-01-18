using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Repositories
{
    public class EmployeeRepository : Repository<DAL.Models.Employee>, IEmployee
    {
        //private ICommonRepository commonRepository;
        private List<long> ManagementStructureIds = new List<long>();
        private static Dictionary<string, string> keyValues = new Dictionary<string, string>();

        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {
            
        }

        public IEnumerable<object> GetEmployeeList(Common.Filters<EmployeeFilters> employeeFilters)
        {
            if (employeeFilters.filters == null)
                employeeFilters.filters = new EmployeeFilters();
            var pageNumber = employeeFilters.first + 1;
            var pageSize = employeeFilters.rows;
            string sortColumn = string.Empty;

            short statusId = 2;
            var sorts = new Sorts<EmployeeFilters>();
            var filters = new EntityFrameworkPaginate.Filters<EmployeeFilters>();



            if (string.IsNullOrEmpty(employeeFilters.SortField))
            {
                sortColumn = "CreatedDate";
                employeeFilters.SortOrder = -1;
                sorts.Add(sortColumn == "CreatedDate", x => x.CreatedDate, true);
            }
            else
            {
                sortColumn = employeeFilters.SortField;
            }

            var propertyInfo = typeof(EmployeeFilters).GetProperty(sortColumn);

            if (employeeFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            if (!string.IsNullOrEmpty(employeeFilters.filters.Status))
            {
                if (employeeFilters.filters.Status.ToLower() == "inactive")
                {
                    statusId = 0;
                }
                else if (employeeFilters.filters.Status.ToLower() == "active")
                {
                    statusId = 1;
                }
                else
                {
                    statusId = 2;
                }

            }


            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.EmployeeCode), x => x.EmployeeCode.Contains(employeeFilters.filters.EmployeeCode));
            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.FirstName), x => x.FirstName.Contains(employeeFilters.filters.FirstName));
            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.LastName), x => x.LastName.Contains(employeeFilters.filters.LastName));
            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.Jobtitle), x => x.Jobtitle.Contains(employeeFilters.filters.Jobtitle));
            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.EmployeeExpertise), x => x.EmployeeExpertise.Contains(employeeFilters.filters.EmployeeExpertise));
            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.Company), x => x.Company.Contains(employeeFilters.filters.Company));
            filters.Add(!string.IsNullOrEmpty(employeeFilters.filters.Paytype), x => x.Paytype.Contains(employeeFilters.filters.Paytype));
            filters.Add(statusId == 2, x => x.IsActive == x.IsActive);
            filters.Add(statusId == 1, x => x.IsActive == true);
            filters.Add(statusId == 0, x => x.IsActive == false);

            var totalRecords = (from t in _appContext.Employee
                                join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                                from ee in eed.DefaultIfEmpty()

                                join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                                from jot in jotd.DefaultIfEmpty()

                                join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                                from mle in mainCompanyTree.DefaultIfEmpty()

                                join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                                from divmle in mainDivCompany.DefaultIfEmpty()

                                join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                                from biumle in BIUDivCompany.DefaultIfEmpty()

                                join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                                from compmle in comivCompany.DefaultIfEmpty()

                                where( t.IsDeleted == false || t.IsDeleted == null)
                                 //&& t.StartDate == (employeeFilters.filters.StartDate != null ? employeeFilters.filters.StartDate : t.StartDate)

                                select new EmployeeFilters()
                                {
                                    EmployeeId = Convert.ToInt64(t.EmployeeId),
                                    EmployeeCode = t.EmployeeCode,
                                    FirstName = t.FirstName,
                                    LastName = t.LastName,
                                    Jobtitle = jot.Description,
                                    EmployeeExpertise = ee.Description,
                                    StartDate = t.StartDate,
                                    IsActive = t.IsActive,
                                    CreatedDate = t.CreatedDate,
                                    Company = GetManagementStrucreCodeByName(t.ManagementStructureId, "Level1"),
                                    Paytype = Convert.ToBoolean(t.IsHourly) ? "Hourly" : "Yearly",                                                                       
                                }).Distinct().Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

            var list = (from t in _appContext.Employee
                        join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                        from ee in eed.DefaultIfEmpty()

                        join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                        from jot in jotd.DefaultIfEmpty()

                        join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                        from mle in mainCompanyTree.DefaultIfEmpty()

                        join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                        from divmle in mainDivCompany.DefaultIfEmpty()

                        join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                        from biumle in BIUDivCompany.DefaultIfEmpty()

                        join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                        from compmle in comivCompany.DefaultIfEmpty()

                        where (t.IsDeleted == false || t.IsDeleted == null)
                         //&& t.StartDate == (employeeFilters.filters.StartDate != null ? employeeFilters.filters.StartDate : t.StartDate)

                        select new EmployeeFilters()
                        {
                            EmployeeId = Convert.ToInt64(t.EmployeeId),
                            EmployeeCode = t.EmployeeCode,
                            FirstName = t.FirstName,
                            LastName = t.LastName,
                            Jobtitle = jot.Description,
                            EmployeeExpertise = ee.Description,
                            StartDate = t.StartDate,
                            IsActive = t.IsActive,
                            CreatedDate = t.CreatedDate,
                            //managmentLegalEntityName = mle.Name,
                            //divmanagmentLegalEntityName = divmle.Name,
                            //biumanagmentLegalEntityName = biumle.Name,
                            //compmanagmentLegalEntityName = compmle.Name,     
                            Company= GetManagementStrucreCodeByName(t.ManagementStructureId, "Level1"),
                            Paytype = Convert.ToBoolean(t.IsHourly) ? "Hourly" : "Yearly",
                            TotalRecords= totalRecords


                        }).Distinct().Paginate(pageNumber, pageSize, sorts, filters).Results;



            return list;



        }


        public IEnumerable<object> EmployeeGlobalSearch(string filterText, int pageNumber, int pageSize)
        {
            var take = pageSize;
            var skip = take * (pageNumber);

            if (!string.IsNullOrEmpty(filterText))
            {

                var totalRecords = (from t in _appContext.Employee
                                    join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                                    from ee in eed.DefaultIfEmpty()

                                    join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                                    from jot in jotd.DefaultIfEmpty()

                                    join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                                    from mle in mainCompanyTree.DefaultIfEmpty()

                                    join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                                    from divmle in mainDivCompany.DefaultIfEmpty()

                                    join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                                    from biumle in BIUDivCompany.DefaultIfEmpty()

                                    join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                                    from compmle in comivCompany.DefaultIfEmpty()

                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                     && (t.FirstName.Contains(filterText)
                                      || t.LastName.Contains(filterText)
                                      || t.EmployeeCode.Contains(filterText)
                                      || jot.Description.Contains(filterText)
                                      || ee.Description.Contains(filterText))                           
                                    select new EmployeeFilters()
                                    {
                                        EmployeeId = Convert.ToInt64(t.EmployeeId),                                       
                                    }).Distinct().Count();

                var list = (from t in _appContext.Employee
                            join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                            from ee in eed.DefaultIfEmpty()

                            join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                            from jot in jotd.DefaultIfEmpty()

                            join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                            from mle in mainCompanyTree.DefaultIfEmpty()

                            join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                            from divmle in mainDivCompany.DefaultIfEmpty()

                            join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                            from biumle in BIUDivCompany.DefaultIfEmpty()

                            join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                            from compmle in comivCompany.DefaultIfEmpty()

                            where (t.IsDeleted == false || t.IsDeleted == null)
                             && (t.FirstName.Contains(filterText)
                                      || t.LastName.Contains(filterText)
                                      || t.EmployeeCode.Contains(filterText)
                                      || jot.Description.Contains(filterText)
                                      || ee.Description.Contains(filterText))

                            select new EmployeeFilters()
                            {
                                EmployeeId = Convert.ToInt64(t.EmployeeId),
                                EmployeeCode = t.EmployeeCode,
                                FirstName = t.FirstName,
                                LastName = t.LastName,
                                Jobtitle = jot.Description,
                                EmployeeExpertise = ee.Description,
                                StartDate = t.StartDate,
                                IsActive = t.IsActive,
                                CreatedDate = t.CreatedDate,                                   
                                Company = mle.Name,
                                Paytype = Convert.ToBoolean(t.IsHourly) ? "Hourly" : "Yearly",
                                TotalRecords = totalRecords


                            }).Distinct().OrderByDescending(p => p.CreatedDate)
                              .Skip(skip)
                              .Take(take)
                              .ToList();



                return list;

                
            }
            else
            {
                var totalRecords = (from t in _appContext.Employee
                                    join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                                    from ee in eed.DefaultIfEmpty()

                                    join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                                    from jot in jotd.DefaultIfEmpty()

                                    join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                                    from mle in mainCompanyTree.DefaultIfEmpty()

                                    join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                                    from divmle in mainDivCompany.DefaultIfEmpty()

                                    join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                                    from biumle in BIUDivCompany.DefaultIfEmpty()

                                    join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                                    from compmle in comivCompany.DefaultIfEmpty()

                                    where (t.IsDeleted == false || t.IsDeleted == null)
                                    select new EmployeeFilters()
                                    {
                                        EmployeeId = Convert.ToInt64(t.EmployeeId)                                    
                                    }).Distinct().Count();

                var list = (from t in _appContext.Employee
                            join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                            from ee in eed.DefaultIfEmpty()

                            join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                            from jot in jotd.DefaultIfEmpty()

                            join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                            from mle in mainCompanyTree.DefaultIfEmpty()

                            join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                            from divmle in mainDivCompany.DefaultIfEmpty()

                            join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                            from biumle in BIUDivCompany.DefaultIfEmpty()

                            join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                            from compmle in comivCompany.DefaultIfEmpty()

                            where t.IsDeleted == false || t.IsDeleted == null

                            select new EmployeeFilters()
                            {
                                EmployeeId = Convert.ToInt64(t.EmployeeId),
                                EmployeeCode = t.EmployeeCode,
                                FirstName = t.FirstName,
                                LastName = t.LastName,
                                Jobtitle = jot.Description,
                                EmployeeExpertise = ee.Description,
                                StartDate = t.StartDate,
                                IsActive = t.IsActive,
                                CreatedDate = t.CreatedDate,
                                Company = mle.Name,
                                Paytype = Convert.ToBoolean(t.IsHourly) ? "Hourly" : "Yearly",
                                TotalRecords = totalRecords


                            }).Distinct().OrderByDescending(p => p.CreatedDate)
                              .Skip(skip)
                              .Take(take)
                              .ToList();



                return list;
            }

        }


        private string GetManagementStrucreCodeByName(long? managementStructureId, string keyName)
        {
            string returnValue = string.Empty;

            if (managementStructureId != null)
            {
                if (Array.IndexOf(ManagementStructureIds.ToArray(), managementStructureId) < 0)
                {
                    ManagementStructureIds.Add(Convert.ToInt64(managementStructureId));
                    keyValues = GetManagementStructureCodes(Convert.ToInt64(managementStructureId));
                }

                if (keyValues.ContainsKey(keyName))
                {
                    returnValue = keyValues[keyName];
                }
            }
            return returnValue;
        }
        public Dictionary<string, string> GetManagementStructureCodes(long manmgStrucId)
        {
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            ManagementStructure level4 = null;
            ManagementStructure level3 = null;
            ManagementStructure level2 = null;
            ManagementStructure level1 = null;
            try
            {
                level4 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == manmgStrucId).FirstOrDefault();
                if (level4 != null && level4.ParentId > 0)
                {
                    level3 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level4.ParentId).FirstOrDefault();
                }
                if (level3 != null && level3.ParentId > 0)
                {
                    level2 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level3.ParentId).FirstOrDefault();
                }
                if (level2 != null && level2.ParentId > 0)
                {
                    level1 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level2.ParentId).FirstOrDefault();
                }


                if (level4 != null && level3 != null && level2 != null && level1 != null)
                {
                    keyValuePairs.Add("Level4", level4.Code);
                    keyValuePairs.Add("Level3", level3.Code);
                    keyValuePairs.Add("Level2", level2.Code);
                    keyValuePairs.Add("Level1", level1.Code);
                }
                else if (level4 != null && level2 != null && level3 != null)
                {
                    keyValuePairs.Add("Level3", level4.Code);
                    keyValuePairs.Add("Level2", level3.Code);
                    keyValuePairs.Add("Level1", level2.Code);
                }
                else if (level4 != null && level3 != null)
                {
                    keyValuePairs.Add("Level2", level4.Code);
                    keyValuePairs.Add("Level1", level3.Code);
                }
                else if (level4 != null)
                {
                    keyValuePairs.Add("Level1", level4.Code);
                }
                return keyValuePairs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
                

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

                           join jobtitle in _appContext.JobTitle on t.JobTitleId equals jobtitle.JobTitleId into jobTitleInfos
                           from jobtitle in jobTitleInfos.DefaultIfEmpty()

                           join managmentLegalEntity in _appContext.ManagementStructure on t.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                           from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()

                           join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                           from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()

                           join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                           from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()

                           join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                           from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()

                               //join empSupervisor in _appContext.Employee on t.EmployeeId  equals empSupervisor.SupervisorId into employeesupervisiorInfo
                               // from empSupervisor in employeesupervisiorInfo.DefaultIfEmpty()



                           join employeetraingInfo in _appContext.EmployeeTraining on t.EmployeeId equals employeetraingInfo.EmployeeId into employeeTraingInfo
                           from employeetraingInfo in employeeTraingInfo.DefaultIfEmpty()

                           join employeetraingType in _appContext.EmployeeTrainingType on employeetraingInfo.EmployeeTrainingTypeId equals employeetraingType.EmployeeTrainingTypeId into employeeTraingTypeInfo
                           from employeetraingType in employeeTraingTypeInfo.DefaultIfEmpty()





                           where (t.IsDeleted == false || t.IsDeleted == null) && t.IsActive == true
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


                               // empSupervisor,
                               jobtitle,
                               //jobtype,
                               t.Fax,
                               t.Email,
                               t.SSN,

                               //legal entrities

                               managmentLegalEntity,
                               divmanagmentLegalEntity,
                               biumanagmentLegalEntity,
                               compmanagmentLegalEntity,
                               employeetraingInfo,
                               employeetraingType,

                               t.InMultipleShifts,
                               t.AllowOvertime,
                               t.AllowDoubleTime,

                               t.IsHourly,
                               t.HourlyPay,
                               t.EmployeeCertifyingStaff,
                               t.EmployeeLeaveTypeId,
                               t.SupervisorId,
                               t.MasterCompanyId,
                               t.IsDeleted,
                               t.ManagementStructureId,
                               t.MasterCompany,
                               t.IsActive,
                               t.CreatedDate,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.UpdatedDate,
                               JobTypeName = jobtype.JobTypeName,
                               t.CurrencyId,
                               t.IsHeWorksInShop,
                               t.Memo,
                               JobTitle = jobtitle.Description
                               //cc.Description
                           }).Distinct().OrderByDescending(p => p.UpdatedDate).ToList();






            //  var empData = _appContext.Employee.Include("EmployeeShiftMapping").join(countriesRep.GetCountries()).ToList().Where(t => t.IsDelete == null || t.IsDelete == false);
            return empData;


        }

        public object EmployeeDetailsById(long employeeId)
        {
            var empData = (from t in _appContext.Employee
                           join oc in _appContext.Countries on t.OriginatingCountryId equals oc.countries_id into ocd
                           from oc in ocd.DefaultIfEmpty()
                           join nc in _appContext.Countries on t.NationalityCountryId equals nc.countries_id into ncd
                           from nc in ncd.DefaultIfEmpty()
                           join ee in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ee.EmployeeExpertiseId into eed
                           from ee in eed.DefaultIfEmpty()
                           join jty in _appContext.JobType on t.JobTypeId equals jty.JobTypeId into jtyd
                           from jty in jtyd.DefaultIfEmpty()

                           join jot in _appContext.JobTitle on t.JobTitleId equals jot.JobTitleId into jotd
                           from jot in jotd.DefaultIfEmpty()

                           join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                           from mle in mainCompanyTree.DefaultIfEmpty()

                           join divmle in _appContext.ManagementStructure on mle.ParentId equals divmle.ManagementStructureId into mainDivCompany
                           from divmle in mainDivCompany.DefaultIfEmpty()

                           join biumle in _appContext.ManagementStructure on divmle.ParentId equals biumle.ManagementStructureId into BIUDivCompany
                           from biumle in BIUDivCompany.DefaultIfEmpty()

                           join compmle in _appContext.ManagementStructure on biumle.ParentId equals compmle.ManagementStructureId into comivCompany
                           from compmle in comivCompany.DefaultIfEmpty()

                           join empsu in _appContext.Employee on t.EmployeeId equals empsu.SupervisorId into employeesupervisiorInfo
                           from empsu in employeesupervisiorInfo.DefaultIfEmpty()

                               //join emt in _appContext.EmployeeTraining on t.EmployeeId equals emt.EmployeeId into emtd
                               //from emt in emtd.DefaultIfEmpty()

                               //join emty in _appContext.EmployeeTrainingType on emt.EmployeeTrainingTypeId equals emty.EmployeeTrainingTypeId into employeeTraingTypeInfo
                               //from emty in employeeTraingTypeInfo.DefaultIfEmpty()

                           join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into cud
                           from cu in cud.DefaultIfEmpty()

                           join mc in _appContext.MasterCompany on t.MasterCompanyId equals mc.MasterCompanyId into mcd
                           from mc in mcd.DefaultIfEmpty()

                           where t.EmployeeId == employeeId

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
                               OriginatingCountryName = oc.countries_name,
                               NationalityCountryName = nc.countries_name,
                               t.NationalityCountryId,
                               t.StartDate,
                               t.EmployeeCode,
                               t.MobilePhone,
                               t.WorkPhone,
                               EmployeeExpertiseName = ee.Description,
                               t.Fax,
                               t.Email,
                               t.SSN,
                               managmentLegalEntityName = mle.Name,
                               divmanagmentLegalEntityName = divmle.Name,
                               biumanagmentLegalEntityName = biumle.Name,
                               compmanagmentLegalEntityName = compmle.Name,
                               t.InMultipleShifts,
                               t.AllowOvertime,
                               t.AllowDoubleTime,
                               t.IsHourly,
                               t.HourlyPay,
                               t.EmployeeCertifyingStaff,
                               t.EmployeeLeaveTypeId,
                               t.SupervisorId,
                               t.MasterCompanyId,
                               t.IsDeleted,
                               t.ManagementStructureId,
                               //t.MasterCompany,
                               MasterCompanyName = mc.CompanyName,
                               t.IsActive,
                               t.CreatedDate,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.UpdatedDate,
                               JobTypeName = jty.JobTypeName,
                               t.CurrencyId,
                               t.IsHeWorksInShop,
                               t.Memo,
                               JobTitle = jot.Description,
                               SupervisorName = string.Concat(empsu.FirstName, " ", empsu.MiddleName, " ", empsu.LastName),
                               CurrencyName = string.Concat(cu.DisplayName, "( ", cu.Symbol, " )"),

                               LeaveTypeIds = _appContext.Employee
                                 .Join(_appContext.EmployeeLeaveTypeMapping,
                                 t => t.EmployeeId,
                                 mp => mp.EmployeeId,
                                 (t, mp) => new { t, mp })
                                .Join(_appContext.EmployeeLeaveType,
                                 mp1 => mp1.mp.EmployeeId,
                                 inte => Convert.ToInt64(inte.EmployeeLeaveTypeId),
                               (mp1, inte) => new { mp1, inte })
                               .Where(p => p.mp1.t.EmployeeId == t.EmployeeId)
                                .Select(p => p.inte.EmployeeLeaveTypeId),

                               LeaveTypeNames = string.Join(",", _appContext.Employee
                                 .Join(_appContext.EmployeeLeaveTypeMapping,
                                 t => t.EmployeeId,
                                 mp => mp.EmployeeId,
                                 (t, mp) => new { t, mp })
                                .Join(_appContext.EmployeeLeaveType,
                                 mp1 => mp1.mp.EmployeeId,
                                 inte => Convert.ToInt64(inte.EmployeeLeaveTypeId),
                               (mp1, inte) => new { mp1, inte })
                               .Where(p => p.mp1.t.EmployeeId == t.EmployeeId)
                                .Select(p => p.inte.Description)),

                               ShiftIds = _appContext.Employee
                                 .Join(_appContext.EmployeeShiftMapping,
                                 t => t.EmployeeId,
                                 mp => mp.EmployeeId,
                                 (t, mp) => new { t, mp })
                                .Join(_appContext.Shift,
                                 mp1 => mp1.mp.EmployeeId,
                                 inte => Convert.ToInt64(inte.ShiftId),
                               (mp1, inte) => new { mp1, inte })
                               .Where(p => p.mp1.t.EmployeeId == t.EmployeeId)
                                .Select(p => p.inte.ShiftId),

                              ShiftNames = string.Join(",", _appContext.Employee
                                 .Join(_appContext.EmployeeShiftMapping,
                                 t => t.EmployeeId,
                                 mp => mp.EmployeeId,
                                 (t, mp) => new { t, mp })
                                .Join(_appContext.Shift,
                                 mp1 => mp1.mp.EmployeeId,
                                 inte => Convert.ToInt64(inte.ShiftId),
                               (mp1, inte) => new { mp1, inte })
                               .Where(p => p.mp1.t.EmployeeId == t.EmployeeId)
                                .Select(p => p.inte.Description)),

                           }).Distinct().FirstOrDefault();



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

            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<object> EmployeeUserRole(List<EmployeeUserRole> objEmployeeUserRoles)
        {
            if (objEmployeeUserRoles.Count > 0)
            {
                var empId = objEmployeeUserRoles.FirstOrDefault().EmployeeId;
                if (empId > 0)
                {
                    var data = (from emr in _appContext.EmployeeUserRole
                                where emr.EmployeeId == empId && emr.IsActive == true
                                select emr).ToList();

                    if (data.Count > 0)
                    {
                        foreach (var obj in data)
                        {
                            EmployeeUserRole deptDelete = _appContext.EmployeeUserRole.Find(obj.EmployeeUserRoleId);
                            _appContext.EmployeeUserRole.Remove(deptDelete);
                            _appContext.SaveChanges();
                        }
                    }
                }

            }

            foreach (var obj in objEmployeeUserRoles)
            {
                obj.IsActive = true;
                obj.IsDeleted = false;
                obj.CreatedDate = DateTime.Now;
                obj.UpdatedDate = DateTime.Now;
                //if (obj.EmployeeUserRoleId > 0)
                //{
                //    _appContext.EmployeeUserRole.Update(obj);
                //}
                //else
                //{
                //    _appContext.EmployeeUserRole.Add(obj);
                //}

                _appContext.EmployeeUserRole.Add(obj);
                _appContext.SaveChanges();
            }

            return objEmployeeUserRoles;
        }
        public IEnumerable<object> GetEmployeeUserRole(long employeeId)
        {
            var data = (from emr in _appContext.EmployeeUserRole
                        where emr.EmployeeId == employeeId && emr.IsActive == true
                        select emr).ToList();
            return data;
        }

        public IEnumerable<object> EmpoyeeManagementStructure(List<EmployeeManagementStructure> objEmployeeManagementStructure)
        {
            foreach (var obj in objEmployeeManagementStructure)
            {
                if (obj.EmployeeManagementId > 0)
                {
                    _appContext.EmployeeManagementStructure.Update(obj);
                }
                else
                {
                    _appContext.EmployeeManagementStructure.Add(obj);
                }

                _appContext.SaveChanges();
            }

            return objEmployeeManagementStructure;
        }

        public IEnumerable<object> GetEmpoyeeManagementStructure(long employeeId)
        {
            var data = (from ems in _appContext.EmployeeManagementStructure
                        where ems.EmployeeId == employeeId && ems.IsActive == true
                        select ems).ToList();
            return data;
        }

        public IEnumerable<object> GetEmployeeAuditHistoryData(long employeeId)
        {
            var retData = (from t in _appContext.EmployeeAudit

                           join orgCountries in _appContext.Countries on t.OriginatingCountryId equals orgCountries.countries_id into cre
                           from orgCountries in cre.DefaultIfEmpty()

                           join nationalCountryId in _appContext.Countries on t.NationalityCountryId equals nationalCountryId.countries_id into nationalCounty
                           from nationalCountryId in nationalCounty.DefaultIfEmpty()

                           join managementStructeInfo in _appContext.ManagementStructure on t.ManagementStructureId equals managementStructeInfo.ManagementStructureId into managmentCompany
                           from managementStructeInfo in managmentCompany.DefaultIfEmpty()

                           join ext in _appContext.EmployeeExpertise on t.EmployeeExpertiseId equals ext.EmployeeExpertiseId into employeeExpertiseInfos
                           from ext in employeeExpertiseInfos.DefaultIfEmpty()

                           join tpy in _appContext.JobType on t.JobTypeId equals tpy.JobTypeId into jobTypeInfos
                           from tpy in jobTypeInfos.DefaultIfEmpty()

                           join jt in _appContext.JobTitle on t.JobTitleId equals jt.JobTitleId into jobTitleInfos
                           from jt in jobTitleInfos.DefaultIfEmpty()

                           join managmentLegalEntity in _appContext.ManagementStructure on t.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                           from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()
                               //join mle in _appContext.ManagementStructure on t.ManagementStructureId equals mle.ManagementStructureId into mainCompanyTree
                               //from mle in mainCompanyTree.DefaultIfEmpty()

                           join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                           from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()

                           join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                           from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()

                           join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                           from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()

                           join employeetraingInfo in _appContext.EmployeeTraining on t.EmployeeId equals employeetraingInfo.EmployeeId into employeeTraingInfo
                           from employeetraingInfo in employeeTraingInfo.DefaultIfEmpty()

                           join employeetraingType in _appContext.EmployeeTrainingType on employeetraingInfo.EmployeeTrainingTypeId equals employeetraingType.EmployeeTrainingTypeId into employeeTraingTypeInfo
                           from employeetraingType in employeeTraingTypeInfo.DefaultIfEmpty()

                           where t.EmployeeId == employeeId
                           select new
                           {
                               t.AuditEmployeeId,
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
                               employeeExpertise = ext.Description,
                               // empSupervisor,
                               Jobtitle = jt.Description,
                               JobType = tpy.JobTypeName,
                               t.Fax,
                               t.Email,
                               t.SSN,

                               //legal entrities

                               managmentLegalEntity,
                               divmanagmentLegalEntity,
                               biumanagmentLegalEntity,
                               compmanagmentLegalEntity,
                               employeetraingInfo,
                               employeetraingType,

                               t.IsHourly,
                               t.HourlyPay,
                               t.EmployeeCertifyingStaff,
                               t.EmployeeLeaveTypeId,
                               t.SupervisorId,
                               t.MasterCompanyId,
                               t.IsDeleted,
                               t.ManagementStructureId,
                               t.IsActive,
                               t.CreatedDate,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.UpdatedDate,
                               JobTypeName = tpy.JobTypeName,
                               t.CurrencyId,
                               t.IsHeWorksInShop,
                               payType = Convert.ToBoolean(t.IsHourly) ? "Hourly" : "Yearly",
                               company = divmanagmentLegalEntity.Name
                               //cc.Description
                           }).Distinct().OrderByDescending(p => p.AuditEmployeeId).ToList();



            return retData;
        }



        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
