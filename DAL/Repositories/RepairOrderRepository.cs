using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class RepairOrderRepository : Repository<RepairOrder>, IRepairOrder
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public RepairOrderRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<object> RepairOrderGlobalSearch(string filterText, int pageNumber, int pageSize, long vendorId)
        {

            var take = pageSize;
            var skip = take * (pageNumber);

            short statusId = 0;



            var open = "open";
            var pending = "pending";
            var fulfilling = "fulfilling";
            var closed = "closed";
            if (!string.IsNullOrEmpty(filterText))
            {
                if (open.Contains(filterText.ToLower()))
                {
                    statusId = 1;
                }
                else if (pending.Contains(filterText.ToLower()))
                {
                    statusId = 2;
                }
                else if (fulfilling.Contains(filterText.ToLower()))
                {
                    statusId = 3;
                }
                else if (closed.Contains(filterText.ToLower()))
                {
                    statusId = 4;
                }

                var totalRecords = (from ro in _appContext.RepairOrder
                                    join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                    join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                    join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                    from appr in approver.DefaultIfEmpty()
                                    where ro.IsDeleted == false
                                         && ro.VendorId == (vendorId > 0 ? vendorId : ro.VendorId)
                                         && (ro.RepairOrderNumber.Contains(filterText)
                                         || v.VendorName.Contains(filterText)
                                         || v.VendorCode.Contains(filterText)
                                         || ro.StatusId == statusId
                                         || emp.FirstName.Contains(filterText)
                                         || appr.FirstName.Contains(filterText))
                                    select new
                                    {
                                        ro.RepairOrderId

                                    }).Distinct()
                .Count();

                var repairOrderList = (from ro in _appContext.RepairOrder
                                       join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                       join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                       join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                       from appr in approver.DefaultIfEmpty()
                                       where ro.IsDeleted == false
                                         && ro.VendorId == (vendorId > 0 ? vendorId : ro.VendorId)
                                         && (ro.RepairOrderNumber.Contains(filterText)
                                         || v.VendorName.Contains(filterText)
                                         || v.VendorCode.Contains(filterText)
                                         || ro.StatusId == statusId
                                         || emp.FirstName.Contains(filterText)
                                         || appr.FirstName.Contains(filterText))
                                       select new
                                       {
                                           ro.RepairOrderId,
                                           ro.RepairOrderNumber,
                                           ro.OpenDate,
                                           ro.ClosedDate,
                                           v.VendorName,
                                           v.VendorCode,
                                           Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                           RequestedBy = emp.FirstName,
                                           ApprovedBy = appr == null ? "" : appr.FirstName,
                                           ro.CreatedDate,
                                           ro.IsActive,
                                           TotalRecords = totalRecords
                                       }).Distinct().OrderByDescending(p => p.CreatedDate)
                                        .Skip(skip)
                                       .Take(take)
                                       .ToList();

                return repairOrderList;
            }
            else
            {
                var totalRecords = (from ro in _appContext.RepairOrder
                                    join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                    join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                    join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                    from appr in approver.DefaultIfEmpty()
                                    where ro.IsDeleted == false
                                         && ro.VendorId == (vendorId > 0 ? vendorId : ro.VendorId)
                                    select new
                                    {
                                        ro.RepairOrderId

                                    }).Distinct()
                .Count();

                var repairOrderList = (from ro in _appContext.RepairOrder
                                       join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                       join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                       join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                       from appr in approver.DefaultIfEmpty()
                                       where ro.IsDeleted == false
                                         && ro.VendorId == (vendorId > 0 ? vendorId : ro.VendorId)
                                       select new
                                       {
                                           ro.RepairOrderId,
                                           ro.RepairOrderNumber,
                                           ro.OpenDate,
                                           ro.ClosedDate,
                                           v.VendorName,
                                           v.VendorCode,
                                           Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                           RequestedBy = emp.FirstName,
                                           ApprovedBy = appr == null ? "" : appr.FirstName,
                                           ro.CreatedDate,
                                           ro.IsActive,
                                           TotalRecords = totalRecords
                                       }).Distinct().OrderByDescending(p => p.CreatedDate)
                                        .Skip(skip)
                                       .Take(take)
                                       .ToList();

                return repairOrderList;
            }

            
        }

        public IEnumerable<object> RecevingRolist()
        {
            var roList = (from ro in _appContext.RepairOrder
                          join emp in _appContext.Employee on ro.RequestedBy equals emp.EmployeeId into empo
                          from emp in empo.DefaultIfEmpty()
                          join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                          join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                          from appr in approver.DefaultIfEmpty()
                          join vc in _appContext.VendorContact on v.VendorId equals vc.VendorId
                          join con in _appContext.Contact on vc.ContactId equals con.ContactId
                          where ro.IsDeleted == false && (ro.IsActive == null || ro.IsActive == true)
                          select new
                          {
                              ro.RepairOrderId,
                              ro.RepairOrderNumber,
                              ro.StatusId,
                              Status = ro.StatusId == 1
                                  ? "Open"
                                  : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                              ro.OpenDate,
                              v.VendorName,
                              v.VendorCode,
                              vendorContact = con.FirstName,
                              RequestedBy = emp.FirstName,
                              ApprovedBy = appr == null ? "" : appr.FirstName,
                              ro.IsActive,
                          }).Distinct().OrderByDescending(p => p.RepairOrderId)
                .ToList();

            return roList;

        }

        public IEnumerable<object> RoHistoryList(int repairOrderId)
        {
            var roHistoryList = (from ro in _appContext.RepairOrder
                                 join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                                 join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                 join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                 from appr in approver.DefaultIfEmpty()
                                 where ro.RepairOrderId == repairOrderId && (ro.IsDeleted == false || ro.IsDeleted == null)
                                 select new
                                 {
                                     ro.RepairOrderId,
                                     ro.RepairOrderNumber,
                                     ro.OpenDate,
                                     ClosedDate = ro.ClosedDate,
                                     v.VendorName,
                                     v.VendorCode,
                                     Status = ro.StatusId == 1
                                         ? "Open"
                                         : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                     RequestedBy = emp.FirstName,
                                     ApprovedBy = appr == null ? "-" : appr.FirstName,
                                     ro.UpdatedDate,
                                     ro.IsActive
                                 }).OrderByDescending(r => r.UpdatedDate).ToList();

            return roHistoryList;
        }

        public IEnumerable<object> GetRepairOrderlist(Common.Filters<RepairOrderFilters> roFilters)
        {

            if (roFilters.filters == null)
                roFilters.filters = new RepairOrderFilters();
            var pageNumber = roFilters.first + 1;

            short statusId = 0;
            long vendorId = 0;

            var pageSize = roFilters.rows;
            string sortColumn = string.Empty;
            var sorts = new Sorts<RepairOrderFilters>();
            var filters = new EntityFrameworkPaginate.Filters<RepairOrderFilters>();

            if (string.IsNullOrEmpty(roFilters.SortField))
            {
                sortColumn = "CreatedDate";
                roFilters.SortOrder = -1;
                sorts.Add(sortColumn == "CreatedDate", x => x.CreatedDate, true);
            }
            else
            {
                sortColumn = roFilters.SortField;
            }
            sortColumn = char.ToUpper(sortColumn[0]) + sortColumn.Substring(1);

            var propertyInfo = typeof(RepairOrderFilters).GetProperty(sortColumn);

            if (roFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }
            

            var open = "open";
            var pending = "pending";
            var fulfilling = "fulfilling";
            var closed = "closed";
            if (!string.IsNullOrEmpty(roFilters.filters.Status))
            {
                if (open.Contains(roFilters.filters.Status.ToLower()))
                {
                    statusId = 1;
                }
                else if (pending.Contains(roFilters.filters.Status.ToLower()))
                {
                    statusId = 2;
                }
                else if (fulfilling.Contains(roFilters.filters.Status.ToLower()))
                {
                    statusId = 3;
                }
                else if (closed.Contains(roFilters.filters.Status.ToLower()))
                {
                    statusId = 4;
                }
                else
                {
                    statusId = 5;
                }

            }

            if (roFilters.filters.VendorId != null)
            {
                vendorId = roFilters.filters.VendorId.Value;
            }

            filters.Add(vendorId > 0, x => x.VendorId == vendorId);
            filters.Add(!string.IsNullOrEmpty(roFilters.filters.RepairOrderNo), x => x.RepairOrderNumber.Contains(roFilters.filters.RepairOrderNo));
            //filters.Add(!string.IsNullOrEmpty(roFilters.filters.RepairOrderNumber), x => x.RepairOrderNumber.Contains(roFilters.filters.RepairOrderNumber));
            filters.Add(!string.IsNullOrEmpty(roFilters.filters.VendorName), x => x.VendorName.ToLower().Contains(roFilters.filters.VendorName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(roFilters.filters.VendorCode), x => x.VendorCode.ToLower().Contains(roFilters.filters.VendorCode.ToLower()));

            var totalRecords = (from ro in _appContext.RepairOrder
                                join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                from appr in approver.DefaultIfEmpty()
                                where ro.IsDeleted == false
                                      && ro.StatusId == (statusId > 0 ? statusId : ro.StatusId)
                                      && appr.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.ApprovedBy) ? roFilters.filters.ApprovedBy : appr.FirstName)
                                      &&  emp.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.RequestedBy) ? roFilters.filters.RequestedBy : emp.FirstName)
                                      && ro.OpenDate == (roFilters.filters.OpenDate != null ? roFilters.filters.OpenDate : ro.OpenDate)
                                     && ro.ClosedDate == (roFilters.filters.ClosedDate != null ? roFilters.filters.ClosedDate : ro.ClosedDate)
                                select new RepairOrderFilters()
                                {
                                    RepairOrderId = ro.RepairOrderId,
                                    RepairOrderNumber = ro.RepairOrderNumber,
                                    OpenDate = ro.OpenDate,
                                    ClosedDate = ro.ClosedDate,
                                    VendorName = v.VendorName,
                                    VendorCode = v.VendorCode,
                                    Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                    RequestedBy = emp.FirstName,
                                    ApprovedBy = appr == null ? "" : appr.FirstName,
                                    CreatedDate = ro.CreatedDate,
                                    IsActive = ro.IsActive,
                                    VendorId=ro.VendorId

                                }).Distinct().Paginate(pageNumber, pageSize, sorts, filters).RecordCount;
                

            var repairOrderList = (from ro in _appContext.RepairOrder
                                   join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                   join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                   join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                   from appr in approver.DefaultIfEmpty()
                                   where ro.IsDeleted == false
                                   && ro.StatusId == (statusId > 0 ? statusId : ro.StatusId)
                                   && appr.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.ApprovedBy) ? roFilters.filters.ApprovedBy : appr.FirstName)
                                   && emp.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.RequestedBy) ? roFilters.filters.RequestedBy : emp.FirstName)
                                   && ro.OpenDate == (roFilters.filters.OpenDate != null ? roFilters.filters.OpenDate : ro.OpenDate)
                                   && ro.ClosedDate == (roFilters.filters.ClosedDate != null ? roFilters.filters.ClosedDate : ro.ClosedDate)
                                   select new RepairOrderFilters()
                                   {
                                       RepairOrderId = ro.RepairOrderId,
                                       RepairOrderNumber = ro.RepairOrderNumber,
                                       OpenDate=ro.OpenDate,
                                       ClosedDate=ro.ClosedDate,
                                       VendorName=v.VendorName,
                                       VendorCode = v.VendorCode,
                                       Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                       RequestedBy = emp.FirstName,
                                       ApprovedBy = appr == null ? "" : appr.FirstName,
                                       CreatedDate=ro.CreatedDate,
                                       IsActive=ro.IsActive,
                                       VendorId=ro.VendorId,
                                       TotalRecords = totalRecords
                                   }).Distinct().Paginate(pageNumber, pageSize, sorts, filters).Results;

            return repairOrderList;
        }

        public IEnumerable<object> GetRoApproversList(long repairOrderId)
        {
            try
            {
                if (repairOrderId == 0)
                {
                    var list = (from ra in _appContext.RepairOrderApprover
                                join ral in _appContext.RepairOrderApproverList on ra.RoApproverId equals ral.RoApproverId
                                join emp in _appContext.Employee on ral.EmployeeId equals emp.EmployeeId
                                select new
                                {
                                    emp.EmployeeId,
                                    EmployeeName = emp.FirstName + ' ' + emp.LastName,
                                    emp.EmployeeCode,
                                    emp.Email,
                                    ral.StatusId,
                                    ral.Level,
                                    ra.RoApproverId,
                                    ral.RoApproverListId
                                }
                        ).Distinct()
                        .ToList();
                    return list;
                }
                else
                {
                    var list = (from ra in _appContext.RepairOrderApprover
                                join ral in _appContext.RepairOrderApproverList on ra.RoApproverId equals ral.RoApproverId
                                join emp in _appContext.Employee on ral.EmployeeId equals emp.EmployeeId
                                where ra.RepairOrderId == repairOrderId
                                select new
                                {
                                    emp.EmployeeId,
                                    EmployeeName = emp.FirstName + ' ' + emp.LastName,
                                    emp.EmployeeCode,
                                    emp.Email,
                                    ral.StatusId,
                                    ral.Level,
                                    ra.RoApproverId,
                                    ral.RoApproverListId
                                }
                        ).ToList();
                    return list;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object RepairOrderView(long repairOrderId)
        {
            try
            {
                var data = (from ro in _appContext.RepairOrder
                            join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                            join req in _appContext.Employee on ro.RequisitionerId equals req.EmployeeId

                            join app in _appContext.Employee on ro.ApproverId equals app.EmployeeId into approver
                            from app in approver.DefaultIfEmpty()

                            join pr in _appContext.Priority on ro.PriorityId equals pr.PriorityId
                            join vc in _appContext.VendorContact on v.VendorId equals vc.VendorId
                            join con in _appContext.Contact on vc.ContactId equals con.ContactId
                            join ct in _appContext.CreditTerms on v.CreditTermsId equals ct.CreditTermsId into vct
                            from ct in vct.DefaultIfEmpty()
                            join shcust in _appContext.Customer on ro.ShipToUserId equals shcust.CustomerId into shipToCust
                            from shcust in shipToCust.DefaultIfEmpty()
                            join shcomp in _appContext.LegalEntity on ro.ShipToUserId equals shcomp.LegalEntityId into shipToComp
                            from shcomp in shipToComp.DefaultIfEmpty()
                            join shv in _appContext.Vendor on ro.ShipToUserId equals shv.VendorId into shipToVen
                            from shv in shipToVen.DefaultIfEmpty()
                            join blcust in _appContext.Customer on ro.ShipToUserId equals blcust.CustomerId into billToCust
                            from blcust in billToCust.DefaultIfEmpty()
                            join blcomp in _appContext.LegalEntity on ro.ShipToUserId equals blcomp.LegalEntityId into billToComp
                            from blcomp in billToComp.DefaultIfEmpty()
                            join blv in _appContext.Vendor on ro.ShipToUserId equals blv.VendorId into billToVen
                            from blv in billToVen.DefaultIfEmpty()

                            where ro.RepairOrderId == repairOrderId
                            select new
                            {
                                ro.RepairOrderNumber,
                                v.VendorName,
                                Requisitioner = req.FirstName,
                                ro.OpenDate,
                                v.VendorCode,
                                Approver = app == null ? "" : app.FirstName,
                                ro.ClosedDate,
                                con.WorkPhone,
                                ContactName = con.FirstName,
                                Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                pr.Description,
                                v.CreditLimit,
                                CreditTerm = ct == null ? "" : ct.Name,
                                ro.Resale,
                                ro.RoMemo,
                                ro.DeferredReceiver,
                                ShipToUserType = ro.ShipToUserTypeId == 1 ? "Customer" : (ro.ShipToUserTypeId == 2 ? "Vendor" : "Company"),
                                ShipToUser = ro.ShipToUserTypeId == 1 ? shcust.Name : (ro.ShipToUserTypeId == 2 ? shv.VendorName : shcomp.Name),
                                ro.ShipToSiteName,
                                ro.ShipToAddress1,
                                ro.ShipToAddress2,
                                ro.ShipToAddress3,
                                ro.ShipToCity,
                                ShipToState = ro.ShipToStateOrProvince,
                                ro.ShipToCountry,
                                ro.ShipToPostalCode,
                                ShipToContact = ro.ShipToContactId,
                                ro.ShipToMemo,
                                ro.ShipVia,
                                ro.ShippingCost,
                                ro.HandlingCost,
                                ShippingAccountNo = ro.ShippingAcctNum,
                                ro.ShippingId,
                                ShippingURL = ro.ShippingUrl,
                                BillToToUserType = ro.BillToUserTypeId == 1 ? "Customer" : (ro.BillToUserTypeId == 2 ? "Vendor" : "Company"),
                                BillToUser = ro.BillToUserTypeId == 1 ? blcust.Name : (ro.BillToUserTypeId == 2 ? blv.VendorName : blcomp.Name),
                                ro.BillToSiteName,
                                ro.BillToAddress1,
                                ro.BillToAddress2,
                                ro.BillToAddress3,
                                ro.BillToCity,
                                BillToState = ro.BillToStateOrProvince,
                                ro.BillToCountry,
                                ro.BillToPostalCode,
                                billToContact = ro.BillToContactId,
                                ro.BillToMemo,
                                ro.VendorId,
                                ro.ManagementStructureId,
                                ro.NeedByDate,
                                Priority = pr.Description, // Need to confirm this.
                                VendorContact = ro.VendorContactPhone,
                                ro.ApprovedDate
                            }).FirstOrDefault();

                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object RepairOrderById(long repairOrderId)
        {
            var repairOrder = (from ro in _appContext.RepairOrder
                               join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                               join vc in _appContext.VendorContact on v.VendorId equals vc.VendorId
                               join con in _appContext.Contact on vc.ContactId equals con.ContactId
                               where ro.RepairOrderId == repairOrderId
                               select new
                               {
                                   ro
                               }).FirstOrDefault();

            return repairOrder;
        }

        public object RepairOrderPartsById(long repairOrderId, long workOrderPartNoId)
        {
            var roPartsList = _appContext.RepairOrder
                .Include("RepairOrderPart")
                .Where(x => x.RepairOrderId == repairOrderId && x.IsDeleted == false)
                .SelectMany(x => x.RepairOrderPart)
                .OrderByDescending(x => x.IsParent)
                .GroupBy(g => g.ParentId)
                .ToList();

            var repairOrderDtoList = new List<RepairOrderPartDto>();
            RepairOrderPartDto repairOrderPartDto = null;
            RoPartSplits roPartSplit = null;

            if (roPartsList != null && roPartsList.Any())
            {
                foreach (var roPart in roPartsList)
                {
                    if (roPart != null && roPart.Any())
                    {
                        foreach (var roPartObj in roPart)
                        {
                            if (roPartObj.IsParent == true)
                            {
                                repairOrderPartDto = new RepairOrderPartDto
                                {
                                    RepairOrderPartRecordId = roPartObj.RepairOrderPartRecordId,
                                    RepairOrderId = roPartObj.RepairOrderId,
                                    AltPartNumberId = roPartObj.AltPartNumberId,
                                    AssetId = roPartObj.AssetId,
                                    ConditionId = roPartObj.ConditionId,
                                    CreatedBy = roPartObj.CreatedBy,
                                    DiscountAmount = roPartObj.DiscountAmount,
                                    DiscountPercent = roPartObj.DiscountPercent,
                                    DiscountPerUnit = roPartObj.DiscountPerUnit,
                                    ExtendedCost = roPartObj.ExtendedCost,
                                    ForeignExchangeRate = roPartObj.ForeignExchangeRate,
                                    FunctionalCurrencyId = roPartObj.FunctionalCurrencyId,
                                    GlAccountId = roPartObj.GlAccountId,
                                    IsParent = roPartObj.IsParent,
                                    ItemMasterId = roPartObj.ItemMasterId,
                                    ItemTypeId = roPartObj.ItemTypeId,
                                    ManagementStructureId = roPartObj.ManagementStructureId,
                                    ManufacturerId = roPartObj.ManufacturerId,
                                    MasterCompanyId = roPartObj.MasterCompanyId,
                                    Memo = roPartObj.Memo,
                                    NeedByDate = roPartObj.NeedByDate,
                                    PartNumberId = roPartObj.PartNumberId,
                                    QuantityOrdered = roPartObj.QuantityOrdered,
                                    ReportCurrencyId = roPartObj.ReportCurrencyId,
                                    SalesOrderId = roPartObj.SalesOrderId,
                                    UnitCost = roPartObj.UnitCost,
                                    UOMId = roPartObj.UOMId,
                                    UpdatedBy = roPartObj.UpdatedBy,
                                    WorkOrderId = roPartObj.WorkOrderId,
                                    StockLineId = roPartObj.StockLineId,
                                };

                                repairOrderDtoList.Add(repairOrderPartDto);
                            }
                            else
                            {
                                roPartSplit = new RoPartSplits
                                {
                                    RepairOrderPartRecordId = roPartObj.RepairOrderPartRecordId,
                                    RepairOrderId = roPartObj.RepairOrderId,
                                    AssetId = roPartObj.AssetId,
                                    ItemMasterId = roPartObj.ItemMasterId,
                                    ManagementStructureId = roPartObj.ManagementStructureId,
                                    PartNumberId = roPartObj.PartNumberId,
                                    QuantityOrdered = roPartObj.QuantityOrdered,
                                    UOMId = roPartObj.UOMId,
                                    RoPartSplitAddress1 = roPartObj.RoPartSplitAddress1,
                                    RoPartSplitAddress2 = roPartObj.RoPartSplitAddress2,
                                    RoPartSplitAddress3 = roPartObj.RoPartSplitAddress3,
                                    RoPartSplitAddressId = roPartObj.RoPartSplitAddressId,
                                    RoPartSplitCity = roPartObj.RoPartSplitCity,
                                    RoPartSplitCountry = roPartObj.RoPartSplitCountry,
                                    RoPartSplitPostalCode = roPartObj.RoPartSplitPostalCode,
                                    RoPartSplitStateOrProvince = roPartObj.RoPartSplitStateOrProvince,
                                    RoPartSplitUserId = roPartObj.RoPartSplitUserId,
                                    RoPartSplitUserTypeId = roPartObj.RoPartSplitUserTypeId,
                                    NeedByDate = roPartObj.NeedByDate,
                                    StockLineId = roPartObj.StockLineId,
                                };
                                if (repairOrderPartDto.RoPartSplits == null)
                                {
                                    repairOrderPartDto.RoPartSplits = new List<RoPartSplits>();
                                }
                                repairOrderPartDto.RoPartSplits.Add(roPartSplit);
                            }
                        }
                    }
                }
            }
            else
            {
                repairOrderDtoList = null;
            }
            // Create RO From Work Order
            if (workOrderPartNoId > 0)
            {
                var woPartNo = _appContext.WorkOrderPartNumber.Where(p => p.ID == workOrderPartNoId).FirstOrDefault();
                if (woPartNo != null)
                {
                    var itemMaster = ItemMasterDetails(woPartNo.MasterPartId);
                    repairOrderPartDto = new RepairOrderPartDto
                    {
                        RepairOrderPartRecordId = 0,
                        RepairOrderId = repairOrderId,
                        AltPartNumberId = 0,
                        AssetId = 0,
                        ConditionId = woPartNo.ConditionId,
                        CreatedBy = woPartNo.CreatedBy,
                        DiscountAmount = 0,
                        DiscountPercent = 0,
                        DiscountPerUnit = 0,
                        ExtendedCost = 0,
                        ForeignExchangeRate = (repairOrderDtoList != null && repairOrderDtoList.Count > 0) ? repairOrderDtoList[0].ForeignExchangeRate : "",
                        FunctionalCurrencyId = (repairOrderDtoList != null && repairOrderDtoList.Count > 0) ? repairOrderDtoList[0].FunctionalCurrencyId : 0,
                        GlAccountId = Convert.ToInt32(itemMaster.GLAccountId),
                        IsParent = true,
                        ItemMasterId = woPartNo.MasterPartId,
                        ItemTypeId = itemMaster.ItemTypeId,
                        ManagementStructureId = (repairOrderDtoList != null && repairOrderDtoList.Count > 0) ? repairOrderDtoList[0].ManagementStructureId : 0,
                        ManufacturerId = Convert.ToInt32(itemMaster.ManufacturerId),
                        MasterCompanyId = woPartNo.MasterCompanyId,
                        Memo = "",
                        NeedByDate = (repairOrderDtoList != null && repairOrderDtoList.Count > 0) ? repairOrderDtoList[0].NeedByDate : DateTime.Now,
                        PartNumberId = Convert.ToInt32(woPartNo.MasterPartId),
                        QuantityOrdered = woPartNo.Quantity,
                        ReportCurrencyId = (repairOrderDtoList != null && repairOrderDtoList.Count > 0) ? repairOrderDtoList[0].ReportCurrencyId : 0,
                        SalesOrderId = 0,
                        UnitCost = 0,
                        UOMId = itemMaster.PurchaseUnitOfMeasureId,
                        UpdatedBy = woPartNo.UpdatedBy,
                        WorkOrderId = woPartNo.WorkOrderId,
                        StockLineId = woPartNo.StockLineId,
                    };

                    if (repairOrderDtoList == null)
                        repairOrderDtoList = new List<RepairOrderPartDto>();


                    repairOrderDtoList.Add(repairOrderPartDto);
                }
            }

            return repairOrderDtoList;
        }

        private ItemMaster ItemMasterDetails(long itemMasterId)
        {
            var itemMaster = _appContext.ItemMaster.Where(p => p.ItemMasterId == itemMasterId).FirstOrDefault();
            if (itemMaster == null)
                itemMaster = new ItemMaster();
            return itemMaster;
        }

        public List<RepairOrderPartViewDto> GetRepairOrderPartsView(long repairOrderId)
        {
            var returnObjects = new List<RepairOrderPartViewDto>();

            try
            {
                var list = (from rop in _appContext.RepairOrderPart
                            join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                            join im in _appContext.ItemMaster on rop.ItemMasterId equals im.ItemMasterId
                            join ip in _appContext.ItemType on rop.ItemTypeId equals ip.ItemTypeId
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            join gla in _appContext.GLAccount on im.GLAccountId equals gla.GLAccountId into glacc
                            from gla in glacc.DefaultIfEmpty()
                            join uom in _appContext.UnitOfMeasure on im.RepairUnitOfMeasureId equals uom.UnitOfMeasureId into uoms
                            from uom in uoms.DefaultIfEmpty()
                            join cond in _appContext.Condition on rop.ConditionId equals cond.ConditionId
                            join fcurr in _appContext.Currency on rop.FunctionalCurrencyId equals fcurr.CurrencyId
                            join rcurr in _appContext.Currency on rop.ReportCurrencyId equals rcurr.CurrencyId
                            join wo in _appContext.WorkOrder on rop.WorkOrderId equals wo.WorkOrderId into won
                            from wo in won.DefaultIfEmpty()

                            where rop.RepairOrderId == repairOrderId
                            select new
                            {
                                rop,
                                im.PartNumber,
                                AltPartNumber = im.PartNumber,
                                im.PartDescription,
                                ItemType = ip.Description,
                                Manufacturer = man.Name,
                                GLAccount = gla.AccountName,
                                UnitOfMeasure = uom.Description,
                                Condition = cond.Description,
                                FunctionalCurrency = fcurr.Symbol,
                                RerortCurrency = rcurr.Symbol,
                                WorkOrderNo = wo.WorkOrderNum,
                                SalesOrderNo = rop.SalesOrderId,
                            }).ToList();

                if (list != null && list.Any())
                {
                    var repairOrderPartViewDto = new RepairOrderPartViewDto();
                    repairOrderPartViewDto.RepairOrderSplitParts = new List<RepairOrderSplitParts>();
                    foreach (var part in list)
                    {
                        if (part.rop.IsParent == true)
                        {
                            repairOrderPartViewDto.PartNumber = part.PartNumber;
                            repairOrderPartViewDto.AltPartNumber = part.AltPartNumber;
                            repairOrderPartViewDto.PartDescription = part.PartDescription;
                            repairOrderPartViewDto.ItemType = part.ItemType;
                            repairOrderPartViewDto.Manufacturer = part.Manufacturer;
                            repairOrderPartViewDto.GlAccount = part.GLAccount;
                            repairOrderPartViewDto.UnitOfMeasure = part.UnitOfMeasure;
                            repairOrderPartViewDto.Condition = part.Condition;
                            repairOrderPartViewDto.FunctionalCurrency = part.FunctionalCurrency;
                            repairOrderPartViewDto.ReportCurrency = part.RerortCurrency;
                            repairOrderPartViewDto.WorkOrderNo = part.WorkOrderNo;
                            repairOrderPartViewDto.SalesOrderNo = part.SalesOrderNo;
                            repairOrderPartViewDto.RepairOrderId = part.rop.RepairOrderId;
                            repairOrderPartViewDto.NeedByDate = part.rop.NeedByDate;
                            repairOrderPartViewDto.QuantityOrdered = part.rop.QuantityOrdered;
                            repairOrderPartViewDto.UnitCost = part.rop.UnitCost;
                            repairOrderPartViewDto.DiscountPercent = part.rop.DiscountPercent;
                            repairOrderPartViewDto.DiscountPerUnit = part.rop.DiscountPerUnit;
                            repairOrderPartViewDto.DiscountAmount = part.rop.DiscountAmount;
                            repairOrderPartViewDto.ExtendedCost = part.rop.ExtendedCost;
                            repairOrderPartViewDto.ReportCurrencyId = part.rop.ReportCurrencyId;
                            repairOrderPartViewDto.FunctionalCurrencyId = part.rop.FunctionalCurrencyId;
                            repairOrderPartViewDto.ForeignExchangeRate = part.rop.ForeignExchangeRate;
                            repairOrderPartViewDto.ManagementStructureId = part.rop.ManagementStructureId;

                            returnObjects.Add(repairOrderPartViewDto);
                        }
                        else
                        {
                            var repairOrderSplitPart = new RepairOrderSplitParts()
                            {
                                RepairOrderPartRecordId = part.rop.RepairOrderPartRecordId,
                                RepairOrderId = part.rop.RepairOrderId,
                                ManagementStructureId = part.rop.ManagementStructureId,
                                NeedByDate = part.rop.NeedByDate,
                                QuantityOrdered = part.rop.QuantityOrdered,
                                RoPartSplitAddress1 = part.rop.RoPartSplitAddress1,
                                RoPartSplitAddress2 = part.rop.RoPartSplitAddress2,
                                RoPartSplitAddress3 = part.rop.RoPartSplitAddress3,
                                RoPartSplitCity = part.rop.RoPartSplitCity,
                                RoPartSplitState = part.rop.RoPartSplitStateOrProvince,
                                RoPartSplitPostalCode = part.rop.RoPartSplitPostalCode,
                                RoPartSplitCountry = part.rop.RoPartSplitCountry,
                                UnitOfMeasure = part.UnitOfMeasure,
                                PartNumber = part.PartNumber,
                                PartDescription = part.PartDescription,
                                UserType = part.rop.RoPartSplitUserTypeId == 1 ? "Customer" : (part.rop.RoPartSplitUserTypeId == 2 ? "Vendor" : "Company"),
                                User = ""
                            };
                            repairOrderPartViewDto.RepairOrderSplitParts.Add(repairOrderSplitPart);
                        }
                    }
                }

                return returnObjects;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<RepairOrder> ROListByMasterItemId(int itemMasterId)
        {
            var repairOrderList = (from ro in _appContext.RepairOrder
                                   join rop in _appContext.RepairOrderPart on ro.RepairOrderId equals rop.RepairOrderId
                                   join im in _appContext.ItemMaster on rop.ItemMasterId equals im.ItemMasterId
                                   where im.ItemMasterId == itemMasterId &&
                                   ro.IsDeleted == false
                                   select new RepairOrder
                                   {
                                       RepairOrderId = ro.RepairOrderId,
                                       RepairOrderNumber = ro.RepairOrderNumber
                                   });
            return repairOrderList;
        }

        public List<RepairOrderPartViewDto> GetRepairOrderPartsView2(long repairOrderId)
        {
            var returnObjects = new List<RepairOrderPartViewDto>();
            RepairOrderPartViewDto repairOrderPartViewDto = null;
            RepairOrderSplitParts repairOrderSplitPart;

            try
            {
                var repairOrderPartList = _appContext.RepairOrder
                  .Include("RepairOrderPart")
                  .Where(x => x.RepairOrderId == repairOrderId && x.IsDeleted == false)
                  .SelectMany(x => x.RepairOrderPart)
                  .OrderByDescending(x => x.IsParent)
                  .GroupBy(g => g.ParentId)
                  .ToList();

                var repairOrder = _appContext.RepairOrder.Where(x => x.RepairOrderId == repairOrderId && x.IsDeleted == false).FirstOrDefault();
                var roNumber = repairOrder?.RepairOrderNumber;

                var purchaseOrderNumber = (from s in _appContext.StockLine
                                           join po in _appContext.PurchaseOrder on s.PurchaseOrderId equals po.PurchaseOrderId
                                           where s.RepairOrderId == repairOrderId
                                           select new { PurchaseOrderNo = po.PurchaseOrderNumber }).FirstOrDefault();

                var poNumber = purchaseOrderNumber?.PurchaseOrderNo;

                if (repairOrderPartList != null && repairOrderPartList.Any())
                {
                    foreach (var repairOrderPart in repairOrderPartList)
                    {
                        if (repairOrderPart != null && repairOrderPart.Any())
                        {
                            foreach (var repairOrderPartObj in repairOrderPart)
                            {
                                if (repairOrderPartObj.IsParent == true)
                                {
                                    repairOrderPartViewDto = new RepairOrderPartViewDto();
                                    repairOrderPartViewDto.PartNumber = _getItemMaster(repairOrderPartObj.ItemMasterId)?.PartNumber;
                                    repairOrderPartViewDto.AltPartNumber = _getItemMaster(repairOrderPartObj.ItemMasterId)?.PartNumber;
                                    repairOrderPartViewDto.PartDescription = _getItemMaster(repairOrderPartObj.ItemMasterId)?.PartDescription;
                                    repairOrderPartViewDto.ItemType = _getItemType(repairOrderPartObj.ItemTypeId)?.Description;
                                    repairOrderPartViewDto.Manufacturer = _getManufacturer(repairOrderPartObj.RepairOrderId);
                                    repairOrderPartViewDto.GlAccount = _getGlAccountName(repairOrderPartObj.RepairOrderId);
                                    repairOrderPartViewDto.UnitOfMeasure = _getUnitOfMeasure(repairOrderPartObj.RepairOrderId);
                                    repairOrderPartViewDto.Condition = _getCondtion(repairOrderPartObj.ConditionId)?.Description;
                                    repairOrderPartViewDto.FunctionalCurrency = _getCurrency(repairOrderPartObj.FunctionalCurrencyId)?.DisplayName;
                                    repairOrderPartViewDto.ReportCurrency = _getCurrency(repairOrderPartObj.ReportCurrencyId)?.DisplayName;
                                    repairOrderPartViewDto.WorkOrderNo = _getWorkOrder(repairOrderPartObj.WorkOrderId)?.WorkOrderNum;
                                    repairOrderPartViewDto.SalesOrderNo = repairOrderPartObj.SalesOrderId;
                                    repairOrderPartViewDto.RepairOrderId = repairOrderPartObj.RepairOrderId;
                                    repairOrderPartViewDto.NeedByDate = repairOrderPartObj.NeedByDate;
                                    repairOrderPartViewDto.QuantityOrdered = repairOrderPartObj.QuantityOrdered;
                                    repairOrderPartViewDto.UnitCost = repairOrderPartObj.UnitCost;
                                    repairOrderPartViewDto.DiscountPercent = repairOrderPartObj.DiscountPercent;
                                    repairOrderPartViewDto.DiscountPerUnit = repairOrderPartObj.DiscountPerUnit;
                                    repairOrderPartViewDto.DiscountAmount = repairOrderPartObj.DiscountAmount;
                                    repairOrderPartViewDto.ExtendedCost = repairOrderPartObj.ExtendedCost;
                                    repairOrderPartViewDto.ReportCurrencyId = repairOrderPartObj.ReportCurrencyId;
                                    repairOrderPartViewDto.FunctionalCurrencyId = repairOrderPartObj.FunctionalCurrencyId;
                                    repairOrderPartViewDto.ForeignExchangeRate = repairOrderPartObj.ForeignExchangeRate;
                                    repairOrderPartViewDto.ManagementStructureId = repairOrderPartObj.ManagementStructureId;
                                    repairOrderPartViewDto.StockLineNumber = _getStockLine(repairOrderPartObj.StockLineId)?.StockLineNumber;
                                    repairOrderPartViewDto.ControlId = _getStockLine(repairOrderPartObj.StockLineId)?.IdNumber;
                                    repairOrderPartViewDto.ControlNumber = _getStockLine(repairOrderPartObj.StockLineId)?.ControlNumber;
                                    repairOrderPartViewDto.RepairOrderNo = roNumber;
                                    repairOrderPartViewDto.Memo = repairOrderPartObj.Memo;
                                    repairOrderPartViewDto.PO = poNumber;
                                    repairOrderPartViewDto.RepairOrderPartRecordId = repairOrderPartObj.RepairOrderPartRecordId;

                                    returnObjects.Add(repairOrderPartViewDto);
                                }
                                else
                                {
                                    repairOrderSplitPart = new RepairOrderSplitParts
                                    {
                                        RepairOrderPartRecordId = repairOrderPartObj.RepairOrderPartRecordId,
                                        RepairOrderId = repairOrderPartObj.RepairOrderId,
                                        ManagementStructureId = repairOrderPartObj.ManagementStructureId,
                                        NeedByDate = repairOrderPartObj.NeedByDate,
                                        QuantityOrdered = repairOrderPartObj.QuantityOrdered,
                                        RoPartSplitAddress1 = repairOrderPartObj.RoPartSplitAddress1,
                                        RoPartSplitAddress2 = repairOrderPartObj.RoPartSplitAddress2,
                                        RoPartSplitAddress3 = repairOrderPartObj.RoPartSplitAddress3,
                                        RoPartSplitCity = repairOrderPartObj.RoPartSplitCity,
                                        RoPartSplitState = repairOrderPartObj.RoPartSplitStateOrProvince,
                                        RoPartSplitPostalCode = repairOrderPartObj.RoPartSplitPostalCode,
                                        RoPartSplitCountry = repairOrderPartObj.RoPartSplitCountry,
                                        UnitOfMeasure = _getUnitOfMeasure(repairOrderPartObj.RepairOrderId),
                                        PartNumber = _getItemMaster(repairOrderPartObj.ItemMasterId)?.PartNumber,
                                        PartDescription = _getItemMaster(repairOrderPartObj.ItemMasterId)?.PartDescription,
                                        UserType = repairOrderPartObj.RoPartSplitUserTypeId == 1
                                            ? "Customer"
                                            : (repairOrderPartObj.RoPartSplitUserTypeId == 2 ? "Vendor" : "Company"),
                                        User = _getUser(repairOrderPartObj.RoPartSplitUserTypeId, repairOrderPartObj.RepairOrderId),
                                        StockLineNumber = _getStockLine(repairOrderPartObj.StockLineId)?.StockLineNumber,
                                        ControlId = _getStockLine(repairOrderPartObj.StockLineId)?.IdNumber,
                                        ControlNumber = _getStockLine(repairOrderPartObj.StockLineId)?.ControlNumber,
                                        PO = poNumber
                                    };
                                    if (repairOrderPartViewDto.RepairOrderSplitParts == null)
                                    {
                                        repairOrderPartViewDto.RepairOrderSplitParts = new List<RepairOrderSplitParts>();
                                    }
                                    repairOrderPartViewDto.RepairOrderSplitParts.Add(repairOrderSplitPart);
                                }
                            }
                        }
                    }
                }
                else
                {
                    returnObjects = null;
                }

                return returnObjects;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ItemMaster _getItemMaster(long itemMasterId)
        {
            var itemMaster = _appContext.ItemMaster
                .Where(x => x.ItemMasterId == itemMasterId)
                .FirstOrDefault();

            return itemMaster;
        }

        private ItemType _getItemType(int? itemTypeId)
        {
            var itemType = _appContext.ItemType
                .Where(x => x.ItemTypeId == itemTypeId)
                .FirstOrDefault();

            return itemType;
        }

        private string _getManufacturer(long repairOrderId)
        {
            var manufacturerName = (from rop in _appContext.RepairOrderPart
                                    join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                                    join im in _appContext.ItemMaster on rop.ItemMasterId equals im.ItemMasterId
                                    join ip in _appContext.ItemType on rop.ItemTypeId equals ip.ItemTypeId
                                    join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId

                                    join gla in _appContext.GLAccount on im.GLAccountId equals gla.GLAccountId into glacc
                                    from gla in glacc.DefaultIfEmpty()

                                    join uom in _appContext.UnitOfMeasure on im.RepairUnitOfMeasureId equals uom.UnitOfMeasureId into uoms
                                    from uom in uoms.DefaultIfEmpty()

                                    where rop.RepairOrderId == repairOrderId
                                    select new
                                    {
                                        Manufacturer = man.Name,
                                        //GLAccount = gla.AccountName,
                                        //UnitOfMeasure = uom.Description,
                                    }).FirstOrDefault();

            return manufacturerName.Manufacturer;
        }

        private string _getGlAccountName(long repairOrderId)
        {
            var glAccountName = (from rop in _appContext.RepairOrderPart
                                 join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                                 join im in _appContext.ItemMaster on rop.ItemMasterId equals im.ItemMasterId
                                 join ip in _appContext.ItemType on rop.ItemTypeId equals ip.ItemTypeId
                                 join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId

                                 join gla in _appContext.GLAccount on im.GLAccountId equals gla.GLAccountId into glacc
                                 from gla in glacc.DefaultIfEmpty()

                                     //join uom in _appContext.UnitOfMeasure on im.RepairUnitOfMeasureId equals uom.UnitOfMeasureId into uoms
                                     //from uom in uoms.DefaultIfEmpty()

                                 where rop.RepairOrderId == repairOrderId
                                 select new
                                 {
                                     //Manufacturer = man.Name,
                                     GLAccount = gla.AccountName,
                                     //UnitOfMeasure = uom.Description,
                                 }).FirstOrDefault();

            return glAccountName.GLAccount;
        }

        private string _getUnitOfMeasure(long repairOrderId)
        {
            var unitOfMeasure = (from rop in _appContext.RepairOrderPart
                                 join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                                 join im in _appContext.ItemMaster on rop.ItemMasterId equals im.ItemMasterId
                                 join ip in _appContext.ItemType on rop.ItemTypeId equals ip.ItemTypeId
                                 join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                                 join gla in _appContext.GLAccount on im.GLAccountId equals gla.GLAccountId into glacc
                                 from gla in glacc.DefaultIfEmpty()
                                 join uom in _appContext.UnitOfMeasure on im.RepairUnitOfMeasureId equals uom.UnitOfMeasureId into uoms
                                 from uom in uoms.DefaultIfEmpty()

                                 where rop.RepairOrderId == repairOrderId
                                 select new
                                 {
                                     UnitOfMeasure = uom.Description,
                                 }).FirstOrDefault();

            return unitOfMeasure.UnitOfMeasure;
        }

        private Condition _getCondtion(long? conditionId)
        {
            var condition = _appContext.Condition
                .Where(x => x.ConditionId == conditionId)
                .FirstOrDefault();

            return condition;
        }

        private Currency _getCurrency(int? currencyId)
        {
            var currency = _appContext.Currency
                .Where(x => x.CurrencyId == currencyId)
                .FirstOrDefault();

            return currency;
        }

        private WorkOrder _getWorkOrder(long? workOrderId)
        {
            var workOrder = _appContext.WorkOrder
                .Where(x => x.WorkOrderId == workOrderId)
                .FirstOrDefault();

            return workOrder;
        }

        private string _getUser(int? roPartSplitUserTypeId, long repairOrderId)
        {
            var user = string.Empty;

            switch (roPartSplitUserTypeId.Value)
            {
                case 1:
                    var test = (from rop in _appContext.RepairOrderPart
                                join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                                join cus in _appContext.Customer on rop.RoPartSplitUserId equals (int?)cus.CustomerId
                                where rop.RepairOrderId == repairOrderId
                                select new
                                {
                                    CustomerName = cus.Name,
                                }).FirstOrDefault();
                    user = test == null ? "" : test.CustomerName;
                    break;
                case 2:
                    var test2 = (from rop in _appContext.RepairOrderPart
                                 join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                                 join v in _appContext.Vendor on rop.RoPartSplitUserId equals (int?)v.VendorId
                                 where ro.RepairOrderId == repairOrderId
                                 select new
                                 {
                                     v.VendorName,
                                 }).FirstOrDefault();
                    user = test2 == null ? "" : test2.VendorName;
                    break;
                default:
                    var test3 = (from rop in _appContext.RepairOrderPart
                                 join ro in _appContext.RepairOrder on rop.RepairOrderId equals ro.RepairOrderId
                                 join le in _appContext.LegalEntity on rop.RoPartSplitUserId equals (int?)le.LegalEntityId
                                 where ro.RepairOrderId == repairOrderId
                                 select new
                                 {
                                     CompanyName = le.Name,
                                 }).FirstOrDefault();
                    user = test3 == null ? "" : test3.CompanyName;
                    break;
            }

            return user;
        }

        private StockLine _getStockLine(long? stockLineId)
        {
            var stockLine = _appContext.StockLine
               .Where(x => x.StockLineId == stockLineId)
               .FirstOrDefault();

            return stockLine;
        }
    }
}
