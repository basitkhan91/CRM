using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
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

        public IEnumerable<object> RecevingRolist()
        {
            var roList = (from ro in _appContext.RepairOrder
                          join emp in _appContext.Employee on ro.RequestedBy equals emp.EmployeeId
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

        public IEnumerable<object> GetRepairOrderlist(Filters<RepairOrderFilters> roFilters)
        {

            if (roFilters.filters == null)
                roFilters.filters = new RepairOrderFilters();
            var pageNumber = roFilters.first + 1;
            var take = roFilters.rows;
            var skip = take * (pageNumber - 1);

            short statusId = 0;

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

            }

            var totalRecords = (from ro in _appContext.RepairOrder
                                join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                                join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                from appr in approver.DefaultIfEmpty()
                                where ro.IsDeleted == false
                                      && ro.RepairOrderNumber.Contains(!string.IsNullOrEmpty(roFilters.filters.RepairOrderNo) ? roFilters.filters.RepairOrderNo : ro.RepairOrderNumber)
                                      && v.VendorName.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorName) ? roFilters.filters.VendorName : v.VendorName)
                                      && v.VendorCode.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorCode) ? roFilters.filters.VendorCode : v.VendorCode)
                                      && ro.StatusId == (statusId > 0 ? statusId : ro.StatusId)
                                      && emp.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.ApprovedBy) ? roFilters.filters.ApprovedBy : emp.FirstName)
                                      && emp.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.RequestedBy) ? roFilters.filters.RequestedBy : emp.FirstName)
                                select new
                                {
                                    ro.RepairOrderId

                                }).Distinct()
                .Count();

            var repairOrderList = (from ro in _appContext.RepairOrder
                                   join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                                   join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                   join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                   from appr in approver.DefaultIfEmpty()
                                   where ro.IsDeleted == false
                                   && ro.RepairOrderNumber.Contains(!string.IsNullOrEmpty(roFilters.filters.RepairOrderNo) ? roFilters.filters.RepairOrderNo : ro.RepairOrderNumber)
                                   && v.VendorName.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorName) ? roFilters.filters.VendorName : v.VendorName)
                                   && v.VendorCode.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorCode) ? roFilters.filters.VendorCode : v.VendorCode)
                                   && ro.StatusId == (statusId > 0 ? statusId : ro.StatusId)
                                   && emp.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.ApprovedBy) ? roFilters.filters.ApprovedBy : emp.FirstName)
                                   && emp.FirstName.Contains(!string.IsNullOrEmpty(roFilters.filters.RequestedBy) ? roFilters.filters.RequestedBy : emp.FirstName)
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

            if (roFilters.filters.OpenDate != null)
            {
                if (repairOrderList != null && repairOrderList.Any())
                {
                    repairOrderList = repairOrderList
                        .Where(x => x.OpenDate == roFilters.filters.OpenDate)
                        .ToList();
                }
            }

            if (roFilters.filters.ClosedDate != null)
            {
                if (repairOrderList != null && repairOrderList.Any())
                {
                    repairOrderList = repairOrderList
                        .Where(x => x.ClosedDate == roFilters.filters.ClosedDate)
                        .ToList();
                }
            }

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
                            join req in _appContext.Employee on ro.ApproverId equals req.EmployeeId

                            join app in _appContext.Employee on ro.ApproverId equals app.EmployeeId into approver
                            from app in approver.DefaultIfEmpty()

                            join pr in _appContext.Priority on ro.PriorityId equals pr.PriorityId
                            join vc in _appContext.VendorContact on v.VendorId equals vc.VendorId
                            join con in _appContext.Contact on vc.ContactId equals con.ContactId
                            join ct in _appContext.CreditTerms on v.CreditTermsId equals ct.CreditTermsId
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
                                Approver = app.FirstName,
                                ro.ClosedDate,
                                con.WorkPhone,
                                ContactName = con.FirstName,
                                Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                pr.Description,
                                v.CreditLimit,
                                CreditTerm = ct.Name,
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

        public object RepairOrderPartsById(long repairOrderId)
        {
            var roPartsList = (from ro in _appContext.RepairOrder
                               join rop in _appContext.RepairOrderPart on ro.RepairOrderId equals rop.RepairOrderId
                               where rop.RepairOrderId == repairOrderId
                                && ro.IsDeleted == false
                               select new
                               {
                                   rop
                               }).ToList();

            var repairOrderDtoList = new List<RepairOrderPartDto>();
            RepairOrderPartDto repairOrderPartDto = null;
            RoPartSplits roPartSplit = null;

            if (roPartsList != null && roPartsList.Any())
            {
                foreach (var roPart in roPartsList)
                {
                    if (roPart.rop.IsParent == true)
                    {
                        repairOrderPartDto = new RepairOrderPartDto();
                        repairOrderPartDto.RepairOrderPartRecordId = roPart.rop.RepairOrderPartRecordId;
                        repairOrderPartDto.RepairOrderId = roPart.rop.RepairOrderId;
                        repairOrderPartDto.AltPartNumberId = roPart.rop.AltPartNumberId;
                        repairOrderPartDto.AssetId = roPart.rop.AssetId;
                        repairOrderPartDto.ConditionId = roPart.rop.ConditionId;
                        repairOrderPartDto.CreatedBy = roPart.rop.CreatedBy;
                        repairOrderPartDto.DiscountAmount = roPart.rop.DiscountAmount;
                        repairOrderPartDto.DiscountPercent = roPart.rop.DiscountPercent;
                        repairOrderPartDto.DiscountPerUnit = roPart.rop.DiscountPerUnit;
                        repairOrderPartDto.ExtendedCost = roPart.rop.ExtendedCost;
                        repairOrderPartDto.ForeignExchangeRate = roPart.rop.ForeignExchangeRate;
                        repairOrderPartDto.FunctionalCurrencyId = roPart.rop.FunctionalCurrencyId;
                        repairOrderPartDto.GlAccountId = roPart.rop.GlAccountId;
                        repairOrderPartDto.IsParent = roPart.rop.IsParent;
                        repairOrderPartDto.ItemMasterId = roPart.rop.ItemMasterId;
                        repairOrderPartDto.ItemTypeId = roPart.rop.ItemTypeId;
                        repairOrderPartDto.ManagementStructureId = roPart.rop.ManagementStructureId;
                        repairOrderPartDto.ManufacturerId = roPart.rop.ManufacturerId;
                        repairOrderPartDto.MasterCompanyId = roPart.rop.MasterCompanyId;
                        repairOrderPartDto.Memo = roPart.rop.Memo;
                        repairOrderPartDto.NeedByDate = roPart.rop.NeedByDate;
                        repairOrderPartDto.PartNumberId = roPart.rop.PartNumberId;
                        repairOrderPartDto.QuantityOrdered = roPart.rop.QuantityOrdered;
                        repairOrderPartDto.ReportCurrencyId = roPart.rop.ReportCurrencyId;
                        repairOrderPartDto.SalesOrderId = roPart.rop.SalesOrderId;
                        repairOrderPartDto.UnitCost = roPart.rop.UnitCost;
                        repairOrderPartDto.UOMId = roPart.rop.UOMId;
                        repairOrderPartDto.UpdatedBy = roPart.rop.UpdatedBy;
                        repairOrderPartDto.WorkOrderId = roPart.rop.WorkOrderId;
                        repairOrderPartDto.StockLineId = _getStockLine(roPart.rop.RepairOrderId, roPart.rop.RepairOrderPartRecordId).StockLineId;

                        repairOrderDtoList.Add(repairOrderPartDto);
                    }
                    else
                    {
                        roPartSplit = new RoPartSplits
                        {
                            RepairOrderPartRecordId = roPart.rop.RepairOrderPartRecordId,
                            RepairOrderId = roPart.rop.RepairOrderId,
                            AssetId = roPart.rop.AssetId,
                            ItemMasterId = roPart.rop.ItemMasterId,
                            ManagementStructureId = roPart.rop.ManagementStructureId,
                            PartNumberId = roPart.rop.PartNumberId,
                            QuantityOrdered = roPart.rop.QuantityOrdered,
                            UOMId = roPart.rop.UOMId,
                            RoPartSplitAddress1 = roPart.rop.RoPartSplitAddress1,
                            RoPartSplitAddress2 = roPart.rop.RoPartSplitAddress2,
                            RoPartSplitAddress3 = roPart.rop.RoPartSplitAddress3,
                            RoPartSplitAddressId = roPart.rop.RoPartSplitAddressId,
                            RoPartSplitCity = roPart.rop.RoPartSplitCity,
                            RoPartSplitCountry = roPart.rop.RoPartSplitCountry,
                            RoPartSplitPostalCode = roPart.rop.RoPartSplitPostalCode,
                            RoPartSplitStateOrProvince = roPart.rop.RoPartSplitStateOrProvince,
                            RoPartSplitUserId = roPart.rop.RoPartSplitUserId,
                            RoPartSplitUserTypeId = roPart.rop.RoPartSplitUserTypeId,
                            NeedByDate = roPart.rop.NeedByDate,
                            StockLineId = _getStockLine(roPart.rop.RepairOrderId, roPart.rop.RepairOrderPartRecordId).StockLineId
                        };
                        if (repairOrderPartDto.RoPartSplits == null)
                        {
                            repairOrderPartDto.RoPartSplits = new List<RoPartSplits>();
                        }
                        repairOrderPartDto.RoPartSplits.Add(roPartSplit);
                    }
                }
            }
            else
            {
                repairOrderDtoList = null;
            }

            return repairOrderDtoList;
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
                                FunctionalCurrency = fcurr.DisplayName,
                                RerortCurrency = rcurr.DisplayName,
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
                  .SelectMany(y => y.RepairOrderPart);

                var repairOrder = _appContext.RepairOrder.Where(x => x.RepairOrderId == repairOrderId && x.IsDeleted == false).FirstOrDefault();
                var roNumber = repairOrder?.RepairOrderNumber;

                if (repairOrderPartList != null && repairOrderPartList.Any())
                {
                    foreach (var repairOrderPart in repairOrderPartList)
                    {
                        if (repairOrderPart.IsParent == true)
                        {
                            repairOrderPartViewDto = new RepairOrderPartViewDto();
                            repairOrderPartViewDto.PartNumber = _getItemMaster(repairOrderPart.ItemMasterId)?.PartNumber;
                            repairOrderPartViewDto.AltPartNumber = _getItemMaster(repairOrderPart.ItemMasterId)?.PartNumber;
                            repairOrderPartViewDto.PartDescription = _getItemMaster(repairOrderPart.ItemMasterId)?.PartDescription;
                            repairOrderPartViewDto.ItemType = _getItemType(repairOrderPart.ItemTypeId)?.Description;
                            repairOrderPartViewDto.Manufacturer = _getManufacturer(repairOrderPart.RepairOrderId);
                            repairOrderPartViewDto.GlAccount = _getGlAccountName(repairOrderPart.RepairOrderId);
                            repairOrderPartViewDto.UnitOfMeasure = _getUnitOfMeasure(repairOrderPart.RepairOrderId);
                            repairOrderPartViewDto.Condition = _getCondtion(repairOrderPart.ConditionId)?.Description;
                            repairOrderPartViewDto.FunctionalCurrency = _getCurrency(repairOrderPart.FunctionalCurrencyId)?.DisplayName;
                            repairOrderPartViewDto.ReportCurrency = _getCurrency(repairOrderPart.ReportCurrencyId)?.DisplayName;
                            repairOrderPartViewDto.WorkOrderNo = _getWorkOrder(repairOrderPart.WorkOrderId)?.WorkOrderNum;
                            repairOrderPartViewDto.SalesOrderNo = repairOrderPart.SalesOrderId;
                            repairOrderPartViewDto.RepairOrderId = repairOrderPart.RepairOrderId;
                            repairOrderPartViewDto.NeedByDate = repairOrderPart.NeedByDate;
                            repairOrderPartViewDto.QuantityOrdered = repairOrderPart.QuantityOrdered;
                            repairOrderPartViewDto.UnitCost = repairOrderPart.UnitCost;
                            repairOrderPartViewDto.DiscountPercent = repairOrderPart.DiscountPercent;
                            repairOrderPartViewDto.DiscountPerUnit = repairOrderPart.DiscountPerUnit;
                            repairOrderPartViewDto.DiscountAmount = repairOrderPart.DiscountAmount;
                            repairOrderPartViewDto.ExtendedCost = repairOrderPart.ExtendedCost;
                            repairOrderPartViewDto.ReportCurrencyId = repairOrderPart.ReportCurrencyId;
                            repairOrderPartViewDto.FunctionalCurrencyId = repairOrderPart.FunctionalCurrencyId;
                            repairOrderPartViewDto.ForeignExchangeRate = repairOrderPart.ForeignExchangeRate;
                            repairOrderPartViewDto.ManagementStructureId = repairOrderPart.ManagementStructureId;
                            repairOrderPartViewDto.StockLineNumber = _getStockLine(repairOrderPart.RepairOrderId, repairOrderPart.RepairOrderPartRecordId).StockLineNumber;
                            repairOrderPartViewDto.ControlId = _getStockLine(repairOrderPart.RepairOrderId, repairOrderPart.RepairOrderPartRecordId).IdNumber;
                            repairOrderPartViewDto.ControlNumber = _getStockLine(repairOrderPart.RepairOrderId, repairOrderPart.RepairOrderPartRecordId).ControlNumber;
                            repairOrderPartViewDto.RepairOrderNo = roNumber;
                            repairOrderPartViewDto.Memo = repairOrderPart.Memo;
                            returnObjects.Add(repairOrderPartViewDto);
                        }
                        else
                        {
                            repairOrderSplitPart = new RepairOrderSplitParts
                            {
                                RepairOrderPartRecordId = repairOrderPart.RepairOrderPartRecordId,
                                RepairOrderId = repairOrderPart.RepairOrderId,
                                ManagementStructureId = repairOrderPart.ManagementStructureId,
                                NeedByDate = repairOrderPart.NeedByDate,
                                QuantityOrdered = repairOrderPart.QuantityOrdered,
                                RoPartSplitAddress1 = repairOrderPart.RoPartSplitAddress1,
                                RoPartSplitAddress2 = repairOrderPart.RoPartSplitAddress2,
                                RoPartSplitAddress3 = repairOrderPart.RoPartSplitAddress3,
                                RoPartSplitCity = repairOrderPart.RoPartSplitCity,
                                RoPartSplitState = repairOrderPart.RoPartSplitStateOrProvince,
                                RoPartSplitPostalCode = repairOrderPart.RoPartSplitPostalCode,
                                RoPartSplitCountry = repairOrderPart.RoPartSplitCountry,
                                UnitOfMeasure = _getUnitOfMeasure(repairOrderPart.RepairOrderId),
                                PartNumber = _getItemMaster(repairOrderPart.ItemMasterId)?.PartNumber,
                                PartDescription = _getItemMaster(repairOrderPart.ItemMasterId)?.PartDescription,
                                UserType = repairOrderPart.RoPartSplitUserTypeId == 1
                                    ? "Customer"
                                    : (repairOrderPart.RoPartSplitUserTypeId == 2 ? "Vendor" : "Company"),
                                User = _getUser(repairOrderPart.RoPartSplitUserTypeId, repairOrderPart.RepairOrderId),
                                StockLineNumber = _getStockLine(repairOrderPart.RepairOrderId, repairOrderPart.RepairOrderPartRecordId).StockLineNumber,
                                ControlId = _getStockLine(repairOrderPart.RepairOrderId, repairOrderPart.RepairOrderPartRecordId).IdNumber,
                                ControlNumber = _getStockLine(repairOrderPart.RepairOrderId, repairOrderPart.RepairOrderPartRecordId).ControlNumber,
                            };
                            if (repairOrderPartViewDto.RepairOrderSplitParts == null)
                            {
                                repairOrderPartViewDto.RepairOrderSplitParts = new List<RepairOrderSplitParts>();
                            }
                            repairOrderPartViewDto.RepairOrderSplitParts.Add(repairOrderSplitPart);
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
                                join cus in _appContext.Customer on rop.RoPartSplitUserTypeId equals (int?)cus.CustomerId
                                where rop.RepairOrderId == repairOrderId
                                select new
                                {
                                    CustomerName = cus.Name,
                                }).FirstOrDefault();
                    user = test == null ? "" : test.CustomerName;
                    break;
                case 2:
                    var test2 = (from ro in _appContext.RepairOrder
                                 join v in _appContext.Vendor on ro.ShipToUserId equals v.VendorId
                                 where ro.RepairOrderId == repairOrderId
                                 select new
                                 {
                                     v.VendorName,
                                 }).FirstOrDefault();
                    user = test2 == null ? "" : test2.VendorName;
                    break;
                default:
                    var test3 = (from ro in _appContext.RepairOrder
                                 join le in _appContext.LegalEntity on ro.ShipToUserId equals le.LegalEntityId
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

        private StockLine _getStockLine(long repairOrderId, long repairOrderPartRecordId)
        {
            var stockLine = _appContext.StockLine
               .Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == repairOrderPartRecordId)
               .FirstOrDefault();

            return stockLine;
        }
    }
}
