using DAL.Models;
using DAL.Repositories.Interfaces;
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
    }
}
