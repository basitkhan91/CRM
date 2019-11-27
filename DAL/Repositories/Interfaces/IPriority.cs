

using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{


    public interface IPriority : IRepository<DAL.Models.Priority>
    {
        IEnumerable<DAL.Models.Priority> GetPriorities();
        IEnumerable<PriorityAudit> GetPriorityHistoryAudit(long priorityId); 

        //  void CreateAction(DAL.Models.Action action);

    }
}
