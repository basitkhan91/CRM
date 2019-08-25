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
                .Where(x => x.IsActive == true && x.IsDeleted == false)
                .OrderByDescending(x => x.ID)
                .ToList();
            return Ok(workOrderList);
        }

        [HttpGet("getWorkOrderDataByID/{id}")]
        public IActionResult GetById(long id)
        {
            var workOrder = unitOfWork.Repository<WorkOrder>()
                .Find(x => x.ID == id).FirstOrDefault();
            return Ok(workOrder);
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

        //Post Data in WorkOrder Table
        [HttpPost("WorkOrderPost")]
        public IActionResult Add([FromBody] WorkOrder workOrder)
        {
            try
            {
                if (ModelState.IsValid)
                {
                        unitOfWork.Repository<WorkOrder>().Add(workOrder);
                        unitOfWork.SaveChanges();
                        //workOrder = unitOfWork.Repository<WorkOrder>().GetAll().OrderByDescending(x => x.ID).FirstOrDefault();
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

        [HttpPost("updateWO/{id}")]
        public IActionResult Update(long id,[FromBody] WorkOrder workOrder)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var workorderObj = unitOfWork.WorkOrderRepository.GetSingleOrDefault(c => c.ID == id);
                    workOrder.MasterCompanyId = 1;
                    workorderObj.Contract = workOrder.Contract;

                    workorderObj.CreditLimit = workOrder.CreditLimit;
                    workorderObj.CreditTermsId = workOrder.CreditTermsId;
                    workorderObj.CustomerContactId = workOrder.CustomerContactId;
                    workorderObj.CustomerId = workOrder.CustomerId;
                    workorderObj.EmployeeId = workOrder.EmployeeId;
                    workorderObj.IsContractAvl = workOrder.IsContractAvl;
                    workorderObj.IsSinglePN = workOrder.IsSinglePN;
                    workorderObj.MasterCompanyId = workOrder.MasterCompanyId;
                    workorderObj.OpenDate = workOrder.OpenDate;
                    workorderObj.Quantity = workOrder.Quantity;
                    workorderObj.SalesPerson = workOrder.SalesPerson;
                    workorderObj.WorkOrderNum = workOrder.WorkOrderNum;
                    workorderObj.WorkOrderStatusId = workOrder.WorkOrderStatusId;
                    workorderObj.WorkOrderTypeId = workOrder.WorkOrderTypeId;
                    workorderObj.UpdatedBy = workOrder.UpdatedBy;
                    workorderObj.UpdatedDate = workOrder.UpdatedDate;
                    workorderObj.CreatedBy = workOrder.CreatedBy;
                    workorderObj.CreatedDate = workOrder.CreatedDate;
                    workorderObj.IsActive = workOrder.IsActive;
                    workorderObj.IsDeleted = workOrder.IsDeleted;

                    unitOfWork.Repository<WorkOrder>().Update(workorderObj);
                    unitOfWork.SaveChanges();
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
            //return Ok();
        }

        [HttpPost("remove/{id}")]
        public IActionResult Delete(long id)
        {
            var workOrder = unitOfWork.Repository<WorkOrder>().Find(xx => xx.ID == id).FirstOrDefault();
            workOrder.IsDeleted = true;
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