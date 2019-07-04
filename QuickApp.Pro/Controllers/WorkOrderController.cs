using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{
    [Route("api/WorkOrder")]
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

        [HttpGet("getAll")]
        public IActionResult Index()
        {
            var workOrderList = unitOfWork.Repository<WorkOrder>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDelete == false)
                .OrderByDescending(x => x.ID)
                .ToList();
            return Ok(workOrderList);
        }

        [HttpGet("get/{id}")]
        public IActionResult GetById(long id)
        {
            var workOrder = unitOfWork.Repository<WorkOrder>()
                .Find(x => x.ID == id).FirstOrDefault();
            return Ok(workOrder);
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody]WorkOrder workOrder)
        {
            if (ModelState.IsValid)
            {
                workOrder.WorkOrderNum = Guid.NewGuid().ToString();
                var existWorkOrder = unitOfWork.Repository<WorkOrder>()
                    .Find(x => x.WorkOrderNum == workOrder.WorkOrderNum);
                if (existWorkOrder.Count() <= 0)
                {
                    workOrder.IsActive = true;
                    workOrder.IsDelete = false;
                    workOrder.CreatedDate = DateTime.Now;
                    unitOfWork.Repository<WorkOrder>().Add(workOrder);
                    unitOfWork.SaveChanges();
                    workOrder = unitOfWork.Repository<WorkOrder>().GetAll().OrderByDescending(x => x.ID).FirstOrDefault();
                    return Ok(workOrder);
                }
                else
                {
                    return BadRequest(new Exception("Work Order with work order number : " + workOrder.WorkOrderNum + " already exists"));
                }
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
            //return Ok();
        }

        [HttpPut("update")]
        public IActionResult Update(WorkOrder workOrder)
        {
            if (ModelState.IsValid)
            {
                workOrder.UpdatedDate = DateTime.Now;
                unitOfWork.Repository<WorkOrder>().Update(workOrder);
                unitOfWork.SaveChanges();
                return Ok(workOrder);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
            //return Ok();
        }

        [HttpDelete("remove/{id}")]
        public IActionResult Delete(long id)
        {
            var workOrder = unitOfWork.Repository<WorkOrder>().Find(xx => xx.ID == id).FirstOrDefault();
            workOrder.IsActive = false;
            workOrder.IsDelete = true;
            workOrder.UpdatedDate = DateTime.Now;

            unitOfWork.Repository<WorkOrder>().Update(workOrder);
            unitOfWork.SaveChanges();
            return Ok(workOrder);
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
                .Where(x => x.IsActive == true & x.IsDelete == false)
                .ToList();
            return Ok(workOrderTypes);
        }

        [HttpGet("workOrderStatus")]
        public IActionResult getWorkOrderStatus()
        {
            var workOrderStatus = unitOfWork.Repository<WorkOrderStatus>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDelete == false)
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
                .Where(x => x.IsActive == true && x.IsDelete == false)
                .ToList();
            return Ok(workOrderStages);
        }
    }
}