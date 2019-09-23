using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{
    [Route("api/WorkOrderLabor")]
    public class WorkOrderLaborController : Controller
    {

        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public WorkOrderLaborController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        //[HttpGet("getAll")]
        //public IActionResult Index()
        //{
        //    var workOrderList = unitOfWork.Repository<WorkOrderLabor>()
        //        .GetAll()
        //        .Where(x => x.IsActive == true && x.IsDeleted == false)
        //        .OrderByDescending(x => x.ID)
        //        .ToList();
        //    return Ok(workOrderList);
        //}

        //[HttpGet("get/{id}")]
        //public IActionResult GetById(long id)
        //{
        //    var workOrder = unitOfWork.Repository<WorkOrderLabor>()
        //        .Find(x => x.ID == id).FirstOrDefault();
        //    return Ok(workOrder);
        //}

        //[HttpPost("add")]
        //public IActionResult Add([FromBody]WorkOrderLabor workOrderLabor)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        workOrderLabor.IsActive = true;
        //        workOrderLabor.IsDeleted = false;
        //        workOrderLabor.CreatedDate = DateTime.Now;
        //        unitOfWork.Repository<WorkOrderLabor>().Add(workOrderLabor);
        //        unitOfWork.SaveChanges();
        //        return Ok(workOrderLabor);
        //    }
        //    else
        //    {
        //        return BadRequest(ModelState.Values.FirstOrDefault().Errors);
        //    }
        //    //return Ok();
        //}

        //[HttpPut("update")]
        //public IActionResult Update(WorkOrderLabor workOrderLabor)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        workOrderLabor.UpdatedDate = DateTime.Now;
        //        unitOfWork.Repository<WorkOrderLabor>().Update(workOrderLabor);
        //        unitOfWork.SaveChanges();
        //        return Ok(workOrderLabor);
        //    }
        //    else
        //    {
        //        return BadRequest(ModelState.Values.FirstOrDefault().Errors);
        //    }
        //    //return Ok();
        //}

        //[HttpDelete("remove/{id}")]
        //public IActionResult Delete(long id)
        //{
        //    var workOrderLabor = unitOfWork.Repository<WorkOrderLabor>().Find(x => x.ID == id).FirstOrDefault();
        //    workOrderLabor.IsActive = false;
        //    workOrderLabor.IsDeleted = true;
        //    workOrderLabor.UpdatedDate = DateTime.Now;

        //    unitOfWork.Repository<WorkOrderLabor>().Update(workOrderLabor);
        //    unitOfWork.SaveChanges();
        //    return Ok(workOrderLabor);
        //}

        [HttpGet("audits/{id}")]
        public IActionResult getAuditDetails(long id)
        {
            return Ok();
        }
    }
}