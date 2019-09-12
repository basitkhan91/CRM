using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IWorkOrderRepository : IRepository<WorkOrder>
    {
        IEnumerable<object> GetAllWorkOrderData();
        WorkOrder CreateWorkOrder(WorkOrder workOrder);
        WorkOrder UpdateWorkOrder(WorkOrder workOrder);
        void DeleteWorkOrder(long workOrderId);
        void WorkOrderStatus(long workOrderId, bool status);
        GetData<WorkOrderList> GetWorkOrdersList(WorkOrderList workOrderList);
        WorkOrder WorkOrderById(long workOrderId);
        Dictionary<long, string> GetWorkFlowNos(long partId, long workScopeId);
    }
}
