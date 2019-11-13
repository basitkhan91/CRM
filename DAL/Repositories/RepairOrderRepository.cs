﻿using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
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
                          join rop in _appContext.RepairOrderPart on ro.RepairOrderId equals rop.RepairOrderId
                          join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                          join sl in _appContext.StockLine on ro.RepairOrderId equals sl.RepairOrderId
                          join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                          select new
                          {
                              Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                              NoOfItems = sl.Quantity,
                              RoNumber = ro.RepairOrderNumber,
                              Currency = v.CurrencyId, // Get currency
                              RoTotalCost = sl.RepairOrderUnitCost, // Not sure if this is accurate
                              VendorName = v.VendorName,
                              VendorContact = ro.VendorContactId, // TODO = Do we need another join to get name?
                              EmployeeName = emp.EmployeeId, // TODO = Do we need another join to get name?
                              ContactPhone = emp.WorkPhone, //TODO = added work phone for now, is this correct?
                              OpenDate = ro.CreatedDate,
                              Reference = sl.ShippingReference,
                              RequestedBy = "Test" // TODO = Did not find any recored here, where to get this from.
                          }).Distinct()
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
            if (roFilters.filters.Status == "Open")
            {
                statusId = 1;
            }
            else if (roFilters.filters.Status == "Pending")
            {
                statusId = 2;
            }
            else if (roFilters.filters.Status == "Fulfilling")
            {
                statusId = 3;
            }
            else if (roFilters.filters.Status == "Closed")
            {
                statusId = 4;
            }

            var totalRecords = (from ro in _appContext.RepairOrder
                                join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                                join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                join appr in _appContext.Employee on ro.ApproverId equals appr.EmployeeId into approver
                                from appr in approver.DefaultIfEmpty()
                                where ro.IsDeleted == false
                                      && ro.RepairOrderNumber.Contains(!String.IsNullOrEmpty(roFilters.filters.RepairOrderNo) ? roFilters.filters.RepairOrderNo : ro.RepairOrderNumber)
                                      && v.VendorName.Contains(!String.IsNullOrEmpty(roFilters.filters.VendorName) ? roFilters.filters.VendorName : v.VendorName)
                                      && v.VendorCode.Contains(!String.IsNullOrEmpty(roFilters.filters.VendorCode) ? roFilters.filters.VendorCode : v.VendorCode)
                                      && ro.StatusId == (statusId > 0 ? statusId : ro.StatusId)
                                      && emp.FirstName.Contains(!String.IsNullOrEmpty(roFilters.filters.ApprovedBy) ? roFilters.filters.ApprovedBy : emp.FirstName)
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
                                   && ro.RepairOrderNumber.Contains(!String.IsNullOrEmpty(roFilters.filters.RepairOrderNo) ? roFilters.filters.RepairOrderNo : ro.RepairOrderNumber)
                                   && v.VendorName.Contains(!String.IsNullOrEmpty(roFilters.filters.VendorName) ? roFilters.filters.VendorName : v.VendorName)
                                   && v.VendorCode.Contains(!String.IsNullOrEmpty(roFilters.filters.VendorCode) ? roFilters.filters.VendorCode : v.VendorCode)
                                   && ro.StatusId == (statusId > 0 ? statusId : ro.StatusId)
                                   && emp.FirstName.Contains(!String.IsNullOrEmpty(roFilters.filters.ApprovedBy) ? roFilters.filters.ApprovedBy : emp.FirstName)
                                   select new
                                   {
                                       ro.RepairOrderId,
                                       ro.RepairOrderNumber,
                                       OpenDate = ro.OpenDate,
                                       ClosedDate = ro.ClosedDate,
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
                                Status = ro.StatusId == 1 ? "Open" : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                pr.Description,
                                v.CreditLimit,
                                CreditTerm = ct.Name,
                                ro.Resale,
                                ro.RoMemo,
                                ro.DeferredReceiver,
                                ShipToUserType = ro.ShipToUserTypeId == 1 ? "Customer" : (ro.ShipToUserTypeId == 2 ? "Vendor" : "Company"),
                                ShipToUser = ro.ShipToUserId == 1 ? shcust.Name : (ro.ShipToUserTypeId == 2 ? shv.VendorName : shcomp.Name),
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
                                BillToUser = ro.BillToUserId == 1 ? blcust.Name : (ro.BillToUserTypeId == 2 ? blv.VendorName : blcomp.Name),
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
            catch (Exception)
            {

                throw;
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
                               select new
                               {
                                   rop
                               }).ToList();

            var repairOrderDtoList = new List<RepairOrderPartDto>();

            var repairOrderPartDto = new RepairOrderPartDto();
            repairOrderPartDto.RoPartSplits = new List<RoPartSplits>();
            if (roPartsList != null && roPartsList.Any())
            {
                foreach (var roPart in roPartsList)
                {
                    if (roPart.rop.IsParent == true)
                    {
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
                    }
                    else
                    {
                        var roPartSplit = new RoPartSplits()
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
                            NeedByDate = roPart.rop.NeedByDate

                        };
                        repairOrderPartDto.RoPartSplits.Add(roPartSplit);
                    }
                }

                repairOrderDtoList.Add(repairOrderPartDto);
            }

            return repairOrderDtoList;
        }
    }
}
