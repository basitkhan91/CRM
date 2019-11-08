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

    }
}
