using DAL;
using System;
using DAL.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace QuickApp.Pro.Controllers
{

    [Route("api/[controller]")]
    public class WorkflowController : ControllerBase
    {
        private IUnitOfWork UnitOfWork;
        private readonly ApplicationDbContext _context;
        private int masterCompanyId = 1;
        private string userName = "admin";

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
                List<long> taskIds = new List<long>();
                if (workFlow.WorkflowId > 0)
                {
                    taskIds = getAllUniqueTaskIds(workFlow);
                }

                if (workFlow.Charges != null && workFlow.Charges.Count > 0)
                {

                    var currentIds = workFlow.Charges.Select(x => x.WorkflowChargesListId).ToList();
                    List<WorkflowChargesList> itemsToRemove = new List<WorkflowChargesList>();

                    workFlow.Charges.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {

                        itemsToRemove = UnitOfWork.Repository<WorkflowChargesList>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowChargesListId)
                        ).ToList();

                        foreach (var charges in itemsToRemove)
                        {
                            charges.IsDelete = true;
                        }

                        workFlow.Charges.AddRange(itemsToRemove);

                    }

                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Charges = UnitOfWork.Repository<WorkflowChargesList>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                                                x.IsDelete == false
                                            ).ToList();

                        workFlow.Charges.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdatedDate = DateTime.Now;
                            x.IsDelete = true;
                        });
                    }
                }

                if (workFlow.Directions != null && workFlow.Directions.Count > 0)
                {
                    var currentIds = workFlow.Directions.Select(x => x.WorkflowDirectionId).ToList();
                    List<WorkFlowDirection> itemsToRemove = new List<WorkFlowDirection>();

                    workFlow.Directions.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdaedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkFlowDirection>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowDirectionId)
                        ).ToList();

                        foreach (var item in itemsToRemove)
                        {
                            item.IsDelete = true;
                        }
                        workFlow.Directions.AddRange(itemsToRemove);
                    }
                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Directions = UnitOfWork.Repository<WorkFlowDirection>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId
                                            && x.IsDelete == false
                                            ).ToList();

                        workFlow.Directions.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdaedDate = DateTime.Now;
                            x.IsDelete = true;
                        });
                    }
                }

                if (workFlow.Equipments != null && workFlow.Equipments.Count > 0)
                {
                    var currentIds = workFlow.Equipments.Select(x => x.WorkflowEquipmentListId).ToList();
                    List<WorkflowEquipmentList> itemsToRemove = new List<WorkflowEquipmentList>();

                    workFlow.Equipments.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkflowEquipmentList>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowEquipmentListId)
                        ).ToList();

                        foreach (var item in itemsToRemove)
                        {
                            item.IsDelete = true;
                        }
                        workFlow.Equipments.AddRange(itemsToRemove);
                    }
                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Equipments = UnitOfWork.Repository<WorkflowEquipmentList>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId
                                                && x.IsDelete == false
                                            ).ToList();
                        workFlow.Equipments.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdatedDate = DateTime.Now;
                            x.IsDelete = true;
                        });
                    }
                }

                if (workFlow.Exclusions != null && workFlow.Exclusions.Count > 0)
                {
                    var currentIds = workFlow.Exclusions.Select(x => x.WorkflowExclusionId).ToList();
                    List<WorkFlowExclusion> itemsToRemove = new List<WorkFlowExclusion>();

                    workFlow.Exclusions.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkFlowExclusion>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowExclusionId)
                        ).ToList();

                        foreach (var item in itemsToRemove)
                        {
                            item.IsDelete = true;
                        }

                        workFlow.Exclusions.AddRange(itemsToRemove);
                    }

                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Exclusions = UnitOfWork.Repository<WorkFlowExclusion>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId
                                                && x.IsDelete == false
                                            ).ToList();
                        workFlow.Exclusions.ForEach(x =>
                         {
                             x.UpdatedBy = userName;
                             x.UpdatedDate = DateTime.Now;
                             x.IsDelete = true;
                         });
                    }
                }

                if (workFlow.Expertise != null && workFlow.Expertise.Count > 0)
                {
                    var currentIds = workFlow.Expertise.Select(x => x.WorkflowExpertiseListId).ToList();
                    List<WorkflowExpertiseList> itemsToRemove = new List<WorkflowExpertiseList>();

                    workFlow.Expertise.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkflowExpertiseList>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowExpertiseListId)
                        ).ToList();

                        foreach (var item in itemsToRemove)
                        {
                            item.IsDelete = true;
                        }

                        workFlow.Expertise.AddRange(itemsToRemove);
                    }
                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Expertise = UnitOfWork.Repository<WorkflowExpertiseList>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId
                                                && x.IsDelete == false
                                            ).ToList();

                        workFlow.Expertise.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdatedDate = DateTime.Now;
                            x.IsDelete = true;
                        });
                    }
                }

                if (workFlow.MaterialList != null && workFlow.MaterialList.Count > 0)
                {
                    var currentIds = workFlow.MaterialList.Select(x => x.WorkflowMaterialListId).ToList();
                    List<WorkflowMaterial> itemsToRemove = new List<WorkflowMaterial>();

                    workFlow.MaterialList.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkflowMaterial>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowMaterialListId)
                        ).ToList();

                        foreach (var item in itemsToRemove)
                        {
                            item.IsDelete = true;
                        }

                        workFlow.MaterialList.AddRange(itemsToRemove);
                    }

                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.MaterialList = UnitOfWork.Repository<WorkflowMaterial>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId
                                                && x.IsDelete == false
                                            ).ToList();

                        workFlow.MaterialList.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdatedDate = DateTime.Now;
                            x.IsDelete = true;
                        });
                    }
                }

                if (workFlow.Measurements != null && workFlow.Measurements.Count > 0)
                {
                    var currentIds = workFlow.Measurements.Select(x => x.WorkflowMeasurementId).ToList();
                    List<WorkflowMeasurement> itemsToRemove = new List<WorkflowMeasurement>();

                    workFlow.Measurements.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });

                    if (workFlow.WorkflowId > 0)
                    {
                        itemsToRemove = UnitOfWork.Repository<WorkflowMeasurement>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId &&
                        x.IsDelete == false && !currentIds.Contains(x.WorkflowMeasurementId)
                        ).ToList();

                        foreach (var item in itemsToRemove)
                        {
                            item.IsDelete = true;
                        }
                        workFlow.Measurements.AddRange(itemsToRemove);
                    }
                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Measurements = UnitOfWork.Repository<WorkflowMeasurement>()
                                            .Find(x => x.WorkflowId == workFlow.WorkflowId
                                                && x.IsDelete == false
                                            ).ToList();
                        workFlow.Measurements.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdatedDate = DateTime.Now;
                            x.IsDelete = true;
                        });
                    }
                }


                if (workFlow.Publication != null && workFlow.Publication.Count > 0)
                {
                    var currentids = workFlow.Publication.Select(x => x.Id).ToList();

                    workFlow.Publication.ForEach(x =>
                    {
                        x.MasterCompanyId = masterCompanyId;
                        x.CreatedBy = userName;
                        x.CreatedDate = DateTime.Now;
                        x.UpdatedBy = userName;
                        x.UpdatedDate = DateTime.Now;
                    });
                    if (workFlow.WorkflowId > 0)
                    {
                        var itemsToRemove = UnitOfWork.Repository<Publications>()
                        .Find(x => x.WorkflowId == workFlow.WorkflowId
                        && x.IsDeleted == false && !currentids.Contains(x.Id)
                        ).ToList();

                        foreach (var publication in itemsToRemove)
                        {
                            publication.IsDeleted = true;
                        }

                        workFlow.Publication.AddRange(itemsToRemove);
                    }

                    List<long> ids = new List<long>();
                    foreach (var publication in workFlow.Publication)
                    {
                        ids.Clear();

                        if (publication.WorkflowPublicationDashNumbers != null)
                        {
                            ids = publication.WorkflowPublicationDashNumbers.Select(x => x.WorkflowPublicationDashNumberId).ToList();
                        }

                        var itemsToDelete = UnitOfWork.Repository<WorkflowPublicationDashNumber>()
                            .Find(x =>
                            x.PublicationsId == publication.Id &&
                            !ids.Contains(x.WorkflowPublicationDashNumberId)
                            );

                        foreach (var item in itemsToDelete)
                        {
                            UnitOfWork.Repository<WorkflowPublicationDashNumber>().Remove(item);
                        }
                    }
                }
                else
                {
                    if (workFlow.WorkflowId > 0)
                    {
                        workFlow.Publication = UnitOfWork.Repository<Publications>()
                         .Find(x => x.WorkflowId == workFlow.WorkflowId
                            && x.IsDeleted == false
                         ).ToList();

                        workFlow.Publication.ForEach(x =>
                        {
                            x.UpdatedBy = userName;
                            x.UpdatedDate = DateTime.Now;
                            x.IsDeleted = true;
                        });
                    }
                }
                if (workFlow != null && workFlow.WorkflowId > 0)
                {
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.CreatedBy = userName;
                    workFlow.UpdatedBy = userName;
                    workFlow.MasterCompanyId = masterCompanyId;
                    workFlow.IsActive = true;
                    workFlow.WorkOrderNumber = "ACC" + workFlow.WorkflowId.ToString();
                    UnitOfWork.Repository<Workflow>().Update(workFlow);
                    UnitOfWork.SaveChanges();
                    return Ok(workFlow);
                }
                else
                {
                    workFlow.CreatedDate = DateTime.Now;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.CreatedBy = userName;
                    workFlow.UpdatedBy = userName;
                    workFlow.MasterCompanyId = masterCompanyId;
                    workFlow.IsActive = true;
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
                return BadRequest("Something went wrong while doing serialization. Please contact administrator.");
            }
            if (ModelState.IsValid)
            {
                if (workFlow.WorkflowId > 0)
                {
                    //update workflow header
                    var wf = UnitOfWork.Repository<Workflow>().Get(workFlow.WorkflowId);
                    workFlow.CreatedBy = wf.CreatedBy;
                    workFlow.UpdatedDate = DateTime.Now;
                    workFlow.UpdatedBy = "admin";
                    workFlow.MasterCompanyId = 1;
                    workFlow.IsActive = true;
                    workFlow.WorkOrderNumber = "ACC" + workFlow.WorkflowId.ToString();
                    wf = null;
                    UnitOfWork.Repository<Workflow>().Update(workFlow);
                }
                else
                {
                    // add workflow header
                    workFlow.MasterCompanyId = masterCompanyId;
                    workFlow.CreatedBy = userName;
                    workFlow.UpdatedBy = userName;
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

        [HttpGet("getWorkFlowWithMaterialList/{id:int}")]
        public IActionResult getWorkFlowWithMaterialList(int id)
        {
            var workFlow = UnitOfWork.workFlowRepositoryTest.getWorkFlowWithMaterialList(id);
            return Ok(workFlow);
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
