using DAL.Common;
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
                                 where ro.RepairOrderId == repairOrderId
                                 select new
                                 {
                                     RepairOrderId = ro.RepairOrderId,
                                     RepairOrderNumber = ro.RepairOrderNumber,
                                     OpenDate = ro.OpenDate,
                                     ClosedDate = DateTime.Now,
                                     VendorName = ro.VendorName,
                                     VendorCode = ro.VendorCode,
                                     Status = ro.StatusId == 1
                                         ? "Open"
                                         : (ro.StatusId == 2 ? "Pending" : (ro.StatusId == 3 ? "Fulfilling" : "Closed")),
                                     RequestedBy = ro.RequisitionerId,
                                     ApprovedBy = emp.FirstName + " " + emp.LastName,
                                     UpdatedDate = ro.UpdatedDate,
                                     IsActive = ro.IsActive
                                 }).Distinct().ToList();

            return roHistoryList;
        }

         public IEnumerable<object> GetRepairOrderlist(Filters<RepairOrderFilters> roFilters)
        {
          if (roFilters.filters == null)
              roFilters.filters = new RepairOrderFilters();
            var pageNumber = roFilters.first + 1;
            var take = roFilters.rows;
            var skip = take * (pageNumber - 1);

            var totalRecords = (from ro in _appContext.RepairOrder
                                join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                                join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                where ro.IsActive == false
                                && ro.RepairOrderNumber.Contains(!String.IsNullOrEmpty(roFilters.filters.RepairOrderNumber) ? roFilters.filters.RepairOrderNumber : ro.RepairOrderNumber)
                                && v.VendorName.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorName) ? roFilters.filters.VendorName : v.VendorName)
                                && v.VendorCode.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorCode) ? roFilters.filters.VendorCode : v.VendorCode)
                                && ro.StatusId == (roFilters.filters.StatusId > 0 ? roFilters.filters.StatusId : ro.StatusId)
                               select new
                                {
                                    ro.RepairOrderId

                                }).Distinct()
                                    .Count();

            var repairOrderList = (from ro in _appContext.RepairOrder
                                    join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                                    join v in _appContext.Vendor on ro.VendorId equals v.VendorId
                                    where ro.IsActive == false
                                          && ro.RepairOrderNumber.Contains(!String.IsNullOrEmpty(roFilters.filters.RepairOrderNumber) ? roFilters.filters.RepairOrderNumber : ro.RepairOrderNumber)
                                          && v.VendorName.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorName) ? roFilters.filters.VendorName : v.VendorName)
                                          && v.VendorCode.Contains(!string.IsNullOrEmpty(roFilters.filters.VendorCode) ? roFilters.filters.VendorCode : v.VendorCode)
                                          && ro.StatusId == (roFilters.filters.StatusId > 0 ? roFilters.filters.StatusId : ro.StatusId)
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
                                         //ApprovedBy = appr==null?"": appr.FirstName,
                                         ApprovedBy = "Test",
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
}
