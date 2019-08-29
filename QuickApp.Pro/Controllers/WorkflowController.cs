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

        [HttpGet("getWorkFlow/{id:int}")]
        public IActionResult getWorkFlow(int id)
        {
            var workFlow = UnitOfWork.workFlowRepositoryTest.getCompleteWorkFlowEntity(id);
            return Ok(workFlow);
        }

        [HttpPost("addWorkFlow")]
        public IActionResult addWorkFlow([FromBody] Workflow workFlow)
        {
            if (workFlow == null)
            {
                return BadRequest("Something went wrong while serialization. Please contact administrator.");
            }
            if (ModelState.IsValid)
            {

                if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                {
                    var currentIds = workFlow.Charges.Select(x => x.WorkflowChargesListId).ToList();
                    List<WorkflowChargesList> itemsToRemove = new List<WorkflowChargesList>();
                    List<long> taskIds = new List<long>();
                    taskIds = getAllUniqueTaskIds(workFlow);

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkflowChargesList>()
                        .Find(x => x.WorkflowId == workFlow.Charges.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Charges.FirstOrDefault().TaskId &&
                            !currentIds.Contains(x.WorkflowChargesListId)
                        ).ToList();
                    }

                    foreach (var charges in itemsToRemove)
                    {
                        charges.IsDelete = true;
                    }

                    workFlow.Charges.AddRange(itemsToRemove);

                    foreach (var charge in workFlow.Charges)
                    {
                        charge.CreatedDate = DateTime.Now;
                        charge.CreatedBy = "admin";
                        charge.MasterCompanyId = 1;
                    }
                }
                else
                {
                    List<long> taskIds = new List<long>();
                    if (workFlow.WorkScopeId >= 0)
                    {
                        taskIds = getAllUniqueTaskIds(workFlow);
                    }

                    workFlow.Charges = UnitOfWork.Repository<WorkflowChargesList>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                                                taskIds.Contains(x.TaskId)
                                            ).ToList();

                    foreach (var charge in workFlow.Charges)
                    {
                        charge.IsDelete = true;
                    }
                }

                if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                {
                    var currentids = workFlow.Directions.Select(x => x.WorkflowDirectionId).ToList();

                    var itemsToRemove = UnitOfWork.Repository<WorkFlowDirection>()
                        .Find(x => x.WorkflowId == workFlow.Directions.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Directions.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.WorkflowDirectionId)
                        );

                    foreach (var direction in itemsToRemove)
                    {
                        direction.IsDelete = true;
                    }

                    workFlow.Directions.AddRange(itemsToRemove);

                    foreach (var direction in workFlow.Directions)
                    {
                        direction.CreatedDate = DateTime.Now;
                        direction.CreatedBy = "admin";
                        direction.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.Directions = UnitOfWork.Repository<WorkFlowDirection>()
                                            .Find(x => x.WorkflowId == workFlow.Directions.FirstOrDefault().WorkflowId &&
                                                x.TaskId == workFlow.Directions.FirstOrDefault().TaskId
                                            ).ToList();

                    foreach (var direction in workFlow.Directions)
                    {
                        direction.IsDelete = true;
                    }
                }

                if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                {
                    var currentids = workFlow.Equipments.Select(x => x.WorkflowEquipmentListId).ToList();

                    var itemsToRemove = UnitOfWork.Repository<WorkflowEquipmentList>()
                        .Find(x => x.WorkflowId == workFlow.Equipments.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Equipments.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.WorkflowEquipmentListId)
                        );

                    foreach (var equipment in itemsToRemove)
                    {
                        equipment.IsDelete = true;
                    }

                    workFlow.Equipments.AddRange(itemsToRemove);

                    foreach (var equipment in workFlow.Equipments)
                    {
                        equipment.CreatedDate = DateTime.Now;
                        equipment.CreatedBy = "admin";
                        equipment.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.Equipments = UnitOfWork.Repository<WorkflowEquipmentList>()
                       .Find(x => x.WorkflowId == workFlow.Equipments.FirstOrDefault().WorkflowId &&
                           x.TaskId == workFlow.Equipments.FirstOrDefault().TaskId
                       ).ToList();

                    foreach (var equipment in workFlow.Equipments)
                    {
                        equipment.IsDelete = true;
                    }
                }

                if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                {
                    var currentids = workFlow.Exclusions.Select(x => x.WorkflowExclusionId).ToList();

                    var itemsToRemove = UnitOfWork.Repository<WorkFlowExclusion>()
                        .Find(x => x.WorkflowId == workFlow.Exclusions.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Exclusions.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.WorkflowExclusionId)
                        );

                    foreach (var exclusion in itemsToRemove)
                    {
                        exclusion.IsDelete = true;
                    }

                    workFlow.Exclusions.AddRange(itemsToRemove);

                    foreach (var exclusion in workFlow.Exclusions)
                    {
                        exclusion.CreatedDate = DateTime.Now;
                        exclusion.CreatedBy = "admin";
                        exclusion.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.Exclusions = UnitOfWork.Repository<WorkFlowExclusion>()
                     .Find(x => x.WorkflowId == workFlow.Exclusions.FirstOrDefault().WorkflowId &&
                         x.TaskId == workFlow.Exclusions.FirstOrDefault().TaskId
                     ).ToList();

                    foreach (var exclusion in workFlow.Exclusions)
                    {
                        exclusion.IsDelete = true;
                    }
                }

                if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                {
                    var currentids = workFlow.Expertise.Select(x => x.WorkflowExpertiseListId).ToList();

                    var itemsToRemove = UnitOfWork.Repository<WorkflowExpertiseList>()
                        .Find(x => x.WorkflowId == workFlow.Expertise.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Expertise.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.WorkflowExpertiseListId)
                        );

                    foreach (var expertise in itemsToRemove)
                    {
                        expertise.IsDelete = true;
                    }

                    workFlow.Expertise.AddRange(itemsToRemove);

                    foreach (var expert in workFlow.Expertise)
                    {
                        expert.CreatedDate = DateTime.Now;
                        expert.CreatedBy = "admin";
                        expert.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.Expertise = UnitOfWork.Repository<WorkflowExpertiseList>()
                         .Find(x => x.WorkflowId == workFlow.Expertise.FirstOrDefault().WorkflowId &&
                             x.TaskId == workFlow.Expertise.FirstOrDefault().TaskId
                         ).ToList();

                    foreach (var expertise in workFlow.Expertise)
                    {
                        expertise.IsDelete = true;
                    }
                }

                if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                {
                    var currentids = workFlow.MaterialList.Select(x => x.WorkflowMaterialListId).ToList();

                    var itemsToRemove = UnitOfWork.Repository<WorkflowMaterial>()
                        .Find(x => x.WorkflowId == workFlow.MaterialList.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.MaterialList.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.WorkflowMaterialListId)
                        );

                    foreach (var material in itemsToRemove)
                    {
                        material.IsDelete = true;
                    }

                    workFlow.MaterialList.AddRange(itemsToRemove);

                    foreach (var material in workFlow.MaterialList)
                    {
                        material.CreatedDate = DateTime.Now;
                        material.CreatedBy = "admin";
                        material.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.MaterialList = UnitOfWork.Repository<WorkflowMaterial>()
                         .Find(x => x.WorkflowId == workFlow.MaterialList.FirstOrDefault().WorkflowId &&
                             x.TaskId == workFlow.MaterialList.FirstOrDefault().TaskId
                         ).ToList();

                    foreach (var material in workFlow.MaterialList)
                    {
                        material.IsDelete = true;
                    }
                }

                if (workFlow.Measurements != null && workFlow.Measurements.Count > 0)
                {
                    var currentids = workFlow.Measurements.Select(x => x.WorkflowMeasurementId).ToList();

                    var itemsToRemove = UnitOfWork.Repository<WorkflowMeasurement>()
                        .Find(x => x.WorkflowId == workFlow.Measurements.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Measurements.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.WorkflowMeasurementId)
                        );

                    foreach (var measurement in itemsToRemove)
                    {
                        measurement.IsDelete = true;
                    }

                    workFlow.Measurements.AddRange(itemsToRemove);

                    foreach (var measurement in workFlow.Measurements)
                    {
                        measurement.CreatedDate = DateTime.Now;
                        measurement.CreatedBy = "admin";
                        measurement.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.Measurements = UnitOfWork.Repository<WorkflowMeasurement>()
                         .Find(x => x.WorkflowId == workFlow.Measurements.FirstOrDefault().WorkflowId &&
                             x.TaskId == workFlow.Measurements.FirstOrDefault().TaskId
                         ).ToList();

                    foreach (var measurement in workFlow.Measurements)
                    {
                        measurement.IsDelete = true;
                    }
                }


                if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                {
                    var currentids = workFlow.Publication.Select(x => x.Id).ToList();

                    var itemsToRemove = UnitOfWork.Repository<Publications>()
                        .Find(x => x.WorkflowId == workFlow.Publication.FirstOrDefault().WorkflowId &&
                            x.TaskId == workFlow.Publication.FirstOrDefault().TaskId &&
                            !currentids.Contains(x.Id)
                        );

                    foreach (var publication in itemsToRemove)
                    {
                        publication.IsDeleted = true;
                    }

                    workFlow.Publication.AddRange(itemsToRemove);


                    foreach (var publication in workFlow.Publication)
                    {
                        List<long> ids = new List<long>();

                        if (publication.WorkflowPublicationDashNumbers != null)
                        {
                            ids = publication.WorkflowPublicationDashNumbers.Select(x => x.WorkflowPublicationDashNumberId).ToList();
                        }

                        var itemsToDelete = UnitOfWork.Repository<WorkflowPublicationDashNumber>()
                            .Find(x =>
                            workFlow.WorkflowId == x.WorkflowId &&
                            x.PublicationsId == publication.Id &&
                            !ids.Contains(x.WorkflowPublicationDashNumberId)
                            );

                        foreach (var item in itemsToDelete)
                        {
                            UnitOfWork.Repository<WorkflowPublicationDashNumber>().Remove(item);
                        }

                        publication.CreatedDate = DateTime.Now;
                        publication.CreatedBy = "admin";
                        publication.MasterCompanyId = 1;
                    }
                }
                else
                {
                    workFlow.Publication = UnitOfWork.Repository<Publications>()
                         .Find(x => x.WorkflowId == workFlow.Publication.FirstOrDefault().WorkflowId &&
                             x.TaskId == workFlow.Publication.FirstOrDefault().TaskId
                         ).ToList();

                    foreach (var publication in workFlow.Publication)
                    {
                        publication.IsDeleted = true;
                    }
                }
                //var existingWorkflow = UnitOfWork.Repository<Workflow>().Find(workflow => workflow.WorkflowId == workFlow.WorkflowId).FirstOrDefault();

                if (workFlow != null && workFlow.WorkflowId > 0)
                {
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.CreatedBy = "admin";
                    workFlow.UpdatedBy = "admin";
                    workFlow.MasterCompanyId = 1;
                    workFlow.IsActive = true;
                    UnitOfWork.Repository<Workflow>().Update(workFlow);
                    UnitOfWork.SaveChanges();
                    return Ok(workFlow);
                }
                else
                {
                    workFlow.MasterCompanyId = 1;
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.IsActive = true;
                    workFlow.MasterCompanyId = 1;
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

        [HttpPost("addWorkFlowHeader")]
        public IActionResult addWorkFlowHeader([FromBody]Workflow workFlow)
        {
            if (workFlow == null)
            {
                return BadRequest("Something went wrong while serialization. Please contact administrator.");
            }
            if (ModelState.IsValid)
            {
                if (workFlow.WorkflowId > 0)
                {
                    //update workflow header
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.CreatedBy = "admin";
                    workFlow.UpdatedBy = "admin";
                    workFlow.MasterCompanyId = 1;
                    workFlow.IsActive = true;
                    UnitOfWork.Repository<Workflow>().Update(workFlow);

                    
                }
                else
                {
                    // add workflow header
                    workFlow.MasterCompanyId = 1;
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.IsActive = true;
                    UnitOfWork.Repository<Workflow>().Add(workFlow);
                    UnitOfWork.SaveChanges();
                    workFlow.WorkOrderNumber = "ACC" + workFlow.WorkflowId;
                    UnitOfWork.Repository<Workflow>().Update(workFlow);
                }

                UnitOfWork.SaveChanges();
                return Ok(workFlow);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
        }

        [HttpDelete("toggleState/{workFlowId}")]
        public IActionResult toggleState(long workFlowId)
        {
            var workFlow = UnitOfWork.Repository<Workflow>().Get(workFlowId);
            if (workFlow != null)
            {
                workFlow.IsActive = workFlow.IsActive == true ? false : true;
                workFlow.UpdatedBy = "Admin";
                workFlow.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<Workflow>().Update(workFlow);
                UnitOfWork.SaveChanges();
            }
            else
            {
                return BadRequest(new Exception("Work Flow does not exist."));
            }
            return Ok();
        }

        [HttpDelete("remove/{workFlowId}")]
        public IActionResult removeWorkFlow(long workFlowId)
        {
            var workFlow = UnitOfWork.Repository<Workflow>().Get(workFlowId);
            if (workFlow != null)
            {
                workFlow.IsDelete = true;
                workFlow.UpdatedBy = "Admin";
                workFlow.UpdatedDate = DateTime.Now;
                UnitOfWork.Repository<Workflow>().Update(workFlow);
                UnitOfWork.SaveChanges();
            }
            else
            {
                return BadRequest(new Exception("Workflow does not exist."));
            }
            return Ok();
        }

        #region Private Methods

        private List<long> getAllUniqueTaskIds(Workflow workflow)
        {
            var ids = new List<long>();

            if (workflow.Charges != null && workflow.Charges.Count > 0)
            {
                ids.AddRange(workflow.Charges.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.Directions != null && workflow.Directions.Count > 0)
            {
                ids.AddRange(workflow.Directions.Select(x => x.TaskId.Value).Distinct().ToList());
            }
            if (workflow.Equipments != null && workflow.Equipments.Count > 0)
            {
                ids.AddRange(workflow.Equipments.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.Exclusions != null && workflow.Exclusions.Count > 0)
            {
                ids.AddRange(workflow.Exclusions.Select(x => x.TaskId.Value).Distinct().ToList());
            }
            if (workflow.Expertise != null && workflow.Expertise.Count > 0)
            {
                ids.AddRange(workflow.Expertise.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.MaterialList != null && workflow.MaterialList.Count > 0)
            {
                ids.AddRange(workflow.MaterialList.Select(x => x.TaskId.Value).Distinct().ToList());
            }
            if (workflow.Measurements != null && workflow.Measurements.Count > 0)
            {
                ids.AddRange(workflow.Measurements.Select(x => x.TaskId).Distinct().ToList());
            }
            if (workflow.Publication != null && workflow.Publication.Count > 0)
            {
                ids.AddRange(workflow.Publication.Select(x => x.TaskId).Distinct().ToList());
            }
            return ids;
        }

        #endregion Private Methods
    }
}
