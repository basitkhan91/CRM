using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{
    [Route("api/WorkOrderPartNumber")]
    public class WorkOrderPartNumberController : Controller
    {

        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public WorkOrderPartNumberController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        [HttpGet("getAll")]
        public IActionResult Index()
        {
            var workOrderList = unitOfWork.Repository<WorkOrderPartNumber>()
                .GetAll()
                .Where(x => x.IsActive == true && x.IsDelete == false)
                .OrderByDescending(x => x.ID)
                .ToList();
            return Ok(workOrderList);
        }

        [HttpGet("get/{id}")]
        public IActionResult GetById(long id)
        {
            var workOrder = unitOfWork.Repository<WorkOrderPartNumber>()
                .Find(x => x.ID == id).FirstOrDefault();
            return Ok(workOrder);
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody]WorkOrderPartNumber workOrderPartNumber)
        {
            if (ModelState.IsValid)
            {
                var existworkOrderPartNumber = unitOfWork.Repository<WorkOrderPartNumber>()
                    .Find(x => x.ID == workOrderPartNumber.ID);
                if (existworkOrderPartNumber.Count() <= 0)
                {
                    workOrderPartNumber.IsActive = true;
                    workOrderPartNumber.IsDelete = false;
                    workOrderPartNumber.CreatedDate = DateTime.Now;
                    unitOfWork.Repository<WorkOrderPartNumber>().Add(workOrderPartNumber);
                    unitOfWork.SaveChanges();
                    return Ok(workOrderPartNumber);
                }
                else
                {
                    return BadRequest(new Exception("Master Part Number Already exists"));
                }
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
        }

        [HttpPut("update")]
        public IActionResult Update(WorkOrderPartNumber workOrderPartNumber)
        {
            if (ModelState.IsValid)
            {
                workOrderPartNumber.UpdatedDate = DateTime.Now;
                unitOfWork.Repository<WorkOrderPartNumber>().Update(workOrderPartNumber);
                unitOfWork.SaveChanges();
                return Ok(workOrderPartNumber);
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
            var workOrderPartNumber = unitOfWork.Repository<WorkOrderPartNumber>().Find(xx => xx.ID == id).FirstOrDefault();
            workOrderPartNumber.IsActive = false;
            workOrderPartNumber.IsDelete = true;
            workOrderPartNumber.UpdatedDate = DateTime.Now;

            unitOfWork.Repository<WorkOrderPartNumber>().Update(workOrderPartNumber);
            unitOfWork.SaveChanges();
            return Ok(workOrderPartNumber);
        }

        [HttpGet("audits/{id}")]
        public IActionResult getAuditDetails(long id)
        {
            return Ok();
        }

    }
}