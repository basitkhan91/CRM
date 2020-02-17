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


                              join managementStructeInfo in _appContext.ManagementStructure on stl.ManagementStructureId equals managementStructeInfo.ManagementStructureId into managmentCompany
                              from managementStructeInfo in managmentCompany.DefaultIfEmpty()

                              join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                              from employee in emp.DefaultIfEmpty()


                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                                  // join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                                  //   from contact in con.DefaultIfEmpty()
                              join work in _appContext.WorkOrder on stl.CustomerId equals work.CustomerId into wor
                              from work in wor.DefaultIfEmpty()

                              join managmentLegalEntity in _appContext.ManagementStructure on stl.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                              from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()

                              join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                              from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()

                              join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                              from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()

                              join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                              from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()


                              where stl.IsDeleted != true

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
                                  // stl.WorkPhone,
                                  //  contactId = contact.ContactId,
                                  //   contactTitle = contact.ContactTitle,
                                  //  ContactFirstName = contact.FirstName,
                                  partNumber = stl.PartNumber,
                                  stl.IsTimeLife,
                                  //  stl.IsExpirationDate,
                                  stl.IsMFGDate,
                                  stl.IsCustomerStock,
                                  stl.TimeLifeOrigin,
                                  stl.TimeLifeDate,
                                  //  stl.ReceivingCustomerNumber,
                                  stl.TagDate,
                                  location = l.Name,
                                  warehouse = w.Name,

                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co == null ? 0 : co.ConditionId,
                                  //conditionId = co.ConditionId,
                                  // stl.ChangePartNumber,
                                  partDescription = im.PartDescription,
                                  stl.Quantity,
                                  stl.CreatedDate,
                                  stl.UpdatedDate,
                                  stl.CreatedBy,
                                  stl.UpdatedBy,
                                  //    stl.ManufacturingLotNumber,
                                  //    stl.ManufacturingTrace,
                                  //    stl.ObtainFromType,
                                  //   stl.CustomerReference,
                                  condition = co.Description,
                                  //   stl.Shelf,
                                  //  stl.Bin,
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

                                  //   OwnerType = stl.OwnerType == null ? 0 : stl.OwnerType,
                                  stl.TraceableTo,
                                  stl.ManufacturerId,
                                  //   stl.ManufacturingDate,
                                  stl.PartCertificationNumber,
                                  stl.TagType,
                                  //   stl.TraceableToType,
                                  stl.TimeLifeCyclesId,
                                  //   stl.Manufacturer,
                                  co,
                                  w,
                                  l,
                                  ti,
                                  conditionType = co.Description,
                                  im.ItemTypeId,
                                  stl.ManagementStructureId,
                                  work.WorkOrderNum,
                                  managmentLegalEntity,
                                  divmanagmentLegalEntity,
                                  biumanagmentLegalEntity,
                                  compmanagmentLegalEntity,
                                  managementStructeInfo,
                                  stl.CertifiedBy
                                  //work.WorkOrderId


                                  //  WorkOrderId = work.WorkOrderId == null ? 0 : work.WorkOrderId,

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

            int? woFilter = 0;

            if (customerFilters.filters == null)
                customerFilters.filters = new ReceivingCustomerWorkFilter();
            var pageNumber = customerFilters.first + 1;
            var pageSize = customerFilters.rows;

            string sortColumn = string.Empty;

            if(customerFilters.filters.woFilter!=null)
            {
                woFilter = customerFilters.filters.woFilter;
            }

            var sorts = new Sorts<ReceivingCustomerWorkFilter>();
            var filters = new EntityFrameworkPaginate.Filters<ReceivingCustomerWorkFilter>();

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

            filters.Add(customerFilters.filters.receivedDate != null, x => x.receivedDate == customerFilters.filters.receivedDate);
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.receivingNumber), x => x.receivingNumber.ToLower().Contains(customerFilters.filters.receivingNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.woNumber), x => x.woNumber.Contains(customerFilters.filters.woNumber));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.woOpenDate), x => x.woOpenDate == customerFilters.filters.woNumber);
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.partNumber), x => x.partNumber.ToLower().Contains(customerFilters.filters.partNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.partDescription), x => x.partDescription.ToLower().Contains(customerFilters.filters.partDescription.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.customerName), x => x.customerName.ToLower().Contains(customerFilters.filters.customerName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.stageCode), x => x.stageCode.ToLower().Contains(customerFilters.filters.stageCode.ToLower()));
            filters.Add(!string.IsNullOrEmpty(customerFilters.filters.status), x => x.status.ToLower().Contains(customerFilters.filters.status.ToLower()));

            var totalRecords = (from cr in _appContext.ReceivingCustomerWork
                                join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                                join rp in _appContext.ItemMaster on cr.RevisePartId equals rp.ItemMasterId into crrp
                                from rp in crrp.DefaultIfEmpty()
                                join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                                join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                                join wo in _appContext.WorkOrder on cr.WorkOrderId equals wo.WorkOrderId into crwo
                                from wo in crwo.DefaultIfEmpty()
                                join wop in _appContext.WorkOrderPartNumber on cr.StockLineId equals wop.StockLineId into crwop
                                from wop in crwop.DefaultIfEmpty()
                                join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId into wops
                                from stage in wops.DefaultIfEmpty()
                                join st in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals st.Id into wopst
                                from st in wopst.DefaultIfEmpty()
                                where cr.IsDeleted == false
                                && customerFilters.filters.woFilter==1? wo==null:
                                (customerFilters.filters.woFilter == 2 ? (wo != null && wo.WorkOrderStatusId==2): (wo == null || wo!=null) )

                                select new ReceivingCustomerWorkFilter()
                                {

                                    ReceivingCustomerWorkId = cr.ReceivingCustomerWorkId,
                                    receivedDate = cr.CreatedDate,
                                    receivingNumber = cr.ReceivingNumber,
                                    woNumber = wo == null ? "" : wo.WorkOrderNum,
                                    woOpenDate = wo == null && wo.OpenDate!=null ? "" : wo.OpenDate.ToString(),
                                    partNumber = im.PartNumber,
                                    partDescription = im.PartDescription,
                                    customerName = cust.Name,
                                    stageCode = stage == null ? "" : stage.Stage,
                                    status = st == null ? "" : st.Description,
                                    ManagementStructureId = cr.ManagementStructureId,
                                    createdDate = cr.CreatedDate,
                                    serialNumber=cr.SerialNumber,
                                    receivedBy=emp.FirstName+" "+emp.LastName

                                }).Distinct()
                                .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

            var list = (from cr in _appContext.ReceivingCustomerWork
                        join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                        join rp in _appContext.ItemMaster on cr.RevisePartId equals rp.ItemMasterId into crrp
                        from rp in crrp.DefaultIfEmpty()
                        join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                        join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                        join wo in _appContext.WorkOrder on cr.WorkOrderId equals wo.WorkOrderId into crwo
                        from wo in crwo.DefaultIfEmpty()
                        join wop in _appContext.WorkOrderPartNumber on cr.StockLineId equals wop.StockLineId into crwop
                        from wop in crwop.DefaultIfEmpty()
                        join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId into wops
                        from stage in wops.DefaultIfEmpty()
                        join st in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals st.Id into wopst
                        from st in wopst.DefaultIfEmpty()
                        where cr.IsDeleted == false
                        && customerFilters.filters.woFilter == 1 ? wo == null :
                                (customerFilters.filters.woFilter == 2 ? (wo != null && wo.WorkOrderStatusId == 2) : (wo == null || wo != null))
                        select new ReceivingCustomerWorkFilter()
                        {

                            ReceivingCustomerWorkId = cr.ReceivingCustomerWorkId,
                            receivedDate = cr.CreatedDate,
                            receivingNumber = cr.ReceivingNumber,
                            woNumber = wo == null ? "" : wo.WorkOrderNum,
                            woOpenDate = wo == null && wo.OpenDate != null ? "" : wo.OpenDate.ToString(),
                            partNumber = im.PartNumber,
                            partDescription = im.PartDescription,
                            customerName = cust.Name,
                            stageCode = stage == null ? "" : stage.Stage,
                            status = st == null ? "" : st.Description,
                            ManagementStructureId = cr.ManagementStructureId,
                            createdDate = cr.CreatedDate,
                            serialNumber = cr.SerialNumber,
                            receivedBy = emp.FirstName + " " + emp.LastName,
                            totalRecords = totalRecords,
                        }).Distinct()
                          .Paginate(pageNumber, pageSize, sorts, filters).Results;

            if (list != null && list.Count() > 0)
            {
                string level1 = string.Empty;
                string level2 = string.Empty;
                string level3 = string.Empty;
                string level4 = string.Empty;

                foreach (var item in list)
                {
                    level1 = string.Empty;
                    level2 = string.Empty;
                    level3 = string.Empty;
                    level4 = string.Empty;

                    var mngInfoList = GetManagementStructureCodes(item.ManagementStructureId);
                    if (mngInfoList != null && mngInfoList.Count > 0)
                    {
                        if (mngInfoList.Any(p => p.Level1 == "Level1"))
                        {
                            item.LevelId1 = mngInfoList.Where(p => p.Level1 == "Level1").FirstOrDefault().LevelId1;
                            item.LevelCode1 = mngInfoList.Where(p => p.Level1 == "Level1").FirstOrDefault().LevelCode1;
                            item.Level1 = "Level1";
                        }
                        else
                        {
                            item.LevelId1 = 0;
                            item.LevelCode1 = "";
                            item.Level1 = "";
                        }

                        if (mngInfoList.Any(p => p.Level2 == "Level2"))
                        {
                            item.LevelId2 = mngInfoList.Where(p => p.Level2 == "Level2").FirstOrDefault().LevelId2;
                            item.LevelCode2 = mngInfoList.Where(p => p.Level2 == "Level2").FirstOrDefault().LevelCode2;
                            item.Level2 = "Level2";
                        }
                        else
                        {
                            item.LevelId2 = 0;
                            item.LevelCode2 = "";
                            item.Level2 = "";
                        }

                        if (mngInfoList.Any(p => p.Level3 == "Level3"))
                        {
                            item.LevelId3 = mngInfoList.Where(p => p.Level3 == "Level3").FirstOrDefault().LevelId3;
                            item.LevelCode3 = mngInfoList.Where(p => p.Level3 == "Level3").FirstOrDefault().LevelCode3;
                            item.Level3 = "Level3";
                        }
                        else
                        {
                            item.LevelId3 = 0;
                            item.LevelCode3 = "";
                            item.Level3 = "";
                        }

                        if (mngInfoList.Any(p => p.Level4 == "Level4"))
                        {
                            item.LevelId4 = mngInfoList.Where(p => p.Level4 == "Level4").FirstOrDefault().LevelId4;
                            item.LevelCode4 = mngInfoList.Where(p => p.Level4 == "Level4").FirstOrDefault().LevelCode4;
                            item.Level4 = "Level4";
                        }
                        else
                        {
                            item.LevelId4 = 0;
                            item.LevelCode4 = "";
                            item.Level4 = "";
                        }
                    }

                }
            }

            return list;
        }

        public object GetreceivingCustomerWorkById(long receivingCustomerWorkId)
        {

            try
            {
                var data = (from cr in _appContext.ReceivingCustomerWork
                            join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                            join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                            join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                            join cd in _appContext.Condition on cr.ConditionId equals cd.ConditionId
                            join si in _appContext.Site on cr.SiteId equals si.SiteId
                            join wh in _appContext.Warehouse on cr.WarehouseId equals wh.WarehouseId into crwh
                            from wh in crwh.DefaultIfEmpty()
                            join lo in _appContext.Location on cr.LocationId equals lo.LocationId into crlo
                            from lo in crlo.DefaultIfEmpty()
                            join sh in _appContext.Shelf on cr.ShelfId equals sh.ShelfId into crsh
                            from sh in crsh.DefaultIfEmpty()
                            join bin in _appContext.Bin on cr.BinId equals bin.BinId into crbin
                            from bin in crbin.DefaultIfEmpty()
                            join cc in _appContext.CustomerContact on cr.CustomerContactId equals cc.CustomerContactId
                            join con in _appContext.Contact on cc.ContactId equals con.ContactId
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            join rp in _appContext.ItemMaster on im.ItemMasterId equals rp.RevisedPartId into crrp
                            from rp in crrp.DefaultIfEmpty()
                            join ty in _appContext.TagType on cr.TagTypeId equals ty.TagTypeId into crty
                            from ty in crty.DefaultIfEmpty()

                            where cr.ReceivingCustomerWorkId == receivingCustomerWorkId
                            select new
                            {

                                EmployeeName = emp.FirstName,
                                CustomerName = cust.Name,
                                cust.CustomerCode,
                                CustomerContact = con.FirstName,
                                ContactPhone = con.WorkPhone+" "+ con.WorkPhoneExtn,
                                im.PartNumber,
                                im.PartDescription,
                                Manufacturer = man.Name,
                                RevisedPart = rp == null ? "" : rp.PartNumber,
                                TagType = ty == null ? "" : ty.Name,
                                Condition = cd.Description,
                                Site = si.Name,
                                Warehouse = wh.Name,
                                Location = lo == null ? "" : lo.Name,
                                Shelf = sh == null ? "" : sh.Name,
                                Bin = bin == null ? "" : bin.Name,
                                OwnerType = cr.OwnerTypeId == 1 ? "Customer" : (cr.OwnerTypeId == 2 ? "Vendor" : (cr.OwnerTypeId == 3 ? "Company" : "Other")),
                                TracableToType = cr.TraceableToTypeId == 1 ? "Customer" : (cr.TraceableToTypeId == 2 ? "Vendor" : (cr.TraceableToTypeId == 3 ? "Company" : "Other")),
                                ObtainFromType = cr.ObtainFromTypeId == 1 ? "Customer" : (cr.ObtainFromTypeId == 2 ? "Vendor" : (cr.ObtainFromTypeId == 3 ? "Company" : "Other")),

                                OwnerName = cr.OwnerTypeId == 1 ?
                                _appContext.Customer.Where(p => p.CustomerId == Convert.ToInt64(cr.Owner)).Select(p => p.Name).FirstOrDefault()
                                : (cr.OwnerTypeId == 2 ?
                                _appContext.Vendor.Where(p => p.VendorId == Convert.ToInt64(cr.Owner)).Select(p => p.VendorName).FirstOrDefault()
                                : (cr.OwnerTypeId == 3 ?
                                _appContext.LegalEntity.Where(p => p.LegalEntityId == Convert.ToInt64(cr.Owner)).Select(p => p.Name).FirstOrDefault()
                                : cr.Owner)),

                                TracableToName = cr.TraceableToTypeId == 1 ?
                                _appContext.Customer.Where(p => p.CustomerId == Convert.ToInt64(cr.TraceableTo)).Select(p => p.Name).FirstOrDefault()
                                : (cr.TraceableToTypeId == 2 ?
                                _appContext.Vendor.Where(p => p.VendorId == Convert.ToInt64(cr.TraceableTo)).Select(p => p.VendorName).FirstOrDefault()
                                : (cr.TraceableToTypeId == 3 ?
                                _appContext.LegalEntity.Where(p => p.LegalEntityId == Convert.ToInt64(cr.TraceableTo)).Select(p => p.Name).FirstOrDefault()
                                : cr.TraceableTo)),

                                ObtainFromName = cr.ObtainFromTypeId == 1 ?
                                _appContext.Customer.Where(p => p.CustomerId == Convert.ToInt64(cr.ObtainFrom)).Select(p => p.Name).FirstOrDefault()
                                : (cr.ObtainFromTypeId == 2 ?
                                _appContext.Vendor.Where(p => p.VendorId == Convert.ToInt64(cr.ObtainFrom)).Select(p => p.VendorName).FirstOrDefault()
                                : (cr.ObtainFromTypeId == 3 ?
                                _appContext.LegalEntity.Where(p => p.LegalEntityId == Convert.ToInt64(cr.ObtainFrom)).Select(p => p.Name).FirstOrDefault()
                                : cr.ObtainFrom)),

                                cr.BinId,
                                cr.CertifiedBy,
                                cr.ConditionId,
                                cr.CreatedBy,
                                cr.CreatedDate,
                                cr.CustomerContactId,
                                cr.CustomerId,
                                cr.EmployeeId,
                                cr.ExpDate,
                                cr.IsActive,
                                cr.IsCustomerStock,
                                cr.IsDeleted,
                                cr.IsExpDate,
                                cr.IsMFGDate,
                                cr.IsSerialized,
                                cr.IsTimeLife,
                                cr.ItemMasterId,
                                cr.LocationId,
                                cr.ManagementStructureId,
                                im.ManufacturerId,
                                cr.MasterCompanyId,
                                cr.Memo,
                                cr.MFGDate,
                                cr.MFGLotNo,
                                cr.MFGTrace,
                                cr.ObtainFrom,
                                cr.ObtainFromTypeId,
                                cr.Owner,
                                cr.OwnerTypeId,
                                cr.PartCertificationNumber,
                                cr.Quantity,
                                cr.ReceivingCustomerWorkId,
                                cr.ReceivingNumber,
                                cr.Reference,
                                RevisePartId=im.RevisedPartId,
                                cr.SerialNumber,
                                cr.ShelfId,
                                cr.SiteId,
                                cr.StockLineId,
                                cr.TagDate,
                                cr.TagTypeId,
                                cr.TimeLifeCyclesId,
                                cr.TimeLifeDate,
                                cr.TimeLifeOrigin,
                                cr.TraceableTo,
                                cr.TraceableToTypeId,
                                cr.UpdatedBy,
                                cr.UpdatedDate,
                                cr.WarehouseId,
                                cr.WorkOrderId,
                                cr.IsSkipSerialNo,
                                cr.IsSkipTimeLife


                            }).FirstOrDefault();
                return data;
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

                var totalRecords = (from cr in _appContext.ReceivingCustomerWork
                                    join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                                    join rp in _appContext.ItemMaster on cr.RevisePartId equals rp.ItemMasterId into crrp
                                    from rp in crrp.DefaultIfEmpty()
                                    join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                                    join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                                    join wo in _appContext.WorkOrder on cr.WorkOrderId equals wo.WorkOrderId into crwo
                                    from wo in crwo.DefaultIfEmpty()
                                    join wop in _appContext.WorkOrderPartNumber on cr.StockLineId equals wop.StockLineId into crwop
                                    from wop in crwop.DefaultIfEmpty()
                                    join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId into wops
                                    from stage in wops.DefaultIfEmpty()
                                    join st in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals st.Id into wopst
                                    from st in wopst.DefaultIfEmpty()
                                    where cr.IsDeleted == false
                                     && (cr.ReceivingNumber.Contains(value) || im.PartNumber.Contains(value) || im.PartDescription.Contains(value)
                                    || rp.PartNumber.Contains(value) || emp.FirstName.Contains(value) || cust.Name.Contains(value) || cr.Reference.Contains(value)
                                    )
                                    select new ReceivingCustomerWorkFilter()
                                    {
                                        ReceivingCustomerWorkId = cr.ReceivingCustomerWorkId,
                                        receivedDate = cr.CreatedDate,
                                        receivingNumber = cr.ReceivingNumber,
                                        woNumber = wo == null ? "" : wo.WorkOrderNum,
                                        woOpenDate = wo == null && wo.OpenDate != null ? "" : wo.OpenDate.ToString(),
                                        partNumber = im.PartNumber,
                                        partDescription = im.PartDescription,
                                        customerName = cust.Name,
                                        stageCode = stage == null ? "" : stage.Stage,
                                        status = st == null ? "" : st.Description,
                                        ManagementStructureId = cr.ManagementStructureId,
                                        createdDate = cr.CreatedDate,

                                    }).Distinct()
                                    .Count();


                var list = (from cr in _appContext.ReceivingCustomerWork
                            join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                            join rp in _appContext.ItemMaster on cr.RevisePartId equals rp.ItemMasterId into crrp
                            from rp in crrp.DefaultIfEmpty()
                            join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                            join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                            join wo in _appContext.WorkOrder on cr.WorkOrderId equals wo.WorkOrderId into crwo
                            from wo in crwo.DefaultIfEmpty()
                            join wop in _appContext.WorkOrderPartNumber on cr.StockLineId equals wop.StockLineId into crwop
                            from wop in crwop.DefaultIfEmpty()
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId into wops
                            from stage in wops.DefaultIfEmpty()
                            join st in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals st.Id into wopst
                            from st in wopst.DefaultIfEmpty()
                            where cr.IsDeleted == false
                             && (cr.ReceivingNumber.Contains(value) || im.PartNumber.Contains(value) || im.PartDescription.Contains(value)
                                    || rp.PartNumber.Contains(value) || emp.FirstName.Contains(value) || cust.Name.Contains(value) || cr.Reference.Contains(value)
                                    )
                            select new ReceivingCustomerWorkFilter()
                            {
                                ReceivingCustomerWorkId = cr.ReceivingCustomerWorkId,
                                receivedDate = cr.CreatedDate,
                                receivingNumber = cr.ReceivingNumber,
                                woNumber = wo == null ? "" : wo.WorkOrderNum,
                                woOpenDate = wo == null && wo.OpenDate != null ? "" : wo.OpenDate.ToString(),
                                partNumber = im.PartNumber,
                                partDescription = im.PartDescription,
                                customerName = cust.Name,
                                stageCode = stage == null ? "" : stage.Stage,
                                status = st == null ? "" : st.Description,
                                ManagementStructureId = cr.ManagementStructureId,
                                createdDate = cr.CreatedDate,
                                totalRecords = totalRecords,
                            }).Distinct().OrderBy(p => p.createdDate)
                                   .Skip(skip)
                                   .Take(take)
                                   .ToList();
                if (list != null && list.Count() > 0)
                {
                    string level1 = string.Empty;
                    string level2 = string.Empty;
                    string level3 = string.Empty;
                    string level4 = string.Empty;

                    foreach (var item in list)
                    {
                        level1 = string.Empty;
                        level2 = string.Empty;
                        level3 = string.Empty;
                        level4 = string.Empty;

                        var mngInfoList = GetManagementStructureCodes(item.ManagementStructureId);
                        if (mngInfoList != null && mngInfoList.Count > 0)
                        {
                            if (mngInfoList.Any(p => p.Level1 == "Level1"))
                            {
                                item.LevelId1 = mngInfoList.Where(p => p.Level1 == "Level1").FirstOrDefault().LevelId1;
                                item.LevelCode1 = mngInfoList.Where(p => p.Level1 == "Level1").FirstOrDefault().LevelCode1;
                                item.Level1 = "Level1";
                            }
                            else
                            {
                                item.LevelId1 = 0;
                                item.LevelCode1 = "";
                                item.Level1 = "";
                            }

                            if (mngInfoList.Any(p => p.Level2 == "Level2"))
                            {
                                item.LevelId2 = mngInfoList.Where(p => p.Level2 == "Level2").FirstOrDefault().LevelId2;
                                item.LevelCode2 = mngInfoList.Where(p => p.Level2 == "Level2").FirstOrDefault().LevelCode2;
                                item.Level2 = "Level2";
                            }
                            else
                            {
                                item.LevelId2 = 0;
                                item.LevelCode2 = "";
                                item.Level2 = "";
                            }

                            if (mngInfoList.Any(p => p.Level3 == "Level3"))
                            {
                                item.LevelId3 = mngInfoList.Where(p => p.Level3 == "Level3").FirstOrDefault().LevelId3;
                                item.LevelCode3 = mngInfoList.Where(p => p.Level3 == "Level3").FirstOrDefault().LevelCode3;
                                item.Level3 = "Level3";
                            }
                            else
                            {
                                item.LevelId3 = 0;
                                item.LevelCode3 = "";
                                item.Level3 = "";
                            }

                            if (mngInfoList.Any(p => p.Level4 == "Level4"))
                            {
                                item.LevelId4 = mngInfoList.Where(p => p.Level4 == "Level4").FirstOrDefault().LevelId4;
                                item.LevelCode4 = mngInfoList.Where(p => p.Level4 == "Level4").FirstOrDefault().LevelCode4;
                                item.Level4 = "Level4";
                            }
                            else
                            {
                                item.LevelId4 = 0;
                                item.LevelCode4 = "";
                                item.Level4 = "";
                            }
                        }

                    }
                }

                return list;


            }
            else
            {
                var totalRecords = (from cr in _appContext.ReceivingCustomerWork
                                    join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                                    join rp in _appContext.ItemMaster on cr.RevisePartId equals rp.ItemMasterId into crrp
                                    from rp in crrp.DefaultIfEmpty()
                                    join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                                    join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                                    join wo in _appContext.WorkOrder on cr.WorkOrderId equals wo.WorkOrderId into crwo
                                    from wo in crwo.DefaultIfEmpty()
                                    join wop in _appContext.WorkOrderPartNumber on cr.StockLineId equals wop.StockLineId into crwop
                                    from wop in crwop.DefaultIfEmpty()
                                    join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId into wops
                                    from stage in wops.DefaultIfEmpty()
                                    join st in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals st.Id into wopst
                                    from st in wopst.DefaultIfEmpty()
                                    where cr.IsDeleted == false
                                    select new ReceivingCustomerWorkFilter()
                                    {
                                        ReceivingCustomerWorkId = cr.ReceivingCustomerWorkId,
                                        receivedDate = cr.CreatedDate,
                                        receivingNumber = cr.ReceivingNumber,
                                        woNumber = wo == null ? "" : wo.WorkOrderNum,
                                        woOpenDate = wo == null && wo.OpenDate != null ? "" : wo.OpenDate.ToString(),
                                        partNumber = im.PartNumber,
                                        partDescription = im.PartDescription,
                                        customerName = cust.Name,
                                        stageCode = stage == null ? "" : stage.Stage,
                                        status = st == null ? "" : st.Description,
                                        ManagementStructureId = cr.ManagementStructureId,
                                        createdDate = cr.CreatedDate,
                                        
                                    }).Distinct()
                                    .Count();


                var list = (from cr in _appContext.ReceivingCustomerWork
                            join im in _appContext.ItemMaster on cr.ItemMasterId equals im.ItemMasterId
                            join rp in _appContext.ItemMaster on cr.RevisePartId equals rp.ItemMasterId into crrp
                            from rp in crrp.DefaultIfEmpty()
                            join emp in _appContext.Employee on cr.EmployeeId equals emp.EmployeeId
                            join cust in _appContext.Customer on cr.CustomerId equals cust.CustomerId
                            join wo in _appContext.WorkOrder on cr.WorkOrderId equals wo.WorkOrderId into crwo
                            from wo in crwo.DefaultIfEmpty()
                            join wop in _appContext.WorkOrderPartNumber on cr.StockLineId equals wop.StockLineId into crwop
                            from wop in crwop.DefaultIfEmpty()
                            join stage in _appContext.WorkOrderStage on wop.WorkOrderStageId equals stage.WorkOrderStageId into wops
                            from stage in wops.DefaultIfEmpty()
                            join st in _appContext.WorkOrderStatus on wop.WorkOrderStatusId equals st.Id into wopst
                            from st in wopst.DefaultIfEmpty()
                            where cr.IsDeleted == false
                            select new ReceivingCustomerWorkFilter()
                            {
                                ReceivingCustomerWorkId = cr.ReceivingCustomerWorkId,
                                receivedDate = cr.CreatedDate,
                                receivingNumber = cr.ReceivingNumber,
                                woNumber = wo == null ? "" : wo.WorkOrderNum,
                                woOpenDate = wo == null && wo.OpenDate != null ? "" : wo.OpenDate.ToString(),
                                partNumber = im.PartNumber,
                                partDescription = im.PartDescription,
                                customerName = cust.Name,
                                stageCode = stage == null ? "" : stage.Stage,
                                status = st == null ? "" : st.Description,
                                ManagementStructureId = cr.ManagementStructureId,
                                createdDate = cr.CreatedDate,
                                totalRecords = totalRecords,
                            }).Distinct().OrderBy(p => p.createdDate)
                                   .Skip(skip)
                                   .Take(take)
                                   .ToList();


                return list;
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

                              }).OrderByDescending(p => p.UpdatedDate).ToList();
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
                var result = (from rc in _appContext.ReceivingCustomerWork

                              join im in _appContext.ItemMaster on rc.PartNumber equals im.PartNumber
                              join customer in _appContext.Customer on rc.CustomerId equals customer.CustomerId into cus
                              from customer in cus.DefaultIfEmpty()
                                  //join contact in _appContext.Contact on Convert.ToInt64(stl.ContactId) equals contact.ContactId into con
                                  //from contact in con.DefaultIfEmpty()

                              where rc.ReceivingCustomerWorkId == receivingCustomerWorkId

                              select new
                              {
                                  rc,
                                  im.ItemMasterId,
                                  customer.CustomerId,
                                  customer.CustomerCode,
                                  customer.CreditTermsId,
                                  customer.CreditLimit,


                                  customer,
                                  //contact.WorkPhone,
                                  //stl.WorkPhone,

                                  partNumber = rc.PartNumber,
                                  rc.ReceivingNumber,
                                  rc.RevisePartId,
                                  partDescription = im.PartDescription,
                                  rc.CreatedDate,
                                  rc.UpdatedDate,
                                  rc.CreatedBy,
                                  rc.UpdatedBy,
                                  rc.Reference,
                                  rc.IsActive,
                                  rc.ManufacturerId,
                                  //  stl.Manufacturer,
                                  im.ItemTypeId,
                                  rc.ManagementStructureId


                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public ReceivingCustomerWork CreateReceivingCustomer(ReceivingCustomerWork receivingCustomer)
        {
            try
            {

                //if (receivingCustomer.RevisePartId == null)
                //    receivingCustomer.RevisePartId = _appContext.ItemMaster.Where(p => p.ItemMasterId == receivingCustomer.ItemMasterId).Select(p => p.RevisedPartId).FirstOrDefault();

                receivingCustomer.CreatedDate = receivingCustomer.UpdatedDate = DateTime.Now;
                receivingCustomer.IsActive = true;
                receivingCustomer.IsDeleted = false;

                var stockLine = BindStockLineData(receivingCustomer);
                _appContext.StockLine.Add(stockLine);
                _appContext.SaveChanges();




                stockLine.StockLineNumber = "STL-" + stockLine.StockLineId;
                stockLine.ControlNumber = "CNT-" + stockLine.StockLineId;
                stockLine.IdNumber = "Id-" + stockLine.StockLineId;
                _appContext.StockLine.Update(stockLine);
                _appContext.SaveChanges();

                if (receivingCustomer.TimeLife != null)
                {
                    receivingCustomer.TimeLife.StockLineId = stockLine.StockLineId;
                    _appContext.TimeLife.Add(receivingCustomer.TimeLife);
                    _appContext.SaveChanges();
                }

                receivingCustomer.TimeLifeCyclesId = receivingCustomer.TimeLife.TimeLifeCyclesId;
                receivingCustomer.StockLineId = stockLine.StockLineId;
                _appContext.ReceivingCustomerWork.Add(receivingCustomer);
                _appContext.SaveChanges();

                receivingCustomer.ReceivingNumber = "REC" + receivingCustomer.ReceivingCustomerWorkId;
                _appContext.ReceivingCustomerWork.Update(receivingCustomer);
                _appContext.SaveChanges();

                return receivingCustomer;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ReceivingCustomerWork UpdateReceivingCustomer(ReceivingCustomerWork receivingCustomer)
        {
            try
            {
                //if (receivingCustomer.RevisePartId == null)
                //    receivingCustomer.RevisePartId = _appContext.ItemMaster.Where(p => p.ItemMasterId == receivingCustomer.ItemMasterId).Select(p => p.RevisedPartId).FirstOrDefault();

                receivingCustomer.UpdatedDate = DateTime.Now;

                if (receivingCustomer.TimeLife != null)
                {
                    _appContext.TimeLife.Update(receivingCustomer.TimeLife);
                    _appContext.SaveChanges();
                }

                var stockLine = BindStockLineData(receivingCustomer);

                var exstockLine = _appContext.StockLine.Where(p => p.StockLineId == receivingCustomer.StockLineId).AsNoTracking().FirstOrDefault();

                stockLine.StockLineNumber = "STL-" + exstockLine.StockLineId;
                stockLine.ControlNumber = "CNT-" + exstockLine.StockLineId;
                stockLine.IdNumber = "Id-" + exstockLine.StockLineId;

                _appContext.StockLine.Update(stockLine);
                _appContext.SaveChanges();

                _appContext.ReceivingCustomerWork.Update(receivingCustomer);
                _appContext.SaveChanges();
                return receivingCustomer;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetPartDettails(long itemMasterId)
        {
            try
            {
                var data = (from im in _appContext.ItemMaster
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            join rp in _appContext.ItemMaster on im.RevisedPartId equals rp.ItemMasterId into imrp
                            from rp in imrp.DefaultIfEmpty()
                            where im.ItemMasterId == itemMasterId
                            select new
                            {
                                im.PartDescription,
                                im.ManufacturerId,
                                Manufacturer = man.Name,
                                RevisedPart = rp == null ? "" : rp.PartNumber,
                                im.IsSerialized,
                                im.IsTimeLife,
                                im.RevisedPartId
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> ReceivingCustomers(string value)
        {
            if (value == null)
                value = "";
            try
            {
                var list = (from rc in _appContext.ReceivingCustomerWork
                            join cust in _appContext.Customer on rc.CustomerId equals cust.CustomerId
                            join cc in _appContext.CustomerContact.Where(p => p.IsDefaultContact == true) on cust.CustomerId equals cc.CustomerId into custcc
                            from cc in custcc.DefaultIfEmpty()
                            join con in _appContext.Contact on cc.ContactId equals con.ContactId into custcon
                            from con in custcon.DefaultIfEmpty()
                            join emp in _appContext.Employee on cust.CsrId equals emp.EmployeeId into custemp
                            from emp in custemp.DefaultIfEmpty()
                            where rc.IsDeleted == false && rc.IsActive == true
                            && (cust.Name.ToLower().Contains(value.ToLower()))
                            select new
                            {
                                rc.CustomerId,
                                CustomerName = cust.Name,
                                cust.CsrId,
                                CSRName = emp == null ? "" : emp.FirstName,
                                cust.CreditLimit,
                                cust.CreditTermsId,
                                CustomerEmail = cust.Email,
                                CustomerPhoneNo = con == null ? "" : con.WorkPhone+ " "+con.WorkPhoneExtn,
                                CustomerContact = con == null ? " " : con.FirstName,

                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetReceivingCustomerReference(long customerId)
        {
            try
            {
                var list = (from rc in _appContext.ReceivingCustomerWork
                            join cust in _appContext.Customer on rc.CustomerId equals cust.CustomerId
                            where rc.CustomerId == customerId
                            select new
                            {
                                rc.ReceivingCustomerWorkId,
                                rc.Reference
                            }
                           ).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private StockLine BindStockLineData(ReceivingCustomerWork receivingCustomer)
        {
            StockLine stockLine = new StockLine();
            if (receivingCustomer.StockLineId != null)
                stockLine.StockLineId = Convert.ToInt64(receivingCustomer.StockLineId);
            stockLine.IsSerialized = receivingCustomer.IsSerialized;
            stockLine.ItemMasterId = receivingCustomer.ItemMasterId;
            stockLine.TraceableToType = receivingCustomer.TraceableToTypeId;
            stockLine.Quantity = receivingCustomer.Quantity;
            if (receivingCustomer.ConditionId != 0)
                stockLine.ConditionId = receivingCustomer.ConditionId;
            stockLine.SiteId = receivingCustomer.SiteId;
            stockLine.BinId = receivingCustomer.BinId;
            stockLine.ShelfId = receivingCustomer.ShelfId;
            if (receivingCustomer.WarehouseId != 0)
                stockLine.WarehouseId = receivingCustomer.WarehouseId;
            if (receivingCustomer.LocationId != 0)
                stockLine.LocationId = receivingCustomer.LocationId;

            stockLine.ObtainFromType = receivingCustomer.ObtainFromTypeId;
            stockLine.Owner = receivingCustomer.Owner;
            stockLine.OwnerType = receivingCustomer.OwnerTypeId;

            stockLine.IsCustomerStock = true;
            stockLine.TimeLifeCyclesId = receivingCustomer.TimeLifeCyclesId;
            stockLine.ManufacturerLotNumber = receivingCustomer.MFGLotNo;
            stockLine.SerialNumber = receivingCustomer.SerialNumber;
            stockLine.CertifiedBy = receivingCustomer.CertifiedBy;
            stockLine.TagDate = receivingCustomer.TagDate;
            stockLine.TagType = receivingCustomer.TagType;
            stockLine.TraceableTo = receivingCustomer.TraceableTo;
            stockLine.ObtainFrom = receivingCustomer.ObtainFrom;
            stockLine.ManufacturerId = receivingCustomer.ManufacturerId;
            stockLine.isActive = Convert.ToBoolean(receivingCustomer.IsActive);
            stockLine.IsDeleted = receivingCustomer.IsDeleted;
            stockLine.PartNumber = receivingCustomer.PartNumber;
            stockLine.ManagementStructureEntityId = receivingCustomer.ManagementStructureId;
            stockLine.CreatedBy = receivingCustomer.CreatedBy;
            stockLine.UpdatedBy = receivingCustomer.UpdatedBy;
            stockLine.UpdatedDate = receivingCustomer.UpdatedDate;
            stockLine.CreatedDate = receivingCustomer.CreatedDate;
            stockLine.MasterCompanyId = receivingCustomer.MasterCompanyId;

            return stockLine;
        }

        private List<MangStructureInfo> GetManagementStructureCodes(long? manmgStrucId)
        {
            List<MangStructureInfo> mngInfoList = new List<MangStructureInfo>();
            MangStructureInfo mangStructureInfo = new MangStructureInfo();
            ManagementStructure level4 = null;
            ManagementStructure level3 = null;
            ManagementStructure level2 = null;
            ManagementStructure level1 = null;
            string level1Code = string.Empty;
            try
            {
                level4 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == manmgStrucId).AsNoTracking().FirstOrDefault();
                if (level4 != null && level4.ParentId > 0)
                {
                    level3 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level4.ParentId).AsNoTracking().FirstOrDefault();
                }
                if (level3 != null && level3.ParentId > 0)
                {
                    level2 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level3.ParentId).AsNoTracking().FirstOrDefault();
                }
                if (level2 != null && level2.ParentId > 0)
                {
                    level1 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level2.ParentId).AsNoTracking().FirstOrDefault();
                }


                if (level4 != null && level3 != null && level2 != null && level1 != null)
                {


                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level1.Code;
                    mangStructureInfo.LevelId1 = level1.ManagementStructureId;

                    mangStructureInfo.Level2 = "Level2";
                    mangStructureInfo.LevelCode2 = level2.Code;
                    mangStructureInfo.LevelId2 = level2.ManagementStructureId;

                    mangStructureInfo.Level3 = "Level3";
                    mangStructureInfo.LevelCode3 = level3.Code;
                    mangStructureInfo.LevelId3 = level3.ManagementStructureId;

                    mangStructureInfo.Level4 = "Level4";
                    mangStructureInfo.LevelCode4 = level4.Code;
                    mangStructureInfo.LevelId4 = level4.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);

                }
                else if (level4 != null && level2 != null && level3 != null)
                {
                    mangStructureInfo.Level3 = "Level3";
                    mangStructureInfo.LevelCode3 = level4.Code;
                    mangStructureInfo.LevelId3 = level4.ManagementStructureId;

                    mangStructureInfo.Level2 = "Level2";
                    mangStructureInfo.LevelCode2 = level3.Code;
                    mangStructureInfo.LevelId2 = level3.ManagementStructureId;

                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level2.Code;
                    mangStructureInfo.LevelId1 = level2.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                }
                else if (level4 != null && level3 != null)
                {
                    mangStructureInfo.Level2 = "Level2";
                    mangStructureInfo.LevelCode2 = level4.Code;
                    mangStructureInfo.LevelId2 = level4.ManagementStructureId;

                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level3.Code;
                    mangStructureInfo.LevelId1 = level3.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                }
                else if (level4 != null)
                {
                    mangStructureInfo.Level1 = "Level1";
                    mangStructureInfo.LevelCode1 = level4.Code;
                    mangStructureInfo.LevelId1 = level4.ManagementStructureId;

                    mngInfoList.Add(mangStructureInfo);
                }



                return mngInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
