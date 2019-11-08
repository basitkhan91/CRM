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
        void WorkOrderStatus(long workOrderId, bool status, string updatedBy);
        IEnumerable<object> GetWorkOrdersList(int pageNo, int pageSize);
        IEnumerable<object> GetWorkOrderPartList(long workOrderId);
        WorkOrder WorkOrderById(long workOrderId);
        

        long CreateWorkFlowWorkOrder(WorkOrderWorkFlow workFlowWorkOrder);
        void UpdateWorkFlowWorkOrder(WorkOrderWorkFlow workFlowWorkOrder);
        WorkOrderWorkFlow GetWorkFlowWorkOrderById(long workFlowWorkOrderId);
        IEnumerable<object> GetWorkOrderWorkFlowNos(long workOrderId);
        IEnumerable<object> GetWorkOrderTaskAttributes(long workOrderTaskId);

        long CreateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor);
        void UpdateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor);
        WorkOrderLaborHeader GetWorkFlowWorkOrderLabourList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderCharges(WorkOrderCharges workOrderCharges);
        void UpdateWorkOrderCharges(WorkOrderCharges workOrderCharges);
        IEnumerable<WorkOrderCharges> GetWorkFlowWorkOrderChargesList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderAssets(WorkOrderAssets workOrderAssets);
        void UpdateWorkOrderAssets(WorkOrderAssets workOrderAssets);
        IEnumerable<object> GetWorkOrderAssetList(long wfwoId, long workOrderId);

        long CreateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions);
        void UpdateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions);
        IEnumerable<WorkOrderExclusions> GetWorkFlowWorkOrderExclusionsList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        void UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        IEnumerable<WorkOrderDocuments> GetWorkFlowWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderAddress(WorkOrderAddress workOrderAddress);
        void UpdateWorkOrderAddress(WorkOrderAddress workOrderAddress);
        IEnumerable<WorkOrderAddress> GetWorkFlowWorkOrderAddressList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderQuote(WorkOrderQuote workOrderQuote);
        void UpdateWorkOrderQuote(WorkOrderQuote workOrderQuote);
        WorkOrderQuote GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderFreight(WorkOrderFreight workOrderFreight);
        void UpdateWorkOrderFreight(WorkOrderFreight workOrderFreight);
        IEnumerable<WorkOrderFreight> GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0);

        IEnumerable<object> GetWorkFlowNos(long partId, long workScopeId);
        IEnumerable<object> GetWorkOrderPartDetails();
        IEnumerable<object> GetStockLineDetailsByPartNo(long itemMasterId);
        object GetPartSerialNo(long stockLineId, long conditionId);
        IEnumerable<object> GetPartPublications(long itemMasterId);
        IEnumerable<object> GetRevisedParts(long itemMasterId, int mappingType);
        IEnumerable<object> GetConditionDetailsByPartNo(long itemMasterId);

        IEnumerable<object> GetWorkOrderMaterialList(long wfwoId, long workOrderId);

    }
}
