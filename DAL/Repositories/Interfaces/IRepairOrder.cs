using DAL.Common;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IRepairOrder : IRepository<RepairOrder>
    {
        IEnumerable<object> RecevingRolist();
        IEnumerable<object> RoHistoryList(int repairOrderId);
        IEnumerable<object> GetRepairOrderlist(Filters<RepairOrderFilters> roFilters);
        IEnumerable<object> GetRoApproversList(long repairOrderId);
        object RepairOrderView(long repairOrderId);
        object RepairOrderById(long repairOrderId);
        object RepairOrderPartsById(long repairOrderId);
        List<RepairOrderPartViewDto> GetRepairOrderPartsView(long repairOrderId);
    }
}
