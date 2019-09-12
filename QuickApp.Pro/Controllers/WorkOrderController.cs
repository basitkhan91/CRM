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
        public IActionResult WorkOrderStatus(long workOrderId,bool status)
        {
            unitOfWork.WorkOrderRepository.WorkOrderStatus(workOrderId, status);
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