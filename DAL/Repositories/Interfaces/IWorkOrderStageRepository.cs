using DAL.Common;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IWorkOrderStageRepository : IRepository<WorkOrderStage>
    {
        WorkOrderStage CreateWorkOrderStage(WorkOrderStage workOrderStage);
        WorkOrderStage UpdateWorkOrderStage(WorkOrderStage workOrderStage);
        IEnumerable<object> WorkOrderStageList(Filters<WorkOrderStageFilters> woFilters);
        void DeleteWorkOrderStage(long workOrderStageId,string updatedBy);
        void WorkOrderStageStatus(long workOrderStageId,bool status, string updatedBy);
        object WorkOrderStageById(long workOrderStageId);
    }
}
