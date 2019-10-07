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

        [HttpPost("deleteworkorder")]
        public IActionResult DeleteWorkOrder(long workOrderId)
        {
            unitOfWork.WorkOrderRepository.DeleteWorkOrder(workOrderId);
            return Ok(ModelState);
        }

        [HttpPost("workorderstatus")]
        public IActionResult WorkOrderStatus(long workOrderId,bool status,string updatedBy)
        {
            unitOfWork.WorkOrderRepository.WorkOrderStatus(workOrderId, status, updatedBy);
            return Ok(ModelState);
        }

        [HttpGet("workorderlist")]
        public IActionResult GetWorkOrdersList(WorkOrderList workOrderList)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkOrdersList(workOrderList);
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
        public IActionResult CreateWorkFlowWorkOrder(WorkFlowWorkOrder workFlowWorkOrder)
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
        public IActionResult UpdateWorkFlowWorkOrder(WorkFlowWorkOrder workFlowWorkOrder)
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
        
        #endregion

        #region Work Order Labor

        [HttpPost("createworkorderlabor")]
        public IActionResult CreateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor)
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
        public IActionResult UpdateWorkOrderLabor(WorkOrderLaborHeader workOrderLabor)
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
        public IActionResult CreateWorkOrderCharges(WorkOrderCharges workOrderCharges)
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
        public IActionResult UpdateWorkOrderCharges(WorkOrderCharges workOrderCharges)
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
        public IActionResult CreateWorkOrderAssets(WorkOrderAssets workOrderAssets)
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
        public IActionResult UpdateWorkOrderAssets(WorkOrderAssets workOrderAssets)
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

        [HttpGet("getworkflowworkorderassetslist")]
        public IActionResult GetWorkFlowWorkOrderAssetsList(long wfwoId = 0, long workOrderId = 0)
        {
            var result = unitOfWork.WorkOrderRepository.GetWorkFlowWorkOrderAssetsList(wfwoId, workOrderId);
            return Ok(result);
        }

        #endregion

        #region Work Order Exclusions

        [HttpPost("createworkorderexclusions")]
        public IActionResult CreateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions)
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
        public IActionResult UpdateWorkOrderExclusions(WorkOrderExclusions workOrderExclusions)
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
        public IActionResult CreateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments)
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
        public IActionResult UpdateWorkOrderDocuments(WorkOrderDocuments workOrderDocuments)
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
        public IActionResult CreateWorkOrderAddress(WorkOrderAddress workOrderAddress)
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
        public IActionResult UpdateWorkOrderAddress(WorkOrderAddress workOrderAddress)
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
        public IActionResult CreateWorkOrderQuote(WorkOrderQuote workOrderQuote)
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
        public IActionResult UpdateWorkOrderQuote(WorkOrderQuote workOrderQuote)
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
        public IActionResult CreateWorkOrderFreight(WorkOrderFreight workOrderFreight)
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
        public IActionResult UpdateWorkOrderFreight(WorkOrderFreight workOrderFreight)
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


        [HttpGet("createworkflowWorkorder1")]
        public IActionResult CreateWorkFlowWorkOrder1(long workFlowId)
        {
            unitOfWork.WorkOrderRepository.CreateWorkFlowWorkOrderForWorkFlow1(workFlowId);
            return Ok();
        }
        
















        [HttpGet("getAll")]
        public IActionResult Index()
        {
            var workOrderList = unitOfWork.Repository<WorkOrder>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDeleted == false)
                .OrderByDescending(x => x.ID)
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
    }
}