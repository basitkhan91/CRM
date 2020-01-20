using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/workorderstage")]
    public class WorkOrderStageController : Controller
    {
        private IUnitOfWork unitOfWork;

        public WorkOrderStageController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }


        [HttpPost("createworkorderstage")]
        public IActionResult CreateWorkOrderStage([FromBody] WorkOrderStage workOrderStage)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result=unitOfWork.WorkOrderStageRepository.CreateWorkOrderStage(workOrderStage);
                    return Ok(result);
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

        [HttpPost("updateworkorderstage")]
        public IActionResult UpdateWorkOrderStage([FromBody] WorkOrderStage workOrderStage)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = unitOfWork.WorkOrderStageRepository.UpdateWorkOrderStage(workOrderStage);
                    return Ok(result);
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

        [HttpGet("deleteworkorderstage")]
        public IActionResult DeleteWorkOrderStage(long workOrderStageId,string updatedBy)
        {
            unitOfWork.WorkOrderStageRepository.DeleteWorkOrderStage(workOrderStageId,updatedBy);
            return Ok(ModelState);
        }

        [HttpGet("updateworkorderstagestatus")]
        public IActionResult WorkOrderStageStatus(long workOrderStageId, bool status, string updatedBy)
        {
            unitOfWork.WorkOrderStageRepository.WorkOrderStageStatus(workOrderStageId, status, updatedBy);
            return Ok(ModelState);
        }

        [HttpGet("workorderstagelist")]
        public IActionResult WorkOrderStageList()
        {
            var result = unitOfWork.WorkOrderStageRepository.WorkOrderStageList();
            return Ok(result);
        }

        [HttpGet("workorderstagebyid")]
        public IActionResult WorkOrderStageById(long workOrderStageId)
        {
            var workOrder = unitOfWork.WorkOrderStageRepository.WorkOrderStageById(workOrderStageId);
            return Ok(workOrder);
        }
    }
}