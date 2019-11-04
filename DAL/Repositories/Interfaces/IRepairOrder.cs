using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IRepairOrder : IRepository<RepairOrder>
    {
        IEnumerable<object> RecevingRolist();
    }
}
