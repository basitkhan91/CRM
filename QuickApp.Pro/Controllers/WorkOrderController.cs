using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
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
                throw;
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

        

        [HttpGet("workorderlist")]
        public IActionResult GetWorkOrdersList(int pageNo = 0, int pageSize = 10)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrdersList(pageNo, pageSize);
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

        [HttpPost("updateworkflowworkorder")]
        public IActionResult UpdateWorkFlowWorkOrder([FromBody]WorkOrderWorkFlow workFlowWorkOrder)
        {
            if (ModelState.IsValid)
            {
                 unitOfWork.WorkOrderRepository.UpdateWorkFlowWorkOrder(workFlowWorkOrder);
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
        public IActionResult CreateWorkOrderCharges([FromBody]WorkOrderCharges workOrderCharges)
        {
            if (ModelState.IsValid)
            {
                workOrderCharges.WorkOrderChargesId = unitOfWork.WorkOrderRepository.CreateWorkOrderCharges(workOrderCharges);
                return Ok(workOrderCharges);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkordercharges")]
        public IActionResult UpdateWorkOrderCharges([FromBody]WorkOrderCharges workOrderCharges)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderCharges(workOrderCharges);
                return Ok(workOrderCharges);
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

        #endregion

        #region Work Order Assets

        [HttpPost("createworkorderassets")]
        public IActionResult CreateWorkOrderAssets([FromBody]WorkOrderAssets workOrderAssets)
        {
            if (ModelState.IsValid)
            {
                workOrderAssets.WorkOrderAssetId = unitOfWork.WorkOrderRepository.CreateWorkOrderAssets(workOrderAssets);
                return Ok(workOrderAssets);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderassets")]
        public IActionResult UpdateWorkOrderAssets([FromBody]WorkOrderAssets workOrderAssets)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderAssets(workOrderAssets);
                return Ok(workOrderAssets);
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

        #endregion

        #region Work Order Exclusions

        [HttpPost("createworkorderexclusions")]
        public IActionResult CreateWorkOrderExclusions([FromBody]WorkOrderExclusions workOrderExclusions)
        {
            if (ModelState.IsValid)
            {
                workOrderExclusions.WorkOrderExclusionsId = unitOfWork.WorkOrderRepository.CreateWorkOrderExclusions(workOrderExclusions);
                return Ok(workOrderExclusions);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("updateworkorderexclusions")]
        public IActionResult UpdateWorkOrderExclusions([FromBody]WorkOrderExclusions workOrderExclusions)
        {
            if (ModelState.IsValid)
            {
                unitOfWork.WorkOrderRepository.UpdateWorkOrderExclusions(workOrderExclusions);
                return Ok(workOrderExclusions);
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

        #endregion

        #region Work Order Documents

        [HttpPost("createworkorderdocuments")]
        public IActionResult CreateWorkOrderDocuments([FromBody]WorkOrderDocuments workOrderDocuments)
        {
            if (ModelState.IsValid)
            {
                workOrderDocuments.WorkOrderDocumentsId = unitOfWork.WorkOrderRepository.CreateWorkOrderDocuments(workOrderDocuments);
                return Ok(workOrderDocuments);
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
                workOrderQuote.WorkOrderQuoteId = unitOfWork.WorkOrderRepository.CreateWorkOrderQuote(workOrderQuote);
                return Ok(workOrderQuote);
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
                unitOfWork.WorkOrderRepository.UpdateWorkOrderQuote(workOrderQuote);
                return Ok(workOrderQuote);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpGet("getworkflowWorkorderquote")]
        public IActionResult GetWorkFlowWorkOrderQuote(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderQuote(wfwoId, workOrderId);
            return Ok(result);
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

        [HttpGet("getworkflowworkorderfreightlist")]
        public IActionResult GetWorkFlowWorkOrderFreightList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderFreightList(wfwoId, workOrderId);
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

        [HttpGet("workordermateriallist")]
        public IActionResult GetWorkOrderMaterialList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrderMaterialList(wfwoId, workOrderId);
            return Ok(result);
        }

        [HttpGet("gettechnicians")]
        public IActionResult GetTechnicians()
        {
            var result = unitOfWork.WorkOrderRepository.GetTechnicians();
            return Ok(result);
        }
    }
}