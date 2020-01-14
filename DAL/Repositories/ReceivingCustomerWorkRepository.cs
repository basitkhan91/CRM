using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Models;
using DAL.Common;
using EntityFrameworkPaginate;
using System.Linq.Expressions;
namespace DAL.Repositories
{
    public class ReceivingCustomerWorkRepository : Repository<DAL.Models.ReceivingCustomerWork>, IReceivingCustomerWork
    {
        public ReceivingCustomerWorkRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetAllreceivingCustomerWork()
        {
            try
            {
                var result = (from stl in _appContext.ReceivingCustomerWork

                              join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber


                              join co in _appContext.Condition on stl.ConditionId equals co.ConditionId into conn
                              from co in conn.DefaultIfEmpty()

                              join si in _appContext.Site on stl.SiteId equals si.SiteId into sit
                              from si in sit.DefaultIfEmpty()

                              join w in _appContext.Warehouse on stl.WarehouseId equals w.WarehouseId into ware
                              from w in ware.DefaultIfEmpty()

                              join l in _appContext.Location on stl.LocationId equals l.LocationId into loc
                              from l in loc.DefaultIfEmpty()

                              join sh in _appContext.Shelf on stl.ShelfId equals sh.ShelfId into she
                              from sh in she.DefaultIfEmpty()

                              join bi in _appContext.Bin on stl.BinId equals bi.BinId into bin
                              from bi in bin.DefaultIfEmpty()


                              join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                              from customer in cus.DefaultIfEmpty()


                              join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                              from employee in emp.DefaultIfEmpty()
                              

                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                              join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                              from contact in con.DefaultIfEmpty()
                              join work in _appContext.WorkOrder on stl.CustomerId equals work.CustomerId into wor
                              from work in wor.DefaultIfEmpty()

                              where stl.IsDeleted !=true

                              select new
                              {
                                  stl,
                                  stl.ReceivingCustomerWorkId,
                                  im,
                                  employee,
                                  customer,
                                  employee.FirstName,
                                  customer.Name,
                                  customer.CustomerCode,
                                  //contact.WorkPhone,
                                  stl.WorkPhone,
                                  contactId= contact.ContactId,
                                  contactTitle=  contact.ContactTitle,
                                  ContactFirstName=contact.FirstName,
                                  partNumber = stl.PartNumber,
                                  stl.IsTimeLife,
                                  stl.IsExpirationDate,
                                  stl.IsMFGDate,
                                  stl.IsCustomerStock,
                                  stl.TimeLifeOrigin,
                                  stl.TimeLifeDate,
                                  stl.ReceivingCustomerNumber,
                                  stl.TagDate,
                                  location = l.Name,
                                  warehouse = w.Name,
                                  
                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co == null ? 0 : co.ConditionId,
                                  //conditionId = co.ConditionId,
                                  stl.ChangePartNumber,
                                  partDescription = im.PartDescription,
                                  stl.Quantity,
                                  stl.CreatedDate,
                                  stl.UpdatedDate,
                                  stl.CreatedBy,
                                  stl.UpdatedBy,
                                  stl.ManufacturingLotNumber,
                                  stl.ManufacturingTrace,
                                  stl.ObtainFromType,
                                  stl.CustomerReference,
                                  condition = co.Description,
                                  stl.Shelf,
                                  stl.Bin,
                                  stl.IsActive,
                                  siteName = si.Name,
                                  shelfName = sh.Name,
                                  binName = bi.Name,
                                  siteId = stl.SiteId,
                                  stl.ShelfId,
                                  stl.BinId,
                                  warehouseId = stl.WarehouseId,
                                  locationId = stl.LocationId,
                                  stl.ObtainFrom,
                                  stl.Owner,
                                 
                                  OwnerType = stl.OwnerType == null ? 0 : stl.OwnerType,
                                  stl.TraceableTo,
                                  stl.ManufacturerId,
                                  stl.ManufacturingDate,
                                  stl.PartCertificationNumber,
                                  stl.CertifiedBy,
                                  stl.TagType,
                                  stl.TraceableToType,
                                  stl.TimeLifeCyclesId,
                                  stl.Manufacturer,
                                  co,
                                  w,
                                  l,
                                  ti,
                                  conditionType = co.Description,
                                  im.ItemTypeId,
                                  stl.ManagementStructureId,
                                  work.WorkOrderNum,
                                  //work.WorkOrderId


                               WorkOrderId = work.WorkOrderId == null ? 0 : work.WorkOrderId,

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<object> GetList(Common.Filters<ReceivingCustomerWorkFilter> customerFilters)
        {
            if (customerFilters.filters == null)
                customerFilters.filters = new ReceivingCustomerWorkFilter();
            var pageNumber = customerFilters.first + 1;
            var pageSize = customerFilters.rows;

            string sortColumn = string.Empty;

            var sorts = new Sorts<ReceivingCustomerWorkFilter>();

            if (string.IsNullOrEmpty(customerFilters.SortField))
            {
                sortColumn = "createdDate";
                customerFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = customerFilters.SortField;
            }

            var propertyInfo = typeof(ReceivingCustomerWorkFilter).GetProperty(sortColumn);

            if (customerFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }


            var totalRecords = (from stl in _appContext.ReceivingCustomerWork

                                join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber

                               join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                                from customer in cus.DefaultIfEmpty()


                                join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                                from employee in emp.DefaultIfEmpty()


                                    //join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                                    //from ti in time.DefaultIfEmpty()

                                    //join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                                    //from contact in con.DefaultIfEmpty()

                                    //join work in _appContext.WorkOrder on stl.CustomerId equals work.CustomerId into wor
                                    //from work in wor.DefaultIfEmpty()
                                where (stl.IsDeleted == false || stl.IsDeleted == null)

                                 && im.PartNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.partNumber) ? customerFilters.filters.partNumber : im.PartNumber))
                                && stl.ReceivingCustomerNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.receivingCustomerNumber) ? customerFilters.filters.receivingCustomerNumber : stl.ReceivingCustomerNumber))
                              //  && stl.ChangePartNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.changePartNumber) ? customerFilters.filters.changePartNumber : stl.ChangePartNumber))
                                && employee.FirstName.Contains((!String.IsNullOrEmpty(customerFilters.filters.firstName) ? customerFilters.filters.firstName : employee.FirstName))
                                && customer.Name.Contains((!String.IsNullOrEmpty(customerFilters.filters.name) ? customerFilters.filters.name : customer.Name))
                                && stl.CustomerReference.Contains((!String.IsNullOrEmpty(customerFilters.filters.customerReference) ? customerFilters.filters.customerReference : stl.CustomerReference))
                                //&& work.WorkOrderNum.Contains((!String.IsNullOrEmpty(customerFilters.filters.workOrderNum) ? customerFilters.filters.workOrderNum : work.WorkOrderNum))
                                && im.PartDescription.Contains((!String.IsNullOrEmpty(customerFilters.filters.partDescription) ? customerFilters.filters.partDescription : im.PartDescription))
                                // && stl.ChangePartNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.changePartNumber) ? customerFilters.filters.changePartNumber : stl.ChangePartNumber))

                                 && customerFilters.filters.changePartNumber == null ? string.IsNullOrEmpty(stl.ChangePartNumber) || stl.ChangePartNumber != null :
                                         stl.ChangePartNumber.Contains(customerFilters.filters.changePartNumber)

                                select new
                                {
                                    stl.ReceivingCustomerWorkId,
                                    OwnerType = stl.OwnerType == null ? 0 : stl.OwnerType,
                                    //conditionId = co == null ? 0 : co.ConditionId,


                                }).Distinct().Count();

            var data = (from stl in _appContext.ReceivingCustomerWork

                        join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber



                        join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                        from customer in cus.DefaultIfEmpty()


                        join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                        from employee in emp.DefaultIfEmpty()
                        where (stl.IsDeleted == false || stl.IsDeleted==null)

                        && im.PartNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.partNumber) ? customerFilters.filters.partNumber : im.PartNumber))
                        && stl.ReceivingCustomerNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.receivingCustomerNumber) ? customerFilters.filters.receivingCustomerNumber : stl.ReceivingCustomerNumber))
                       // && stl.ChangePartNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.changePartNumber) ? customerFilters.filters.changePartNumber : stl.ChangePartNumber))
                        && employee.FirstName.Contains((!String.IsNullOrEmpty(customerFilters.filters.firstName) ? customerFilters.filters.firstName : employee.FirstName))
                        && customer.Name.Contains((!String.IsNullOrEmpty(customerFilters.filters.name) ? customerFilters.filters.name : customer.Name))
                        && stl.CustomerReference.Contains((!String.IsNullOrEmpty(customerFilters.filters.customerReference) ? customerFilters.filters.customerReference : stl.CustomerReference))
                        //&& work.WorkOrderNum.Contains((!String.IsNullOrEmpty(customerFilters.filters.WorkOrderNum) ? customerFilters.filters.workOrderNum : work.WorkOrderNum))
                        && im.PartDescription.Contains((!String.IsNullOrEmpty(customerFilters.filters.partDescription) ? customerFilters.filters.partDescription : im.PartDescription))
                         //&& stl.ChangePartNumber.Contains((!String.IsNullOrEmpty(customerFilters.filters.changePartNumber) ? customerFilters.filters.changePartNumber : stl.ChangePartNumber))

                        && customerFilters.filters.changePartNumber == null ? string.IsNullOrEmpty(stl.ChangePartNumber) || stl.ChangePartNumber != null :
                                         stl.ChangePartNumber.Contains(customerFilters.filters.changePartNumber)

                        select new ReceivingCustomerWorkFilter()
                        {

                            ReceivingCustomerWorkId =  stl.ReceivingCustomerWorkId,


                            firstName=  employee.FirstName,
                            name=customer.Name,
                            //customer.CustomerCode,
                            //contact.WorkPhone,

                            partNumber = stl.PartNumber,

                            receivingCustomerNumber=stl.ReceivingCustomerNumber,

                            changePartNumber=    stl.ChangePartNumber,
                            partDescription = im.PartDescription,
                            customerReference= stl.CustomerReference,
                           createdDate= stl.CreatedDate,
                           isActive= stl.IsActive,
                           isDeleted= stl.IsDeleted,
                            totalRecords = totalRecords
                        }).Distinct()
                        .Paginate(pageNumber, pageSize, sorts).Results;


            return (data);
        }
        public IEnumerable<object> GetreceivingCustomerWorkById(long receivingCustomerWorkId)
        {

            try
            {
                var result = (from stl in _appContext.ReceivingCustomerWork

                              join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber


                              join co in _appContext.Condition on stl.ConditionId equals co.ConditionId into conn
                              from co in conn.DefaultIfEmpty()

                              join si in _appContext.Site on stl.SiteId equals si.SiteId into sit
                              from si in sit.DefaultIfEmpty()

                              join w in _appContext.Warehouse on stl.WarehouseId equals w.WarehouseId into ware
                              from w in ware.DefaultIfEmpty()

                              join l in _appContext.Location on stl.LocationId equals l.LocationId into loc
                              from l in loc.DefaultIfEmpty()

                              join sh in _appContext.Shelf on stl.ShelfId equals sh.ShelfId into she
                              from sh in she.DefaultIfEmpty()

                              join bi in _appContext.Bin on stl.BinId equals bi.BinId into bin
                              from bi in bin.DefaultIfEmpty()


                              join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                              from customer in cus.DefaultIfEmpty()


                              join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                              from employee in emp.DefaultIfEmpty()


                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                              join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                              from contact in con.DefaultIfEmpty()

                              where stl.ReceivingCustomerWorkId == receivingCustomerWorkId
                              select new
                              {
                                  stl,
                                  stl.ReceivingCustomerWorkId,
                                  im,
                                  employee,
                                  customer,
                                  employee.FirstName,
                                  customer.Name,
                                  customer.CustomerCode,
                                  contact.WorkPhone,
                                  contactId = contact.ContactId,
                                  contactTitle = contact.ContactTitle,
                                  ContactFirstName = contact.FirstName,
                                  partNumber = stl.PartNumber,
                                  stl.IsTimeLife,
                                  stl.IsExpirationDate,
                                  stl.IsMFGDate,
                                  stl.IsCustomerStock,
                                  stl.TimeLifeOrigin,
                                  stl.TimeLifeDate,
                                  stl.ReceivingCustomerNumber,
                                  stl.TagDate,
                                  location = l.Name,
                                  warehouse = w.Name,

                                 
                                  stl.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co == null ? 0 : co.ConditionId,
                                 
                                  stl.ChangePartNumber,
                                  partDescription = im.PartDescription,
                                  stl.Quantity,
                                  stl.CreatedDate,
                                  stl.UpdatedDate,
                                  stl.CreatedBy,
                                  stl.UpdatedBy,
                                  stl.ManufacturingLotNumber,
                                  stl.ManufacturingTrace,
                                  stl.ObtainFromType,
                                  stl.CustomerReference,
                                  condition = co.Description,
                                  stl.Shelf,
                                  stl.Bin,
                                  stl.IsActive,
                                  siteName = si.Name,
                                  shelfName = sh.Name,
                                  binName = bi.Name,
                                  siteId = stl.SiteId,
                                  stl.ShelfId,
                                  stl.BinId,
                                  warehouseId = stl.WarehouseId,
                                  locationId = stl.LocationId,
                                  stl.ObtainFrom,
                                  stl.Owner,
                                   OwnerType = stl.OwnerType == null ? 0 : stl.OwnerType,
                                  stl.TraceableTo,
                                  stl.ManufacturerId,
                                  stl.ManufacturingDate,
                                  stl.PartCertificationNumber,
                                  stl.CertifiedBy,
                                  stl.TagType,
                                  stl.TraceableToType,
                                  stl.TimeLifeCyclesId,
                                  stl.Manufacturer,
                                  co,
                                  w,
                                  l,
                                  ti,
                                  conditionType = co.Description,
                                  im.ItemTypeId,
                                  stl.ManagementStructureId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

         public IEnumerable<object> GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {

            var pageNumbers = pageNumber + 1;
            var take = pageSize;
            var skip = take * (pageNumbers - 1);

            if (!string.IsNullOrEmpty(value))
            {
                var totalRecords = (from stl in _appContext.ReceivingCustomerWork

                                    join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber

                                    join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                                    from customer in cus.DefaultIfEmpty()


                                    join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                                    from employee in emp.DefaultIfEmpty()



                                    where stl.IsDeleted != true



                                 && stl.ReceivingCustomerNumber.Contains(value) || stl.CustomerReference.Contains(value) || im.PartNumber.Contains(value) || stl.ChangePartNumber.Contains(value)
                                    || customer.Name.Contains(value) || employee.FirstName.Contains(value)
                                    || im.PartDescription.Contains(value)

                                    select new
                                    {
                                        stl.ReceivingCustomerWorkId,


                                    }).Count();

                var data = (from stl in _appContext.ReceivingCustomerWork

                            join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber

                            join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                            from customer in cus.DefaultIfEmpty()


                            join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                            from employee in emp.DefaultIfEmpty()



                            where stl.IsDeleted != true
                                   && stl.ReceivingCustomerNumber.Contains(value) || stl.CustomerReference.Contains(value) || im.PartNumber.Contains(value) || stl.ChangePartNumber.Contains(value)
                                    || customer.Name.Contains(value) || employee.FirstName.Contains(value)
                                    || im.PartDescription.Contains(value)



                            select new
                            {
                                stl.ReceivingCustomerWorkId,


                                firstName = employee.FirstName,
                                name = customer.Name,
                                //customer.CustomerCode,
                                //contact.WorkPhone,

                                partNumber = stl.PartNumber,

                                receivingCustomerNumber = stl.ReceivingCustomerNumber,

                                ChangePartNumber = stl.ChangePartNumber,
                                PartDescription = im.PartDescription,
                                CustomerReference = stl.CustomerReference,
                                updatedDate = stl.UpdatedDate,
                                createdDate = stl.CreatedDate,
                                isActive = stl.IsActive,
                                isDeleted = stl.IsDeleted,
                                TotalRecords = totalRecords
                            }).OrderBy(p => p.updatedDate)
                                   .Skip(skip)
                                   .Take(take)
                                   .ToList();


                 

                         
                return (data);
            }
            else
            {
                var totalRecords = (from stl in _appContext.ReceivingCustomerWork

                                    join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber

                                    join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                                    from customer in cus.DefaultIfEmpty()


                                    join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                                    from employee in emp.DefaultIfEmpty()



                                    where stl.IsDeleted != true

                                    select new
                                    {
                                       stl.ReceivingCustomerWorkId

                                    }).Count();

                var data = (from stl in _appContext.ReceivingCustomerWork

                            join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber

                            join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                            from customer in cus.DefaultIfEmpty()


                            join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                            from employee in emp.DefaultIfEmpty()



                            where stl.IsDeleted != true


                    select new
                            {
                        stl.ReceivingCustomerWorkId,


                        firstName = employee.FirstName,
                        name = customer.Name,
                        //customer.CustomerCode,
                        //contact.WorkPhone,

                        partNumber = stl.PartNumber,

                        receivingCustomerNumber = stl.ReceivingCustomerNumber,

                        ChangePartNumber = stl.ChangePartNumber,
                        PartDescription = im.PartDescription,
                        CustomerReference = stl.CustomerReference,
                        updatedDate=stl.UpdatedDate,
                        createdDate = stl.CreatedDate,
                        isActive = stl.IsActive,
                        isDeleted = stl.IsDeleted,
                        TotalRecords = totalRecords
                    }).OrderBy(p => p.updatedDate)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToList();



                return (data);
            }


        }


        public IEnumerable<object> GetAllreceivingCustomerWorkAudit(long receivingCustomerWorkId)
        {
            try
            {
                var result = (from stl in _appContext.ReceivingCustomerWorkAudit

                              join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber


                              join co in _appContext.Condition on stl.ConditionId equals co.ConditionId into conn
                              from co in conn.DefaultIfEmpty()

                              join si in _appContext.Site on stl.SiteId equals si.SiteId into sit
                              from si in sit.DefaultIfEmpty()

                              join w in _appContext.Warehouse on stl.WarehouseId equals w.WarehouseId into ware
                              from w in ware.DefaultIfEmpty()

                              join l in _appContext.Location on stl.LocationId equals l.LocationId into loc
                              from l in loc.DefaultIfEmpty()

                              join sh in _appContext.Shelf on stl.ShelfId equals sh.ShelfId into she
                              from sh in she.DefaultIfEmpty()

                              join bi in _appContext.Bin on stl.BinId equals bi.BinId into bin
                              from bi in bin.DefaultIfEmpty()


                              join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                              from customer in cus.DefaultIfEmpty()


                              join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                              from employee in emp.DefaultIfEmpty()


                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                              join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                              from contact in con.DefaultIfEmpty()

                              where stl.ReceivingCustomerWorkId == receivingCustomerWorkId
                              select new
                              {
                                  stl,
                                  stl.ReceivingCustomerWorkId,
                                  stl.AuditReceivingCustomerWorkId,
                                  im,
                                  employee,
                                  customer,
                                  employee.FirstName,
                                  customer.Name,
                                  customer.CustomerCode,
                                  contact.WorkPhone,
                                  contactId = contact.ContactId,
                                  contactTitle = contact.ContactTitle,
                                  ContactFirstName = contact.FirstName,
                                  partNumber = stl.PartNumber,
                                  stl.IsTimeLife,
                                  stl.IsExpirationDate,
                                  stl.IsMFGDate,
                                  stl.IsCustomerStock,
                                  stl.TimeLifeOrigin,
                                  stl.TimeLifeDate,
                                  stl.ReceivingCustomerNumber,
                                  stl.TagDate,
                                  location = l.Name,
                                  warehouse = w.Name,

                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co == null ? 0 : co.ConditionId,
                                  //conditionId = co.ConditionId,
                                  stl.ChangePartNumber,
                                  partDescription = im.PartDescription,
                                  stl.Quantity,
                                  stl.CreatedDate,
                                  stl.UpdatedDate,
                                  stl.CreatedBy,
                                  stl.UpdatedBy,
                                  stl.ManufacturingLotNumber,
                                  stl.ManufacturingTrace,
                                  stl.ObtainFromType,
                                  stl.CustomerReference,
                                  condition = co.Description,
                                  stl.Shelf,
                                  stl.Bin,
                                  siteName = si.Name,
                                  shelfName = sh.Name,
                                  binName = bi.Name,
                                  siteId = stl.SiteId,
                                  stl.ShelfId,
                                  stl.BinId,
                                  warehouseId = stl.WarehouseId,
                                  locationId = stl.LocationId,
                                  stl.ObtainFrom,
                                  stl.Owner,
                                   OwnerType = stl.OwnerType == null ? 0 : stl.OwnerType,
                                  stl.TraceableTo,
                                  stl.ManufacturerId,
                                  stl.ManufacturingDate,
                                  stl.PartCertificationNumber,
                                  stl.CertifiedBy,
                                  stl.TagType,
                                  stl.TraceableToType,
                                  stl.TimeLifeCyclesId,
                                  stl.Manufacturer,
                                  co,
                                  w,
                                  l,
                                  ti,
                                  conditionType = co.Description,
                                  im.ItemTypeId,
                                  stl.ManagementStructureId

                              }).OrderByDescending(p=>p.UpdatedDate).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        
        public IEnumerable<object> GetAllTimeLifeData(long id)
        {
            try
            {
                var result = (from ti in _appContext.TimeLife
                              where ti.TimeLifeCyclesId == id

                              select new
                              {
                                  ti.CyclesRemaining,
                                  ti.CyclesSinceNew,
                                  ti.CyclesSinceOVH,
                                  ti.CyclesSinceRepair,
                                  ti.CyclesSinceInspection,
                                  ti.TimeRemaining,
                                  ti.TimeSinceInspection,
                                  ti.TimeSinceNew,
                                  ti.TimeSinceOVH,
                                  ti.TimeSinceRepair,
                                  ti.LastSinceInspection,
                                  ti.LastSinceNew,
                                  ti.LastSinceOVH,


                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void DeleteReceivingCustomer(long id, string updatedBy)
        {
            try
            {
                ReceivingCustomerWork model = new ReceivingCustomerWork();
                model.ReceivingCustomerWorkId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.ReceivingCustomerWork.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetReceivingCustomerWorkData(long receivingCustomerWorkId)
        {
            try
            {
                var result = (from stl in _appContext.ReceivingCustomerWork

                              join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber
                              join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                              from customer in cus.DefaultIfEmpty()
                              //join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                              //from contact in con.DefaultIfEmpty()
                             
                              where stl.ReceivingCustomerWorkId== receivingCustomerWorkId

                              select new
                              {
                                  stl,
                                  im.ItemMasterId,
                                  customer.CustomerId,
                                  customer.CustomerCode,
                                  customer.CreditTermsId,
                                  customer.CreditLimit,
                                  
                                 
                                  customer,
                                    //contact.WorkPhone,
                                  stl.WorkPhone,
                                 
                                  partNumber = stl.PartNumber,
                                  stl.ReceivingCustomerNumber,
                                  stl.ChangePartNumber,
                                  partDescription = im.PartDescription,
                                  stl.CreatedDate,
                                  stl.UpdatedDate,
                                  stl.CreatedBy,
                                  stl.UpdatedBy,
                                  stl.CustomerReference,
                                   stl.IsActive,
                                   stl.ManufacturerId,
                                  stl.Manufacturer,
                                  im.ItemTypeId,
                                  stl.ManagementStructureId
                                 

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
