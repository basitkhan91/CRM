using DAL.Common;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IWorkOrderRepository : IRepository<WorkOrder>
    {
        IEnumerable<object> GetAllWorkOrderData();
        WorkOrder CreateWorkOrder(WorkOrder workOrder);
        WorkOrder UpdateWorkOrder(WorkOrder workOrder);
        void DeleteWorkOrder(long workOrderId);
        void WorkOrderStatus(long workOrderId, bool status, string updatedBy);
        IEnumerable<object> GetWorkOrdersList(Filters<WorkOrderFilters> woFilters);
        IEnumerable<object> WorkOrdersGlobalSearch(string filterText, int pageNumber, int pageSize);
        IEnumerable<object> GetWorkOrderPartList(long workOrderId);
        WorkOrder WorkOrderById(long workOrderId, long receivingCustomerId);
        
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
        IEnumerable<object> WorkOrderAssetHistory(long workOrderAssetId);


        List<WorkOrderExclusions> CreateWorkOrderExclusions(List<WorkOrderExclusions> workOrderExclusions);
        List<WorkOrderExclusions> UpdateWorkOrderExclusions(List<WorkOrderExclusions> workOrderExclusions);
        IEnumerable<object> GetWorkFlowWorkOrderExclusionsList(long wfwoId = 0, long workOrderId = 0);
        void DeleteWorkOrderExclusions(long workOrderExclusionsId, string updatedBy);

        WorkOrderDocuments CreateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        WorkOrderDocuments UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments);
        IEnumerable<object> GetWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0);
        WorkOrderDocuments GetWorkOrderDocumentsDetailById(long id);
        void WorkOrderDocumentStatus(long workOrderDocumentsId, bool status, string updatedBy);
        void DeleteWorkOrderDocuments(long workOrderDocumentsId, string updatedBy);

        long CreateWorkOrderAddress(WorkOrderAddress workOrderAddress);
        void UpdateWorkOrderAddress(WorkOrderAddress workOrderAddress);
        IEnumerable<WorkOrderAddress> GetWorkFlowWorkOrderAddressList(long wfwoId = 0, long workOrderId = 0);

        WorkOrderQuote CreateWorkOrderQuote(WorkOrderQuote workOrderQuote);
        WorkOrderQuote UpdateWorkOrderQuote(WorkOrderQuote workOrderQuote);
        object GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0);
        object WorkOrderQuoteExists(long workOrderId);
        WorkOrderQuoteDetails CreateWorkOrderQuoteDetails(WorkOrderQuoteDetails workOrderQuoteDetails);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteDetails(WorkOrderQuoteDetails workOrderQuoteDetails);

        WorkOrderQuoteDetails CreateWorkOrderQuoteExclusions(WorkOrderQuoteDetails quoteExclusions);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteExclusions(WorkOrderQuoteDetails quoteExclusions);
        IEnumerable<object> GetWorkOrderQuoteExclusions(long WorkOrderQuoteId, long buildMethodId);
        void DeleteWorkOrderQuoteExclusion(long exclusionId, string updatedBy);

        WorkOrderQuoteDetails CreateWorkOrderQuoteFreight(WorkOrderQuoteDetails quoteFreight);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteFreight(WorkOrderQuoteDetails quoteFreight);
        IEnumerable<object> GetWorkOrderQuoteFreight(long WorkOrderQuoteId, long buildMethodId);
        void DeleteWorkOrderQuoteFreight(long freightId, string updatedBy);

        WorkOrderQuoteDetails CreateWorkOrderQuoteCharges(WorkOrderQuoteDetails quoteCharges);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteCharges(WorkOrderQuoteDetails quoteCharges);
        IEnumerable<object> GetWorkOrderQuoteCharges(long WorkOrderQuoteId, long buildMethodId);
        void DeleteWorkOrderQuoteCharges(long workOrderChargeId, string updatedBy);


        WorkOrderQuoteDetails CreateWorkOrderQuoteMaterial(WorkOrderQuoteDetails quoteMaterials);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteMaterial(WorkOrderQuoteDetails quoteMaterials);
        IEnumerable<object> GetWorkOrderQuoteMaterial(long WorkOrderQuoteId, long buildMethodId);
        void DeleteWorkOrderQuoteMaterial(long workOrderMaterialsId, string updatedBy);

        WorkOrderQuoteDetails CreateWorkOrderQuoteLabor(WorkOrderQuoteDetails quoteLabor);
        WorkOrderQuoteDetails UpdateWorkOrderQuoteLabor(WorkOrderQuoteDetails quoteLabor);
        object GetWorkOrderQuoteLabor(long WorkOrderQuoteId, long buildMethodId);
        void DeleteWorkOrderQuoteLabor(long workOrderQuoteLaborId, string updatedBy);

        object GetWorkOrderQuoteDetails(long workOrderId);

        IEnumerable<object> WorkOrderQuoteList(Filters<WOQuoteFilters> woQuoteFilters);
        object WorkOrderQuoteView(long workOrderQuoteId);


        List<WorkOrderFreight> CreateWorkOrderFreight(List<WorkOrderFreight> workOrderFreight);
        List<WorkOrderFreight> UpdateWorkOrderFreight(List<WorkOrderFreight> workOrderFreight);
        IEnumerable<object> GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0);
        void DeleteWorkOrderFreight(long workOrderFreightId, string updatedBy);

        IEnumerable<object> GetWorkFlowNos(long partId, long workScopeId);
        IEnumerable<object> GetHistoricalWorkOrders(Common.Filters<HistoricalWOFilter> woFilters);
        IEnumerable<object> GetWorkOrderPartDetails(long customerId);
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

        WorkOrderBillingInvoicing CreateWorkOrderBillingInvoicing(WorkOrderBillingInvoicing billingInvoicing);
        WorkOrderBillingInvoicing UpdateWorkOrderBillingInvoicing(WorkOrderBillingInvoicing billingInvoicing);
        object GetBillingInvoicingDetails(long WorkOrderId, long workOrderPartNoId);

        IEnumerable<object> WorkOrderROlist();

        object GetWorkOrderPartDetailsById(long workOrderPartNoId);
        object GetWorkOrderStageandStatus();
        object GetNTESTDValues(long itemMasterId, string workScope);

        object GetQuoteBuildMethodDetails(long workflowWorkorderId);
        IEnumerable<object> HistoricalWorkOrderQuotes(Filters<WOQuoteFilters> woQuoteFilters);


        WorkOrderTeardown CreateTeardown(WorkOrderTeardown tearDown);
        WorkOrderTeardown GetWorkOrderTeardown(long wowfId);
        object WorkOrderTeardownView(long wowfId);


        object WorkOrderAnalysis(long workOrderId);
        WorkOrderSettings CreateWorkOrderSettings(WorkOrderSettings workOrderSettings);
        WorkOrderSettings GetWorkOrderSettings(int masterCompanyId, int? workOrderTypeId);
    }
}
