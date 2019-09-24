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


        long CreateWorkFlowWorkOrder(WorkFlowWorkOrder workFlowWorkOrder);
        void UpdateWorkFlowWorkOrder(WorkFlowWorkOrder workFlowWorkOrder);


        long CreateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor);
        void UpdateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor);
        WorkOrderLaborHeader GetWorkFlowWorkOrderLabourList(long wfwoId = 0, long workOrderId = 0);


        long CreateWorkOrderCharges(WorkOrderCharges workOrderCharges);
        void UpdateWorkOrderCharges(WorkOrderCharges workOrderCharges);
        IEnumerable<WorkOrderCharges> GetWorkFlowWorkOrderChargesList(long wfwoId = 0, long workOrderId = 0);


        long CreateWorkOrderAssets(WorkOrderAssets workOrderAssets);
        void UpdateWorkOrderAssets(WorkOrderAssets workOrderAssets);
        IEnumerable<WorkOrderAssets> GetWorkFlowWorkOrderAssetsList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions);
        void UpdateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions);
        IEnumerable<WorkOrderExclusions> GetWorkFlowWorkOrderExclusionsList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        void UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        IEnumerable<WorkOrderDocuments> GetWorkFlowWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0);

        void CreateWorkFlowWorkOrderForWorkFlow1(long workFlowId);

    }
}
