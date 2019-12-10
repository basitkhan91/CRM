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
        object WorkOrderHeaderView(long workOrderId);
        IEnumerable<object> WorkOrderPartsView(long workOrderId);

        long CreateWorkFlowWorkOrder(WorkOrderWorkFlow workFlowWorkOrder);
        void UpdateWorkOrderWorkFlow(Workflow workflow);
        WorkOrderWorkFlow GetWorkFlowWorkOrderById(long workFlowWorkOrderId);
        IEnumerable<object> GetWorkOrderWorkFlowNos(long workOrderId);
        IEnumerable<object> GetWorkOrderTaskAttributes(long workOrderTaskId);
        object WorkOrderWorkFlowView(long workFlowWorkOrderId);
        object SubWorkOrderHeaderDetails(long workOrderId, long workOrderPartNumberId);



        long CreateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor);
        void UpdateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor);
        object GetWorkFlowWorkOrderLabourList(long wfwoId = 0, long workOrderId = 0);

        List<WorkOrderCharges> CreateWorkOrderCharges(List<WorkOrderCharges> workOrderCharges);
        List<WorkOrderCharges> UpdateWorkOrderCharges(List<WorkOrderCharges> workOrderCharges);
        IEnumerable<object> GetWorkFlowWorkOrderChargesList(long wfwoId = 0, long workOrderId = 0);
        void DeleteWorkOrderCharge(long workOrderChargeId, string updatedBy);

        List<WorkOrderAssets> CreateWorkOrderAssets(List<WorkOrderAssets> workOrderAssets);
        List<WorkOrderAssets> UpdateWorkOrderAssets(List<WorkOrderAssets> workOrderAssets);
        IEnumerable<object> GetWorkOrderAssetList(long wfwoId, long workOrderId);
        void SaveAssetCheckedIn(WorkOrderAssetCheckInOut workOrderAssetCheckInOut);
        void SaveAssetCheckedOut(WorkOrderAssetCheckInOut workOrderAssetCheckInOut);
        object GetAssetCheckedInandOutDetails(long assetRecordId, long workOrderAssetId);
        object WorkOrderAssetView(long assetRecordId);
        void DeleteWorkOrderAsset(long workOrderAssetId, string updatedBy);


        List<WorkOrderExclusions> CreateWorkOrderExclusions(List<WorkOrderExclusions> workOrderExclusions);
        List<WorkOrderExclusions> UpdateWorkOrderExclusions(List<WorkOrderExclusions> workOrderExclusions);
        IEnumerable<object> GetWorkFlowWorkOrderExclusionsList(long wfwoId = 0, long workOrderId = 0);
        void DeleteWorkOrderExclusions(long workOrderExclusionsId, string updatedBy);

        List<WorkOrderDocuments> CreateWorkOrderDocuments(List<WorkOrderDocuments> workOrderDocuments);
        void UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        IEnumerable<object> GetWorkFlowWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderAddress(WorkOrderAddress workOrderAddress);
        void UpdateWorkOrderAddress(WorkOrderAddress workOrderAddress);
        IEnumerable<WorkOrderAddress> GetWorkFlowWorkOrderAddressList(long wfwoId = 0, long workOrderId = 0);

        long CreateWorkOrderQuote(WorkOrderQuote workOrderQuote);
        void UpdateWorkOrderQuote(WorkOrderQuote workOrderQuote);
        object GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0);
        WorkOrderQuoteDetails CreateWorkOrderQuoteDetails(WorkOrderQuoteDetails workOrderQuoteDetails);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteDetails(WorkOrderQuoteDetails workOrderQuoteDetails);

        WorkOrderQuoteDetails CreateWorkOrderQuoteExclusions(WorkOrderQuoteDetails quoteExclusions);
        List<WorkOrderQuoteExclusions> UpdateWorkOrderQuoteExclusions(List<WorkOrderQuoteExclusions> quoteExclusions);
        IEnumerable<object> GetWorkOrderQuoteExclusions(long WorkOrderQuoteId);
        void DeleteWorkOrderQuoteExclusion(long exclusionId, string updatedBy);

        List<WorkOrderQuoteFreight> CreateWorkOrderQuoteFreight(List<WorkOrderQuoteFreight> quoteFreight);
        List<WorkOrderQuoteFreight> UpdateWorkOrderQuoteFreight(List<WorkOrderQuoteFreight> quoteFreight);
        IEnumerable<object> GetWorkOrderQuoteFreight(long WorkOrderQuoteId);
        void DeleteWorkOrderQuoteFreight(long freightId, string updatedBy);

        List<WorkOrderQuoteCharges> CreateWorkOrderQuoteCharges(List<WorkOrderQuoteCharges> quoteCharges);
        List<WorkOrderQuoteCharges> UpdateWorkOrderQuoteCharges(List<WorkOrderQuoteCharges> quoteCharges);
        IEnumerable<object> GetWorkOrderQuoteCharges(long WorkOrderQuoteId);
        void DeleteWorkOrderQuoteCharges(long workOrderChargeId, string updatedBy);


        List<WorkOrderQuoteMaterial> CreateWorkOrderQuoteMaterial(List<WorkOrderQuoteMaterial> quoteMaterials);
        List<WorkOrderQuoteMaterial> UpdateWorkOrderQuoteMaterial(List<WorkOrderQuoteMaterial> quoteMaterials);
        IEnumerable<object> GetWorkOrderQuoteMaterial(long WorkOrderQuoteId);
        void DeleteWorkOrderQuoteMaterial(long workOrderMaterialsId, string updatedBy);

        WorkOrderQuoteLaborHeader CreateWorkOrderQuoteLabor(WorkOrderQuoteLaborHeader quoteLabor);
        WorkOrderQuoteLaborHeader UpdateWorkOrderQuoteLabor(WorkOrderQuoteLaborHeader quoteLabor);
        object GetWorkOrderQuoteLabor(long WorkOrderQuoteId);
        void DeleteWorkOrderQuoteLabor(long workOrderQuoteLaborId, string updatedBy);







        long CreateWorkOrderFreight(WorkOrderFreight workOrderFreight);
        void UpdateWorkOrderFreight(WorkOrderFreight workOrderFreight);
        IEnumerable<object> GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0);

        IEnumerable<object> GetWorkFlowNos(long partId, long workScopeId);
        IEnumerable<object> GetWorkOrderNos(long partId, long workScopeId);
        IEnumerable<object> GetWorkOrderPartDetails();
        IEnumerable<object> GetStockLineDetailsByPartNo(long itemMasterId, long conditionId);
        object GetPartSerialNo(long stockLineId);
        IEnumerable<object> GetPartPublications(long itemMasterId);
        IEnumerable<object> GetRevisedParts(long itemMasterId, int mappingType);
        IEnumerable<object> GetConditionDetailsByPartNo(long itemMasterId);
        
        IEnumerable<object> GetTechnicians();

        List<WorkOrderPublications> CreateWorkOrderPublications(List<WorkOrderPublications> workOrderPublications);
        List<WorkOrderPublications> UpdateWorkOrderPublications(List<WorkOrderPublications> workOrderPublications);
        void DeleteWorkOrderPublication(long workOrderPublicationId, string updatedBy);
        void WorkOrderPublicationStatus(long workOrderPublicationId, bool status, string updatedBy);
        IEnumerable<object> GetWorkOrderPublications(long wfwoId, long workOrderId);


        List<WorkOrderMaterials> CreateWorkOrderMaterials(List<WorkOrderMaterials> workOrderMaterials);
        List<WorkOrderMaterials> UpdateWorkOrderMaterials(List<WorkOrderMaterials> workOrderMaterials);
        IEnumerable<object> GetWorkOrderMaterialList(long wfwoId, long workOrderId);
        void DeleteWorkOrderMaterials(long workOrderMaterialsId, string updatedBy);

        IEnumerable<WorkOrderReserveIssuesParts> GetReservedIssuedParts(long WorkFlowWorkOrderId, long workOrderId, int statusId);
        List<WorkOrderReserveIssuesParts> SaveReserveIssuesParts(List<WorkOrderReserveIssuesParts> reserveIssuesParts);
        IEnumerable<WorkOrderReserveIssuesParts> GetReservedParts(long WorkFlowWorkOrderId, long workOrderId);
        IEnumerable<WorkOrderReserveIssuesParts> GetUnReservedParts(long WorkFlowWorkOrderId, long workOrderId);
        IEnumerable<WorkOrderReserveIssuesParts> GetIssuedParts(long WorkFlowWorkOrderId, long workOrderId);
        IEnumerable<WorkOrderReserveIssuesParts> GetUnIssuedParts(long WorkFlowWorkOrderId, long workOrderId);

        IEnumerable<object> GetWorkOrderDirections(long wfwoId, long workOrderId);
        object GetStockLineDetails(long stockLineId);

        SubWorkOrder CreateSubWorkOrder(SubWorkOrder subWorkOrder);
        SubWorkOrder UpdateSubWorkOrder(SubWorkOrder subWorkOrder);
        object SubWorkOrderDetails(long subWorkOrderId);
        IEnumerable<object> SubWorkOrderList(long workOrderId);

    }
}
