using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    public class WorkflowController : ControllerBase
    {
        private IUnitOfWork UnitOfWork;
        private readonly ApplicationDbContext _context;


        public WorkflowController(IUnitOfWork _unitOfWork, ApplicationDbContext context)
        {
            UnitOfWork = _unitOfWork;
            _context = context;
        }

        [HttpGet("allWorkFlows")]
        public IActionResult getAllWorkFlows()
        {
            return Ok(UnitOfWork.Repository<Workflow>().GetAll());
        }

        [HttpPost("addWorkFlow")]
        public IActionResult addWorkFlow([FromBody] Workflow workFlow)
        {
            if (ModelState.IsValid)
            {
                var existingWorkflow = UnitOfWork.Repository<Workflow>().Find(workflow => workflow.WorkflowId == workFlow.WorkflowId).FirstOrDefault();

                if (existingWorkflow != null)
                {
                    existingWorkflow.CreatedDate = DateTime.Now;
                    existingWorkflow.UpdatedDate = DateTime.Now;
                    existingWorkflow.CreatedBy = "admin";
                    existingWorkflow.UpdatedBy = "admin";
                    UnitOfWork.Repository<Workflow>().Update(existingWorkflow);
                    UnitOfWork.SaveChanges();
                    return Ok(workFlow);
                }
                else
                {
                    workFlow.MasterCompanyId = 1;
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    UnitOfWork.Repository<Workflow>().Add(workFlow);
                    UnitOfWork.SaveChanges();

                    workFlow.WorkOrderNumber = "ACC" + workFlow.WorkflowId;
                    UnitOfWork.Repository<Workflow>().Update(workFlow);
                    UnitOfWork.SaveChanges();
                    return Ok(workFlow);
                }
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
        }

        [HttpGet("getWorkFlow/{id:int}")]
        public IActionResult getWorkFlow(int id)
        {
            var workFlow = UnitOfWork.workFlowRepositoryTest.getCompleteWorkFlowEntity(id);
            return Ok(workFlow);
        }

        [HttpPost("addCharges")]
        public IActionResult addCharges([FromBody] WorkflowChargesList charges)
        {
            if (charges != null)
            {
                charges.WorkflowChargesListId = 0;
                charges.MasterCompanyId = 1;
                charges.CreatedDate = DateTime.Now;
                UnitOfWork.Repository<WorkflowChargesList>().Add(charges);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            else {
                return BadRequest();
            }
            
        }

        [HttpPost("addDirection")]
        public IActionResult addDirection([FromBody] WorkFlowDirection direction)
        {
            if (direction != null)
            {
                direction.WorkflowDirectionId = 0;
                direction.CreatedDate = DateTime.Now;
                direction.MasterCompanyId = 1;
                _context.WorkFlowDirection.Add(direction);
                _context.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("addEquipment")]
        public IActionResult addEquipment([FromBody] WorkflowEquipmentList equipment)
        {
            if (equipment != null)
            {
                equipment.WorkflowEquipmentListId = 0;
                equipment.MasterCompanyId = 1;
                equipment.CreatedDate = DateTime.Now;
                _context.WorkflowEquipmentList.Add(equipment);
                _context.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("addExclusion")]
        public IActionResult addExclusion([FromBody] WorkFlowExclusion exclusion)
        {
            if (exclusion != null)
            {
                exclusion.WorkflowExclusionId = 0;
                exclusion.MasterCompanyId = 1;
                exclusion.CreatedDate = DateTime.Now;
                _context.WorkFlowExclusion.Add(exclusion);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("addExpertise")]
        public IActionResult addExpertise([FromBody] WorkflowExpertiseList experties)
        {
            if (experties != null)
            {
                experties.WorkflowExpertiseListId = 0;
                experties.MasterCompanyId = 1;
                experties.CreatedDate = DateTime.Now;
                _context.WorkflowExpertiseList.Add(experties);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("addMeasurement")]
        public IActionResult addMeasurement([FromBody] WorkflowMeasurement measurement)
        {
            if (measurement != null)
            {
                measurement.WorkflowMeasurementId = 0;
                measurement.MasterCompanyId = 1;
                measurement.CreatedDate = DateTime.Now;
                measurement.UpdatedDate = DateTime.Now;
                measurement.CreatedBy = "admin";
                _context.WorkflowMeasurement.Add(measurement);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("addPublication")]
        public IActionResult addPublication([FromBody] Publications publication)
        {
            if (publication != null)
            {
                publication.Id = 0;
                publication.CreatedDate = DateTime.Now;
                publication.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<Publications>().Add(publication);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("addMaterial")]
        public IActionResult addMaterial([FromBody] WorkflowMaterial material)
        {
            if (material != null)
            {
                material.WorkflowMaterialListId = 0;
                material.MasterCompanyId = 1;
                material.CreatedDate = DateTime.Now;
                _context.WorkflowMaterial.Add(material);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("updateCharges")]
        public IActionResult updateCharges([FromBody] WorkflowChargesList charges)
        {
            if (charges != null)
            {
                charges.MasterCompanyId = 1;
                charges.CreatedDate = DateTime.Now;
                charges.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<WorkflowChargesList>().Update(charges);
                UnitOfWork.SaveChanges();
                return Ok();
            }

            return BadRequest();
            
        }

        [HttpPost("updateDirection")]
        public IActionResult updateDirection([FromBody] WorkFlowDirection direction)
        {
            if (direction != null) {
                direction.MasterCompanyId = 1;
                direction.CreatedDate = DateTime.Now;
                direction.UpdaedDate = DateTime.Now;
                UnitOfWork.Repository<WorkFlowDirection>().Update(direction);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("updateEquipment")]
        public IActionResult updateEquipment([FromBody] WorkflowEquipmentList equipment)
        {
            if (equipment != null)
            {
                equipment.MasterCompanyId = 1;
                equipment.CreatedDate = DateTime.Now;
                equipment.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<WorkflowEquipmentList>().Update(equipment);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
           
        }

        [HttpPost("updateExclusion")]
        public IActionResult updateExclusion([FromBody] WorkFlowExclusion exclusion)
        {
            if (exclusion != null)
            {
                exclusion.MasterCompanyId = 1;
                exclusion.CreatedDate = DateTime.Now;
                exclusion.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<WorkFlowExclusion>().Update(exclusion);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("updateExpertise")]
        public IActionResult updateExpertise([FromBody] WorkflowExpertiseList experties)
        {
            if (experties != null)
            {
                experties.MasterCompanyId = 1;
                experties.CreatedDate = DateTime.Now;
                experties.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<WorkflowExpertiseList>().Update(experties);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
            
        }

        [HttpPost("updateMeasurement")]
        public IActionResult updateMeasurement([FromBody] WorkflowMeasurement measurement)
        {
            if (measurement != null) {
                measurement.MasterCompanyId = 1;
                measurement.CreatedDate = DateTime.Now;
                measurement.UpdatedDate = DateTime.Now;
                measurement.CreatedBy = "admin";
                UnitOfWork.Repository<WorkflowMeasurement>().Update(measurement);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("updatePublication")]
        public IActionResult updatePublication([FromBody] Publications publication)
        {
            if (publication != null)
            {
                publication.CreatedDate = DateTime.Now;
                UnitOfWork.Repository<Publications>().Update(publication);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("updateMaterial")]
        public IActionResult updateMaterial([FromBody] WorkflowMaterial material)
        {
            if (material != null) {
                material.MasterCompanyId = 1;
                material.CreatedDate = DateTime.Now;
                material.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<WorkflowMaterial>().Update(material);
                UnitOfWork.SaveChanges();
                return Ok();
            }
            return BadRequest();
            
        }

    }
}
