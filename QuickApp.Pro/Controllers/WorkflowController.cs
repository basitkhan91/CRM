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
        public IActionResult getAllWorkFlows(){
            return Ok(UnitOfWork.Repository<Workflow>().GetAll());

        }

        [HttpPost("addWorkFlow")]
        public  IActionResult addWorkFlow([FromBody] Workflow workFlow)
        {
            if (_context.Workflow.Any(o => o.WorkflowId == workFlow.WorkflowId))

            {
                if (workFlow == null)
                    return BadRequest($"{nameof(workFlow)} cannot be null");
                var actionobject = _context.Workflow.Where(a => a.WorkflowId == workFlow.WorkflowId).SingleOrDefault();
                // var workFlow = new Workflow();
               
                actionobject.WorkflowDescription = workFlow.WorkflowDescription;
                actionobject.PartNumberDescription = workFlow.PartNumberDescription;
                actionobject.Version = workFlow.Version;
                actionobject.WorkScopeId = workFlow.WorkScopeId;
                actionobject.ItemMasterId = workFlow.ItemMasterId;
                actionobject.ChangedPartNumber = workFlow.ChangedPartNumber;
                actionobject.changedPartNumberDescription = workFlow.changedPartNumberDescription;
                actionobject.CustomerId = workFlow.CustomerId;
                actionobject.CurrencyId = workFlow.CurrencyId;
                actionobject.WorkflowExpirationDate = workFlow.WorkflowExpirationDate;
                actionobject.IsCalculatedBERThreshold = workFlow.IsCalculatedBERThreshold;
                actionobject.IsFixedAmount = workFlow.IsFixedAmount;
                actionobject.IsPercentageOfNew = workFlow.IsPercentageOfNew;
                actionobject.IsPercentageOfReplacement = workFlow.IsPercentageOfReplacement;
                actionobject.FixedAmount = workFlow.FixedAmount;
                actionobject.CostOfNew = workFlow.CostOfNew;
                actionobject.PercentageOfNew = workFlow.PercentageOfNew;
                actionobject.CostOfReplacement = workFlow.CostOfReplacement;
                actionobject.PercentageOfReplacement = workFlow.PercentageOfReplacement;
                actionobject.Memo = workFlow.Memo;
                actionobject.BERThresholdAmount = workFlow.BERThresholdAmount;
                actionobject.FlatRate = workFlow.FlatRate;
                actionobject.IsActive = true;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = "admin";
                actionobject.UpdatedBy = "admin";
                UnitOfWork.Repository<Workflow>().Update(actionobject);
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
                if (workFlow.WorkflowId != 0)
                {
                    var exists = _context.Workflow.Where(a => a.WorkflowId == workFlow.WorkflowId).SingleOrDefault();
                    exists.WorkOrderNumber = "ACC" + workFlow.WorkflowId;
                    _context.Workflow.Update(exists);
                    _context.SaveChanges();
                }
                return Ok(workFlow);

            }
        }

        [HttpGet("getWorkFlow/{id:int}")]
        public IActionResult getWorkFlow(int id)
        {
            
            var workFlow = UnitOfWork.workFlowRepositoryTest.getWorkFlowWithChildren(id);

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
            }
            return Ok();
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
            }
            
            return Ok();
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
            }
            return Ok();
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
            }
            return Ok();
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
            }
            return Ok();
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
            }
            return Ok();
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
            }
            return Ok();
        }

        [HttpPost("updateCharges")]
        public IActionResult updateCharges([FromBody] WorkflowChargesList charges)
        {
            charges.MasterCompanyId = 1;
            charges.CreatedDate = DateTime.Now;
            charges.UpdatedDate = DateTime.Now;
            UnitOfWork.Repository<WorkflowChargesList>().Update(charges);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updateDirection")]
        public IActionResult updateDirection([FromBody] WorkFlowDirection direction)
        {
            direction.MasterCompanyId = 1;
            direction.CreatedDate = DateTime.Now;
            direction.UpdaedDate = DateTime.Now;
            UnitOfWork.Repository<WorkFlowDirection>().Update(direction);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updateEquipment")]
        public IActionResult updateEquipment([FromBody] WorkflowEquipmentList equipment)
        {
            equipment.MasterCompanyId = 1;
            equipment.CreatedDate = DateTime.Now;
            equipment.UpdatedDate = DateTime.Now;
            UnitOfWork.Repository<WorkflowEquipmentList>().Update(equipment);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updateExclusion")]
        public IActionResult updateExclusion([FromBody] WorkFlowExclusion exclusion)
        {
            exclusion.MasterCompanyId = 1;
            exclusion.CreatedDate = DateTime.Now;
            exclusion.UpdatedDate = DateTime.Now;
            UnitOfWork.Repository<WorkFlowExclusion>().Update(exclusion);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updateExpertise")]
        public IActionResult updateExpertise([FromBody] WorkflowExpertiseList experties)
        {
            experties.MasterCompanyId = 1;
            experties.CreatedDate = DateTime.Now;
            experties.UpdatedDate = DateTime.Now;
            UnitOfWork.Repository<WorkflowExpertiseList>().Update(experties);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updateMeasurement")]
        public IActionResult updateMeasurement([FromBody] WorkflowMeasurement measurement)
        {
            measurement.MasterCompanyId = 1;
            measurement.CreatedDate = DateTime.Now;
            measurement.UpdatedDate = DateTime.Now;
            measurement.CreatedBy = "admin";
            UnitOfWork.Repository<WorkflowMeasurement>().Update(measurement);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updatePublication")]
        public IActionResult updatePublication([FromBody] Publications publication)
        {
            publication.CreatedDate = DateTime.Now;
            UnitOfWork.Repository<Publications>().Update(publication);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpPost("updateMaterial")]
        public IActionResult updateMaterial([FromBody] WorkflowMaterial material)
        {
            material.MasterCompanyId = 1;
            material.CreatedDate = DateTime.Now;
            material.UpdatedDate = DateTime.Now;
            UnitOfWork.Repository<WorkflowMaterial>().Update(material);
            UnitOfWork.SaveChanges();
            return Ok();
        }

    }
}
