﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{
    [Route("api/workorder")]
    public class WorkOrderController : Controller
    {

        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public WorkOrderController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Work Order

        [HttpGet("workorderbyid")]
        public IActionResult WorkOrderById(long workOrderId)
        {
            var workOrder = unitOfWork.WorkOrderRepository.WorkOrderById(workOrderId);
            return Ok(workOrder);
        }

        [HttpPost("createworkorder")]
        public IActionResult Add([FromBody] WorkOrder workOrder)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.WorkOrderRepository.CreateWorkOrder(workOrder);
                   return Ok(workOrder);
                }    
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("updateworkorder")]
        public IActionResult UpdateWorkOrder([FromBody] WorkOrder workOrder)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.WorkOrderRepository.UpdateWorkOrder(workOrder);
                    return Ok(workOrder);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deleteworkorder")]
        public IActionResult DeleteWorkOrder(long workOrderId)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrder(workOrderId);
            return Ok(ModelState);
        }

        [HttpGet("updateworkorderstatus")]
        public IActionResult WorkOrderStatus(long workOrderId,bool status,string updatedBy)
        {
            unitOfWork.WorkOrderRepository.WorkOrderStatus(workOrderId, status, updatedBy);
            return Ok(ModelState);
        }

        [HttpPost("workorderlist")]
        public IActionResult GetWorkOrdersList([FromBody]Filters<WorkOrderFilters> woFilters)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrdersList(woFilters);
            return Ok(result);
        }


        [HttpGet("woglobalsearch")]
        public IActionResult WorkOrdersGlobalSearch(string filterText, int pageNumber=0, int pageSize=10)
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrdersGlobalSearch(filterText, pageNumber, pageSize);
            return Ok(result);
        }


        [HttpGet("workorderpartlist")]
        public IActionResult GetWorkOrderPartList(long workOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderPartList(workOrderId);
            return Ok(result);
        }

        [HttpGet("workflownos")]
        public IActionResult GetWorkFlowNos(long partId, long workScopeId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowNos(partId, workScopeId);
            return Ok(result);
        }

        [HttpGet("workordernos")]
        public IActionResult GetWorkOrderNos(long partId, long workScopeId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderNos(partId, workScopeId);
            return Ok(result);
        }

        [HttpGet("workorderheaderview")]
        public IActionResult WorkOrderHeaderView(long workOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrderHeaderView(workOrderId);
            return Ok(result);
        }

        [HttpGet("workorderpartsview")]
        public IActionResult WorkOrderPartsView(long workOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrderPartsView(workOrderId);
            return Ok(result);
        }

        #endregion

        #region Sub Work Order

        [HttpPost("createsubworkorder")]
        public IActionResult CreateSubWorkOrder([FromBody] SubWorkOrder subWorkOrder)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.WorkOrderRepository.CreateSubWorkOrder(subWorkOrder);
                    return Ok(subWorkOrder);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("updatesubworkorder")]
        public IActionResult UpdateSubWorkOrder([FromBody] SubWorkOrder subWorkOrder)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.WorkOrderRepository.UpdateSubWorkOrder(subWorkOrder);
                    return Ok(subWorkOrder);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("subworkorderdetails")]
        public IActionResult SubWorkOrderDetails(long subWorkOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.SubWorkOrderDetails(subWorkOrderId);
			if(result != null)
			{
				return Ok(result);
			}else
			{
				return NotFound();
			}
           
        }

        [HttpGet("subworkorderlist")]
        public IActionResult SubWorkOrderList(long workOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.SubWorkOrderList(workOrderId);
            return Ok(result);
        }

        [HttpGet("subworkorderheaderdetails")]
        public IActionResult SubWorkOrderHeaderDetails(long workOrderId, long workOrderPartNumberId)
        {
            var result = unitOfWork.WorkOrderRepository.SubWorkOrderHeaderDetails(workOrderId, workOrderPartNumberId);
			if(result != null)
			{
				return Ok(result);
			}else
			{
				return NotFound();
			}
        
        }

        #endregion

        #region Work Flow Work Order

        [HttpPost("createworkflowworkorder")]
        public IActionResult CreateWorkFlowWorkOrder([FromBody]WorkOrderWorkFlow workFlowWorkOrder)
        {
            if (ModelState.IsValid)
            {
                workFlowWorkOrder.WorkFlowWorkOrderId = unitOfWork.WorkOrderRepository.CreateWorkFlowWorkOrder(workFlowWorkOrder);
                return Ok(workFlowWorkOrder);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
            
        }

        [HttpGet("workflowworkorderbyid")]
        public IActionResult GetWorkFlowWorkOrderById(long workFlowWorkOrderId)
        {
                var result=unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderById(workFlowWorkOrderId);
                return Ok(result);
        }

        [HttpGet("workorderworkflownos")]
        public IActionResult GetWorkOrderWorkFlowNos(long workOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderWorkFlowNos(workOrderId);
            return Ok(result);
        }

        [HttpGet("Wotaskattributes")]
        public IActionResult GetWorkOrderTaskAttributes(long workOrderTaskId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderTaskAttributes(workOrderTaskId);
            return Ok(result);
        }

        [HttpGet("workorderworkflowview")]
        public IActionResult WorkOrderWorkFlowView(long workFlowWorkOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrderWorkFlowView(workFlowWorkOrderId);
            return Ok(result);
        }

        [HttpGet("wopartdetailsbyid")]
        public IActionResult GetWorkOrderPartDetailsById(long workOrderPartNoId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderPartDetailsById(workOrderPartNoId);
            return Ok(result);
        }


        #endregion

        #region Work Order Labor

        [HttpPost("createworkorderlabor")]
        public IActionResult CreateWorkOrderLabor([FromBody]WorkOrderLaborHeader workOrderLabor)
        {
            if (ModelState.IsValid)
            {
                workOrderLabor.WorkOrderLaborHeaderId = unitOfWork.WorkOrderRepository.CreateWorkOrderLabor(workOrderLabor);
                return Ok(workOrderLabor);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderlabor")]
        public IActionResult UpdateWorkOrderLabor([FromBody]WorkOrderLaborHeader workOrderLabor)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderLabor(workOrderLabor);
                return Ok(workOrderLabor);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkflowworkorderlabourlist")]
        public IActionResult GetWorkFlowWorkOrderLabourList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderLabourList(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Work Order Charges

        [HttpPost("createworkordercharges")]
        public IActionResult CreateWorkOrderCharges([FromBody]List<WorkOrderCharges> workOrderCharges)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderCharges(workOrderCharges);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkordercharges")]
        public IActionResult UpdateWorkOrderCharges([FromBody]List<WorkOrderCharges> workOrderCharges)
        {
            if (ModelState.IsValid)
            {
                var reult=unitOfWork.WorkOrderRepository.UpdateWorkOrderCharges(workOrderCharges);
                return Ok(reult);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkflowworkorderchargeslist")]
        public IActionResult GetWorkFlowWorkOrderChargesList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderChargesList(wfwoId, workOrderId);
            return Ok(result);
        }

        [HttpGet("deleteworkordercharge")]
        public IActionResult DeleteWorkOrderCharge(long workOrderChargeId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderCharge(workOrderChargeId, updatedBy);
            return Ok();
        }


        #endregion

        #region Work Order Assets

        [HttpPost("createworkorderassets")]
        public IActionResult CreateWorkOrderAssets([FromBody]List<WorkOrderAssets> workOrderAssets)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderAssets(workOrderAssets);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderassets")]
        public IActionResult UpdateWorkOrderAssets([FromBody]List<WorkOrderAssets> workOrderAssets)
        {
            if (ModelState.IsValid)
            {
                var result=unitOfWork.WorkOrderRepository.UpdateWorkOrderAssets(workOrderAssets);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("workorderassetlist")]
        public IActionResult GetWorkOrderAssetList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderAssetList(wfwoId, workOrderId);
            return Ok(result);
        }

        [HttpPost("saveassetcheckedin")]
        public IActionResult SaveAssetCheckedIn([FromBody]WorkOrderAssetCheckInOut workOrderAssetCheckInOut)
        {
             unitOfWork.WorkOrderRepository.SaveAssetCheckedIn(workOrderAssetCheckInOut);
            return Ok();
        }

        [HttpPost("saveassetcheckedout")]
        public IActionResult SaveAssetCheckedOut([FromBody]WorkOrderAssetCheckInOut workOrderAssetCheckInOut)
        {
            unitOfWork.WorkOrderRepository.SaveAssetCheckedOut(workOrderAssetCheckInOut);
            return Ok();
        }

        [HttpGet("assetcheckedinandoutdetails")]
        public IActionResult GetAssetCheckedInandOutDetails(long assetRecordId=0, long workOrderAssetId=0)
        {
            var result = unitOfWork.WorkOrderRepository.GetAssetCheckedInandOutDetails(assetRecordId, workOrderAssetId);
            return Ok(result);
        }

        [HttpGet("workorderassetview")]
        public IActionResult WorkOrderAssetView(long assetRecordId)
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrderAssetView(assetRecordId);
            return Ok(result);
        }

        [HttpGet("deleteworkorderasset")]
        public IActionResult DeleteWorkOrderAsset(long workOrderAssetId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderAsset(workOrderAssetId, updatedBy);
            return Ok();
        }

        #endregion

        #region Work Order Exclusions

        [HttpPost("createworkorderexclusions")]
        public IActionResult CreateWorkOrderExclusions([FromBody]List<WorkOrderExclusions> workOrderExclusions)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderExclusions(workOrderExclusions);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderexclusions")]
        public IActionResult UpdateWorkOrderExclusions([FromBody]List<WorkOrderExclusions> workOrderExclusions)
        {
            if (ModelState.IsValid)
            {
                var result=unitOfWork.WorkOrderRepository.UpdateWorkOrderExclusions(workOrderExclusions);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkflowworkorderexclusionslist")]
        public IActionResult GetWorkFlowWorkOrderExclusionsList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderExclusionsList(wfwoId, workOrderId);
            return Ok(result);
        }

        [HttpGet("deleteworkorderexclusions")]
        public IActionResult DeleteWorkOrderExclusions(long workOrderExclusionsId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderExclusions(workOrderExclusionsId, updatedBy);
            return Ok();
        }

        

        #endregion

        #region Work Order Documents

        [HttpPost("createworkorderdocuments")]
        public IActionResult CreateWorkOrderDocuments([FromBody]List<WorkOrderDocuments> workOrderDocuments)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderDocuments(workOrderDocuments);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderdocuments")]
        public IActionResult UpdateWorkOrderDocuments([FromBody]WorkOrderDocuments workOrderDocuments)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderDocuments(workOrderDocuments);
                return Ok(workOrderDocuments);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkflowworkorderdocumentslist")]
        public IActionResult GetWorkFlowWorkOrderDocumentsList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderDocumentsList(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Work Order Address

        [HttpPost("createworkorderaddress")]
        public IActionResult CreateWorkOrderAddress([FromBody]WorkOrderAddress workOrderAddress)
        {
            if (ModelState.IsValid)
            {
                workOrderAddress.WorkOrderAddressId = unitOfWork.WorkOrderRepository.CreateWorkOrderAddress(workOrderAddress);
                return Ok(workOrderAddress);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderaddress")]
        public IActionResult UpdateWorkOrderAddress([FromBody]WorkOrderAddress workOrderAddress)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderAddress(workOrderAddress);
                return Ok(workOrderAddress);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkflowworkorderaddresslist")]
        public IActionResult GetWorkFlowWorkOrderAddressList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderAddressList(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Work Order Quote

        [HttpPost("createworkorderquote")]
        public IActionResult CreateWorkOrderQuote([FromBody]WorkOrderQuote workOrderQuote)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuote(workOrderQuote);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderquote")]
        public IActionResult UpdateWorkOrderQuote([FromBody]WorkOrderQuote workOrderQuote)
        {
            if (ModelState.IsValid)
            {
               var result= unitOfWork.WorkOrderRepository.UpdateWorkOrderQuote(workOrderQuote);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkorderquote")]
        public IActionResult GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderQuote(wfwoId, workOrderId);
            return Ok(result);
        }

        [HttpGet("workorderquoteexists")]
        public IActionResult WorkOrderQuoteExists(long workOrderId)
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrderQuoteExists(workOrderId);
            return Ok(result);
        }

        [HttpPost("createwoquotedetails")]
        public IActionResult CreateWorkOrderQuoteDetails([FromBody]WorkOrderQuoteDetails workOrderQuoteDetails)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuoteDetails(workOrderQuoteDetails);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatewoquotedetails")]
        public IActionResult UpdateWorkOrderQuoteDetails([FromBody]WorkOrderQuoteDetails workOrderQuoteDetails)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderQuoteDetails(workOrderQuoteDetails);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("createquoteexclusions")]
        public IActionResult CreateWorkOrderQuoteExclusions([FromBody]WorkOrderQuoteDetails quoteExclusions)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuoteExclusions(quoteExclusions);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatequoteexclusions")]
        public IActionResult UpdateWorkOrderQuoteExclusions([FromBody]WorkOrderQuoteDetails quoteExclusions)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderQuoteExclusions(quoteExclusions);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("quoteexclusions")]
        public IActionResult GetWorkOrderQuoteExclusions(long workOrderQuoteId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderQuoteExclusions(workOrderQuoteId);
            return Ok(result);
        }

        [HttpGet("deletequoteexclusions")]
        public IActionResult DeleteWorkOrderQuoteExclusion(long exclusionId, string updatedBy)
        {
             unitOfWork.WorkOrderRepository.DeleteWorkOrderQuoteExclusion(exclusionId, updatedBy);
            return Ok();
        }

        [HttpPost("createquotefreight")]
        public IActionResult CreateWorkOrderQuoteFreight([FromBody]WorkOrderQuoteDetails quoteFreight)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuoteFreight(quoteFreight);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatequotefreight")]
        public IActionResult UpdateWorkOrderQuoteFreight([FromBody]WorkOrderQuoteDetails quoteFreight)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderQuoteFreight(quoteFreight);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("quotefreights")]
        public IActionResult GetWorkOrderQuoteFreight(long workOrderQuoteId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderQuoteFreight(workOrderQuoteId);
            return Ok(result);
        }

        [HttpGet("deletequotefreight")]
        public IActionResult DeleteWorkOrderQuoteFreight(long freightId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderQuoteFreight(freightId, updatedBy);
            return Ok();
        }

        [HttpPost("createquotecharges")]
        public IActionResult CreateWorkOrderQuoteCharges([FromBody]WorkOrderQuoteDetails quoteCharges)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuoteCharges(quoteCharges);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatequotecharges")]
        public IActionResult UpdateWorkOrderQuoteCharges([FromBody]WorkOrderQuoteDetails quoteCharges)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderQuoteCharges(quoteCharges);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("quotecharges")]
        public IActionResult GetWorkOrderQuoteCharges(long WorkOrderQuoteId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderQuoteCharges(WorkOrderQuoteId);
            return Ok(result);
        }

        [HttpGet("deletequotecharge")]
        public IActionResult DeleteWorkOrderQuoteCharges(long workOrderChargeId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderQuoteCharges(workOrderChargeId, updatedBy);
            return Ok();
        }

        [HttpPost("createquotematerials")]
        public IActionResult CreateWorkOrderQuoteMaterial([FromBody]WorkOrderQuoteDetails quoteMaterials)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuoteMaterial(quoteMaterials);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatequotematerials")]
        public IActionResult UpdateWorkOrderQuoteMaterial([FromBody]WorkOrderQuoteDetails quoteMaterials)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderQuoteMaterial(quoteMaterials);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("quotematerials")]
        public IActionResult GetWorkOrderQuoteMaterial(long WorkOrderQuoteId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderQuoteMaterial(WorkOrderQuoteId);
            return Ok(result);
        }

        [HttpGet("deletequotematerial")]
        public IActionResult DeleteWorkOrderQuoteMaterial(long workOrderMaterialsId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderQuoteCharges(workOrderMaterialsId, updatedBy);
            return Ok();
        }

        [HttpPost("createquotelabor")]
        public IActionResult CreateWorkOrderQuoteLabor([FromBody]WorkOrderQuoteDetails quoteLabor)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderQuoteLabor(quoteLabor);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatequotelabor")]
        public IActionResult UpdateWorkOrderQuoteLabor([FromBody]WorkOrderQuoteDetails quoteLabor)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderQuoteLabor(quoteLabor);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("quotelabor")]
        public IActionResult GetWorkOrderQuoteLabor(long WorkOrderQuoteId)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderQuoteLabor(WorkOrderQuoteId);
            return Ok(result);
        }

        [HttpGet("deletequotelabor")]
        public IActionResult DeleteWorkOrderQuoteLabor(long workOrderQuoteLaborId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderQuoteLabor(workOrderQuoteLaborId, updatedBy);
            return Ok();
        }


        #endregion

        #region Work Order Freight

        [HttpPost("createworkorderfreight")]
        public IActionResult CreateWorkOrderFreight([FromBody]WorkOrderFreight workOrderFreight)
        {
            if (ModelState.IsValid)
            {
                workOrderFreight.WorkOrderFreightId = unitOfWork.WorkOrderRepository.CreateWorkOrderFreight(workOrderFreight);
                return Ok(workOrderFreight);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderfreight")]
        public IActionResult UpdateWorkOrderFreight([FromBody]WorkOrderFreight workOrderFreight)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderFreight(workOrderFreight);
                return Ok(workOrderFreight);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("workorderfreightlist")]
        public IActionResult GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderFreightList(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Work Order Publications

        [HttpPost("createworkorderpublications")]
        public IActionResult CreateWorkOrderPublications([FromBody]List<WorkOrderPublications> workOrderPublications)
        {
            if (ModelState.IsValid)
            {
                var result=unitOfWork.WorkOrderRepository.CreateWorkOrderPublications(workOrderPublications);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderpublications")]
        public IActionResult UpdateWorkOrderPublications([FromBody]List<WorkOrderPublications> workOrderPublications)
        {
            if (ModelState.IsValid)
            {
               var result= unitOfWork.WorkOrderRepository.UpdateWorkOrderPublications(workOrderPublications);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("deleteworkorderpublication")]
        public IActionResult DeleteWorkOrderPublication(long workOrderPublicationId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderPublication(workOrderPublicationId, updatedBy);
            return Ok();
        }

        [HttpGet("workorderpublicationstatus")]
        public IActionResult WorkOrderPublicationStatus(long workOrderPublicationId, bool status, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.WorkOrderPublicationStatus(workOrderPublicationId, status, updatedBy);
            return Ok();
        }

        [HttpGet("getworkorderpublications")]
        public IActionResult GetWorkOrderPublications(long wfwoId = 0, long workOrderId = 0)
        {
           var result= unitOfWork.WorkOrderRepository.GetWorkOrderPublications(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Work Order Material List

        [HttpPost("createworkordermaterials")]
        public IActionResult CreateWorkOrderMaterials([FromBody]List<WorkOrderMaterials> workOrderMaterials)
        {
            if (ModelState.IsValid)
            {
               var result= unitOfWork.WorkOrderRepository.CreateWorkOrderMaterials(workOrderMaterials);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkordermaterials")]
        public IActionResult UpdateWorkOrderMaterials([FromBody]List<WorkOrderMaterials> workOrderMaterials)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderMaterials(workOrderMaterials);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("deleteworkordermaterial")]
        public IActionResult DeleteWorkOrderMaterials(long workOrderMaterialsId, string updatedBy)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrderMaterials(workOrderMaterialsId, updatedBy);
            return Ok();
        }

        [HttpGet("workordermateriallist")]
        public IActionResult GetWorkOrderMaterialList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderMaterialList(wfwoId, workOrderId);
            return Ok(result);
        }

        [HttpGet("getreservedissuesparts")]
        public IActionResult GetReservedIssuesParts(long WorkFlowWorkOrderId=0,long workOrderId=0, int statusId=0)
        {
            var result = unitOfWork.WorkOrderRepository.GetReservedIssuedParts(WorkFlowWorkOrderId, workOrderId, statusId);
            return Ok(result);
        }

        [HttpPost("savereserveissuesparts")]
        public IActionResult SaveReserveIssuesParts([FromBody]List<WorkOrderReserveIssuesParts> reserveIssuesParts)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.SaveReserveIssuesParts(reserveIssuesParts);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getreservedparts")]
        public IActionResult GetReservedParts(long workFlowWorkOrderId=0, long workOrderId=0)
        {
            var result = unitOfWork.WorkOrderRepository.GetReservedParts(workFlowWorkOrderId, workOrderId);
            return Ok(result);
        }

        [HttpGet("getunreservedparts")]
        public IActionResult GetUnReservedParts(long workFlowWorkOrderId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetUnReservedParts(workFlowWorkOrderId, workOrderId);
            return Ok(result);
        }

        [HttpGet("getissuedparts")]
        public IActionResult GetIssuedParts(long workFlowWorkOrderId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetIssuedParts(workFlowWorkOrderId, workOrderId);
            return Ok(result);
        }

        [HttpGet("getunissuedParts")]
        public IActionResult GetUnIssuedParts(long workFlowWorkOrderId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetUnIssuedParts(workFlowWorkOrderId, workOrderId);
            return Ok(result);
        }



        #endregion

        #region Work Order Directions

        [HttpGet("workorderdirections")]
        public IActionResult GetWorkOrderDirections(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderDirections(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Billing and Invoicing

        [HttpPost("createbillinginvoicing")]
        public IActionResult CreateWorkOrderBillingInvoicing([FromBody]WorkOrderBillingInvoicing billingInvoicing)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.CreateWorkOrderBillingInvoicing(billingInvoicing);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updatebillinginvoicing")]
        public IActionResult UpdateWorkOrderBillingInvoicing([FromBody]WorkOrderBillingInvoicing billingInvoicing)
        {
            if (ModelState.IsValid)
            {
                var result = unitOfWork.WorkOrderRepository.UpdateWorkOrderBillingInvoicing(billingInvoicing);
                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("billinginvoicingdetails")]
        public IActionResult GetBillingInvoicingDetails(long workOrderId,long workOrderPartNoId)
        {
            var result = unitOfWork.WorkOrderRepository.GetBillingInvoicingDetails(workOrderId, workOrderPartNoId);
			if(result != null) {
				return Ok(result);
			}
			else
			{
				return NotFound();
			}
        }

        #endregion


        #region Work Order Main Component

        [HttpGet("workorderrolist")]
        public IActionResult WorkOrderROlist()
        {
            var result = unitOfWork.WorkOrderRepository.WorkOrderROlist();
            return Ok(result);
        }

        #endregion

        [HttpGet("getAll")]
        public IActionResult Index()
        {
            var workOrderList = unitOfWork.Repository<WorkOrder>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDeleted == false)
                .OrderByDescending(x => x.WorkOrderId)
                .ToList();
            return Ok(workOrderList);
        }

        //POST Multi Data in Workorderlabor Table
        [HttpPost("WorkOrderLabourPost")]
        public IActionResult AddLabour([FromBody] WorkOrderLabor[] workOrderLabor)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    for (int i = 0; i < workOrderLabor.Length; i++)
                    {
                        unitOfWork.Repository<WorkOrderLabor>().Add(workOrderLabor[i]);
                        unitOfWork.SaveChanges();
                    }
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }

                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("audits/{id}")]
        public IActionResult getAuditDetails(long id)
        {
            return Ok();
        }

        [HttpGet("workOrderTypes")]
        public IActionResult getWorkOrderType()
        {
            var workOrderTypes = unitOfWork.Repository<WorkOrderType>()
                .GetAll()
                .Where(x => x.IsActive == true & x.IsDeleted == false)
                .ToList();
            return Ok(workOrderTypes);
        }

        [HttpGet("workOrderStatus")]
        public IActionResult getWorkOrderStatus()
        {
            var workOrderStatus = unitOfWork.Repository<WorkOrderStatus>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDeleted == false)
                .ToList();
            return Ok(workOrderStatus);
        }

        [HttpGet("getAllworkScopes")]
        public IActionResult getAllWorkScope()
        {
            var workScopes = unitOfWork.Repository<WorkScope>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDelete == false)
                .ToList();
            return Ok(workScopes);
        }

        [HttpGet("getStages")]
        public IActionResult getWorkOrderStage()
        {
            var workOrderStages = unitOfWork.Repository<WorkOrderStage>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDeleted == false)
                .ToList();
            return Ok(workOrderStages);
        }

        [HttpGet("stocklinedetailsbypartno")]
        public IActionResult GetStockLineDetailsByPartNo(long itemMasterId,long conditionId)
        {
            var result = unitOfWork.WorkOrderRepository.GetStockLineDetailsByPartNo(itemMasterId, conditionId);
            return Ok(result);
        }

        [HttpGet("workorderpartdetails")]
        public IActionResult GetWorkOrderPartDetails()
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderPartDetails();
            return Ok(result);
        }

        [HttpGet("partserialno")]
        public IActionResult GetPartSerialNo(long stockLineId)
        {
            var result = unitOfWork.WorkOrderRepository.GetPartSerialNo(stockLineId);
            return Ok(result);
        }

        [HttpGet("partpublications")]
        public IActionResult GetPartPublications(long itemMasterId)
        {
            var result = unitOfWork.WorkOrderRepository.GetPartPublications(itemMasterId);
            return Ok(result);
        }

        [HttpGet("revisedparts")]
        public IActionResult GetRevisedParts(long itemMasterId, int mappingType)
        {
            var result = unitOfWork.WorkOrderRepository.GetRevisedParts(itemMasterId, mappingType);
            return Ok(result);
        }

        [HttpGet("conditiondetailsbypartno")]
        public IActionResult GetConditionDetailsByPartNo(long itemMasterId)
        {
            var result = unitOfWork.WorkOrderRepository.GetConditionDetailsByPartNo(itemMasterId);
            return Ok(result);
        }

        [HttpGet("stocklinedetails")]
        public IActionResult GetStockLineDetails(long stockLineId)
        {
            var result = unitOfWork.WorkOrderRepository.GetStockLineDetails(stockLineId);
            return Ok(result);
        }

        [HttpGet("gettechnicians")]
        public IActionResult GetTechnicians()
        {
            var result = unitOfWork.WorkOrderRepository.GetTechnicians();
            return Ok(result);
        }

        [HttpPost("updateworkorderworkFlow")]
        public IActionResult UpdateWorkOrderWorkFlow([FromBody] Workflow workFlow)
        {
             int masterCompanyId = 1;
             string userName = "admin";

            if (ModelState.IsValid)
            {
                if(workFlow.IsSaveToWorkFlow)
                {
                    workFlow.WorkflowId = 0;
                    workFlow.Customer = null;
                    workFlow.ItemMaster = null;
                    workFlow.WorkScope = null;
                    workFlow.ChangedPartNumber = null;
                    if(workFlow.Publication!=null && workFlow.Publication.Count>0)
                    {
                        foreach(var pub in workFlow.Publication)
                        {
                            if(pub.WorkflowPublicationDashNumbers!=null && pub.WorkflowPublicationDashNumbers.Count>0)
                            {
                                pub.WorkflowPublicationDashNumbers.ForEach(p => p.WorkflowPublicationDashNumberId = 0);
                            }
                        }
                    }

                    //List<long> taskIds = new List<long>();
                    //if (workFlow.ExistingWorkFlowId > 0)
                    //{
                    //    taskIds = getAllUniqueTaskIds(workFlow);
                    //}

                    //if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                    //{

                    //    var currentIds = workFlow.Charges.Select(x => x.WorkflowChargesListId).ToList();
                    //    List<WorkflowChargesList> itemsToRemove = new List<WorkflowChargesList>();

                    //    workFlow.Charges.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {

                    //        itemsToRemove = unitOfWork.Repository<WorkflowChargesList>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowChargesListId)
                    //        ).ToList();

                    //        foreach (var charges in itemsToRemove)
                    //        {
                    //            charges.IsDelete = true;
                    //        }

                    //        workFlow.Charges.AddRange(itemsToRemove);
                    //    }

                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Charges = unitOfWork.Repository<WorkflowChargesList>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //                                x.IsDelete == false
                    //                            ).ToList();

                    //        workFlow.Charges.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}

                    //if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                    //{
                    //    var currentIds = workFlow.Directions.Select(x => x.WorkflowDirectionId).ToList();
                    //    List<WorkFlowDirection> itemsToRemove = new List<WorkFlowDirection>();

                    //    workFlow.Directions.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdaedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        itemsToRemove = unitOfWork.Repository<WorkFlowDirection>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowDirectionId)
                    //        ).ToList();

                    //        foreach (var item in itemsToRemove)
                    //        {
                    //            item.IsDelete = true;
                    //        }
                    //        workFlow.Directions.AddRange(itemsToRemove);
                    //    }
                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Directions = unitOfWork.Repository<WorkFlowDirection>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //                            && x.IsDelete == false
                    //                            ).ToList();

                    //        workFlow.Directions.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdaedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}

                    //if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                    //{
                    //    var currentIds = workFlow.Equipments.Select(x => x.WorkflowEquipmentListId).ToList();
                    //    List<WorkflowEquipmentList> itemsToRemove = new List<WorkflowEquipmentList>();

                    //    workFlow.Equipments.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        itemsToRemove = unitOfWork.Repository<WorkflowEquipmentList>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowEquipmentListId)
                    //        ).ToList();

                    //        foreach (var item in itemsToRemove)
                    //        {
                    //            item.IsDelete = true;
                    //        }
                    //        workFlow.Equipments.AddRange(itemsToRemove);
                    //    }
                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Equipments = unitOfWork.Repository<WorkflowEquipmentList>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //                                && x.IsDelete == false
                    //                            ).ToList();
                    //        workFlow.Equipments.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}

                    //if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                    //{
                    //    var currentIds = workFlow.Exclusions.Select(x => x.WorkflowExclusionId).ToList();
                    //    List<WorkFlowExclusion> itemsToRemove = new List<WorkFlowExclusion>();

                    //    workFlow.Exclusions.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        itemsToRemove = unitOfWork.Repository<WorkFlowExclusion>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowExclusionId)
                    //        ).ToList();

                    //        foreach (var item in itemsToRemove)
                    //        {
                    //            item.IsDelete = true;
                    //        }

                    //        workFlow.Exclusions.AddRange(itemsToRemove);
                    //    }

                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Exclusions = unitOfWork.Repository<WorkFlowExclusion>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //                                && x.IsDelete == false
                    //                            ).ToList();
                    //        workFlow.Exclusions.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}

                    //if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                    //{
                    //    var currentIds = workFlow.Expertise.Select(x => x.WorkflowExpertiseListId).ToList();
                    //    List<WorkflowExpertiseList> itemsToRemove = new List<WorkflowExpertiseList>();

                    //    workFlow.Expertise.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        itemsToRemove = unitOfWork.Repository<WorkflowExpertiseList>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowExpertiseListId)
                    //        ).ToList();

                    //        foreach (var item in itemsToRemove)
                    //        {
                    //            item.IsDelete = true;
                    //        }

                    //        workFlow.Expertise.AddRange(itemsToRemove);
                    //    }
                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Expertise = unitOfWork.Repository<WorkflowExpertiseList>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //                                && x.IsDelete == false
                    //                            ).ToList();

                    //        workFlow.Expertise.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}

                    //if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                    //{
                    //    var currentIds = workFlow.MaterialList.Select(x => x.WorkflowMaterialListId).ToList();
                    //    List<WorkflowMaterial> itemsToRemove = new List<WorkflowMaterial>();

                    //    workFlow.MaterialList.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        itemsToRemove = unitOfWork.Repository<WorkflowMaterial>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowMaterialListId)
                    //        ).ToList();

                    //        foreach (var item in itemsToRemove)
                    //        {
                    //            item.IsDelete = true;
                    //        }

                    //        workFlow.MaterialList.AddRange(itemsToRemove);
                    //    }

                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.MaterialList = unitOfWork.Repository<WorkflowMaterial>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //                                && x.IsDelete == false
                    //                            ).ToList();

                    //        workFlow.MaterialList.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}

                    //if (workFlow.Measurements != null && workFlow.Measurements.Count > 0)
                    //{
                    //    var currentIds = workFlow.Measurements.Select(x => x.WorkflowMeasurementId).ToList();
                    //    List<WorkflowMeasurement> itemsToRemove = new List<WorkflowMeasurement>();

                    //    workFlow.Measurements.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });

                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        itemsToRemove = unitOfWork.Repository<WorkflowMeasurement>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId &&
                    //        x.IsDelete == false && !currentIds.Contains(x.WorkflowMeasurementId)
                    //        ).ToList();

                    //        foreach (var item in itemsToRemove)
                    //        {
                    //            item.IsDelete = true;
                    //        }
                    //        workFlow.Measurements.AddRange(itemsToRemove);
                    //    }
                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Measurements = unitOfWork.Repository<WorkflowMeasurement>()
                    //                            .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //                                && x.IsDelete == false
                    //                            ).ToList();
                    //        workFlow.Measurements.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDelete = true;
                    //        });
                    //    }
                    //}


                    //if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                    //{
                    //    var currentids = workFlow.Publication.Select(x => x.Id).ToList();

                    //    workFlow.Publication.ForEach(x =>
                    //    {
                    //        x.MasterCompanyId = masterCompanyId;
                    //        x.CreatedBy = userName;
                    //        x.CreatedDate = DateTime.Now;
                    //        x.UpdatedBy = userName;
                    //        x.UpdatedDate = DateTime.Now;
                    //    });
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        var itemsToRemove = unitOfWork.Repository<Publications>()
                    //        .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //        && x.IsDeleted == false && !currentids.Contains(x.Id)
                    //        ).ToList();

                    //        foreach (var publication in itemsToRemove)
                    //        {
                    //            publication.IsDeleted = true;
                    //        }

                    //        workFlow.Publication.AddRange(itemsToRemove);
                    //    }

                    //    List<long> ids = new List<long>();
                    //    foreach (var publication in workFlow.Publication)
                    //    {
                    //        ids.Clear();

                    //        if (publication.WorkflowPublicationDashNumbers != null)
                    //        {
                    //            ids = publication.WorkflowPublicationDashNumbers.Select(x => x.WorkflowPublicationDashNumberId).ToList();
                    //        }

                    //        var itemsToDelete = unitOfWork.Repository<WorkflowPublicationDashNumber>()
                    //            .Find(x =>
                    //            x.PublicationsId == publication.Id &&
                    //            !ids.Contains(x.WorkflowPublicationDashNumberId)
                    //            );

                    //        foreach (var item in itemsToDelete)
                    //        {
                    //            unitOfWork.Repository<WorkflowPublicationDashNumber>().Remove(item);
                    //        }
                    //    }
                    //}
                    //else
                    //{
                    //    if (workFlow.ExistingWorkFlowId > 0)
                    //    {
                    //        workFlow.Publication = unitOfWork.Repository<Publications>()
                    //         .Find(x => x.WorkflowId == workFlow.ExistingWorkFlowId
                    //            && x.IsDeleted == false
                    //         ).ToList();

                    //        workFlow.Publication.ForEach(x =>
                    //        {
                    //            x.UpdatedBy = userName;
                    //            x.UpdatedDate = DateTime.Now;
                    //            x.IsDeleted = true;
                    //        });
                    //    }
                    //}

                    if (workFlow != null && workFlow.ExistingWorkFlowId > 0)
                    {
                        var exworkFlow = GetWorkFlowDetails(workFlow.ExistingWorkFlowId);
                        int versionNo = 0;
                        versionNo = Convert.ToInt32(workFlow.Version.Substring(workFlow.Version.IndexOf("-") + 1));

                        workFlow.WorkOrderNumber = exworkFlow.WorkOrderNumber;
                        workFlow.Version = "V-" + Convert.ToString(versionNo + 1);
                        workFlow.CreatedDate = DateTime.Now;
                        workFlow.UpdatedDate = DateTime.Now;
                        workFlow.CreatedBy = userName;
                        workFlow.UpdatedBy = userName;
                        workFlow.MasterCompanyId = masterCompanyId;
                        workFlow.IsActive = true;
                        unitOfWork.Repository<Workflow>().Add(workFlow);
                        unitOfWork.SaveChanges();

                        unitOfWork.WorkOrderRepository.UpdateWorkOrderWorkFlow(workFlow);
                    }
                    return Ok(workFlow);
                }
                else
                {
                    workFlow.WorkflowId = workFlow.ExistingWorkFlowId;
                    unitOfWork.WorkOrderRepository.UpdateWorkOrderWorkFlow(workFlow);
                    return Ok(workFlow);
                }

            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
        }


        private List<long> getAllUniqueTaskIds(Workflow workflow)
        {
            var ids = new List<long>();

            if (workflow.Charges != null && workflow.Charges.Count > 0)
            {
                ids.AddRange(workflow.Charges.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.Directions != null && workflow.Directions.Count > 0)
            {
                ids.AddRange(workflow.Directions.Select(x => x.TaskId.Value).Distinct().ToList());
            }
            if (workflow.Equipments != null && workflow.Equipments.Count > 0)
            {
                ids.AddRange(workflow.Equipments.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.Exclusions != null && workflow.Exclusions.Count > 0)
            {
                ids.AddRange(workflow.Exclusions.Select(x => x.TaskId.Value).Distinct().ToList());
            }
            if (workflow.Expertise != null && workflow.Expertise.Count > 0)
            {
                ids.AddRange(workflow.Expertise.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.MaterialList != null && workflow.MaterialList.Count > 0)
            {
                ids.AddRange(workflow.MaterialList.Select(x => x.TaskId.Value).Distinct().ToList());
            }
            if (workflow.Measurements != null && workflow.Measurements.Count > 0)
            {
                ids.AddRange(workflow.Measurements.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.Publication != null && workflow.Publication.Count > 0)
            {
                ids.AddRange(workflow.Publication.Select(x => x.TaskId).Distinct().ToList());
            }
            return ids;
        }

        private Workflow GetWorkFlowDetails(long workFlowId)
        {
            return unitOfWork.Repository<Workflow>().Find(p => p.WorkflowId == workFlowId).FirstOrDefault();
        }
    }
}