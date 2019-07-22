using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class WorkflowActionController : Controller
    {
        #region Private Members

        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        #endregion Private Members

        #region Constructor

        public WorkflowActionController(IUnitOfWork unitOfWork, ApplicationDbContext context, ILogger<WorkflowActionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        #endregion Constructor

        #region Public Members

        [HttpGet("Get")]
        [Produces(typeof(List<WorkflowActionViewModel>))]
        public IActionResult Get()
        {
            var allWorlFlowActions = _context.Task.OrderByDescending(a => a.TaskId).ToList();
            return Ok(allWorlFlowActions);

        }

        [HttpGet("GetWorkFlows")]
        public object GetWorkFlows()
        {
            var workflows = _unitOfWork.workFlowRepositoryTest.getAllWorkFlow(); //_unitOfWork.Repository<Workflow>().Find(workflow => workflow.IsDelete == null || workflow.IsDelete != true);
            return workflows.Select(workflow =>
                new
                {
                    workflow = workflow,
                    WorkflowId = workflow.WorkflowId,
                    Description = workflow.WorkScope != null ? workflow.WorkScope.Description : "",
                    WorkScopeId = workflow.WorkScopeId,
                    PartNumber = workflow.ItemMaster.PartNumber,
                    Name = workflow.Customer != null ? workflow.Customer.Name : "",
                    PartDescription = workflow.ItemMaster.PartDescription,
                    WorkOrderNumber = workflow.WorkOrderNumber,
                    CreatedDate = workflow.CreatedDate,
                    WorkflowExpirationDate = workflow.WorkflowExpirationDate,
                    WorkflowCreateDate = workflow.WorkflowCreateDate != null ? workflow.WorkflowCreateDate.Value.ToShortDateString() : "",
                    Version  = workflow.Version,
                    OtherCost = workflow.OtherCost
                });
        }

        [HttpGet("GetActionAttributes")]
        [Produces(typeof(List<ActionAttributeViewModel>))]
        public IActionResult GetActionAttributes()
        {
            var allWorlFlowActionattributes = _context.ActionAttribute.OrderByDescending(a => a.ActionAttributeId).ToList();
            return Ok(allWorlFlowActionattributes);

        }

        [HttpGet("GetWorkflowActionAttributes/{workflowId}")]
        [Produces(typeof(List<WorkflowActionAttributeViewModel>))]
        public IActionResult GetWorkflowActionAttributes(long workflowid)
        {
            //var allWorlFlowActionattributes = _context.WorkflowActionAttribute.OrderByDescending(a => a.WorkflowActionAttributeId).Where(a => a.WorkflowId == workflowid).ToList();
            return Ok(ModelState);

        }


        [HttpGet("GetMaterialType")]
        [Produces(typeof(List<WorkflowActionAttributeViewModel>))]
        public IActionResult GetMaterialType(long workflowid)
        {
            //var allWorlFlowActionattributes = _context.WorkflowActionAttribute.OrderByDescending(a => a.WorkflowActionAttributeId).Where(a => a.WorkflowId == workflowid).ToList();
            return Ok(ModelState);

        }

        [HttpGet("GetWorkflowMaterail")]
        [Produces(typeof(List<WorkflowMaterialViewModel>))]
        public IActionResult GetWorkflowMaterail()
        {
            var allWorlFlowMaterail = _context.WorkflowMaterial.OrderByDescending(a => a.WorkflowMaterialListId).ToList();
            return Ok(allWorlFlowMaterail);

        }

        [HttpGet("GetWorkflowequipment")]
        [Produces(typeof(List<WorkflowEquipmentListViewModel>))]
        public IActionResult GetWorkflowequipment()
        {
            var allWorlFlowEquipment = _context.WorkflowEquipmentList.OrderByDescending(a => a.WorkflowEquipmentListId).ToList();
            return Ok(allWorlFlowEquipment);

        }

        [HttpGet("GetWorkflowCharge")]
        [Produces(typeof(List<WorkflowChargesListViewModel>))]
        public IActionResult GetWorkflowCharge()
        {
            var allWorlFlowEquipment = _context.WorkflowChargesList.OrderByDescending(a => a.WorkflowChargesListId).ToList();
            return Ok(allWorlFlowEquipment);

        }

        [HttpGet("GetWorkflowExpertise")]
        [Produces(typeof(List<WorkflowExpertiseListViewModel>))]
        public IActionResult GetWorkflowExpertise()
        {
            var allWorlFlowActionattributes = _context.WorkflowExpertiseList.OrderByDescending(a => a.WorkflowExpertiseListId).ToList();
            return Ok(allWorlFlowActionattributes);

        }

        [HttpPost("AddWorkFlow")]
        public IActionResult SaveWorkFlowdetails([FromBody] WorkflowViewModel workflowViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.Workflow.Any(o => o.WorkflowId == workflowViewModel.WorkflowId))
                {
                    if (workflowViewModel == null)
                        return BadRequest($"{nameof(workflowViewModel)} cannot be null");
                    var actionobject = _context.Workflow.Where(a => a.WorkflowId == workflowViewModel.WorkflowId).SingleOrDefault();

                    workflowViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowDescription = workflowViewModel.WorkflowDescription;
                    actionobject.PartNumberDescription = workflowViewModel.PartNumberDescription;
                    actionobject.Version = workflowViewModel.Version;
                    actionobject.WorkScopeId = workflowViewModel.WorkflowScopeId;
                    actionobject.ItemMasterId = workflowViewModel.ItemMasterId;
                    actionobject.ChangedPartNumber = workflowViewModel.ChangedPartNumber;
                    actionobject.ChangedPartNumberDescription = workflowViewModel.changedPartNumberDescription;
                    actionobject.CustomerId = workflowViewModel.CustomerId;
                    //actionobject.CustomerName = workflowViewModel.CustomerName;
                    //actionobject.CustomerCode = workflowViewModel.CustomerCode;
                    actionobject.CurrencyId = workflowViewModel.CurrencyId;
                    actionobject.WorkflowExpirationDate = workflowViewModel.WorkflowExpirationDate;
                    actionobject.IsCalculatedBERThreshold = workflowViewModel.IsCalculatedBERThreshold;
                    actionobject.IsFixedAmount = workflowViewModel.IsFixedAmount;
                    actionobject.IsPercentageOfNew = workflowViewModel.IsPercentageOfNew;
                    actionobject.IsPercentageOfReplacement = workflowViewModel.IsPercentageOfReplacement;
                    actionobject.FixedAmount = workflowViewModel.FixedAmount;
                    actionobject.CostOfNew = workflowViewModel.CostOfNew;
                    actionobject.PercentageOfNew = workflowViewModel.PercentageOfNew;
                    actionobject.CostOfReplacement = workflowViewModel.CostOfReplacement;

                    actionobject.PercentageOfReplacement = workflowViewModel.PercentageOfReplacement;
                    actionobject.Memo = workflowViewModel.Memo;
                    actionobject.CostOfReplacement = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.Workflow.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
                else
                {
                    if (workflowViewModel == null)
                        return BadRequest($"{nameof(workflowViewModel)} cannot be null");
                    DAL.Models.Workflow actionobject = new DAL.Models.Workflow();
                    workflowViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowDescription = workflowViewModel.WorkflowDescription;
                    actionobject.Version = workflowViewModel.Version;
                    actionobject.PartNumberDescription = workflowViewModel.PartNumberDescription;
                    actionobject.WorkScopeId = workflowViewModel.WorkflowScopeId;
                    actionobject.ItemMasterId = workflowViewModel.ItemMasterId;
                    actionobject.ChangedPartNumber = workflowViewModel.ChangedPartNumber;
                    actionobject.ChangedPartNumberDescription = workflowViewModel.changedPartNumberDescription;
                    actionobject.CustomerId = workflowViewModel.CustomerId;
                    //actionobject.CustomerCode = workflowViewModel.CustomerCode;
                    actionobject.CurrencyId = workflowViewModel.CurrencyId;
                    actionobject.WorkflowExpirationDate = workflowViewModel.WorkflowExpirationDate;
                    actionobject.IsCalculatedBERThreshold = workflowViewModel.IsCalculatedBERThreshold;
                    actionobject.IsFixedAmount = workflowViewModel.IsFixedAmount;
                    actionobject.IsPercentageOfNew = workflowViewModel.IsPercentageOfNew;
                    actionobject.IsPercentageOfReplacement = workflowViewModel.IsPercentageOfReplacement;
                    actionobject.FixedAmount = workflowViewModel.FixedAmount;
                    actionobject.CostOfNew = workflowViewModel.CostOfNew;
                    actionobject.PercentageOfNew = workflowViewModel.PercentageOfNew;
                    actionobject.CostOfReplacement = workflowViewModel.CostOfReplacement;

                    actionobject.PercentageOfReplacement = workflowViewModel.PercentageOfReplacement;
                    actionobject.Memo = workflowViewModel.Memo;
                    actionobject.CostOfReplacement = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.Workflow.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
            }
            return Ok(ModelState);
        }

        [HttpPost("AddWorkFlowActionAttributes")]
        public IActionResult SaveWorkFlowActionAttributes([FromBody] WorkflowActionAttributeViewModel workflowActionAttributeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.WorkflowActionAttribute.Any(o => o.WorkflowActionAttributeId == workflowActionAttributeViewModel.WorkflowActionAttributeId))

                {
                    if (workflowActionAttributeViewModel == null)
                        return BadRequest($"{nameof(workflowActionAttributeViewModel)} cannot be null");
                    var actionobject = _context.WorkflowActionAttribute.Where(a => a.WorkflowId == workflowActionAttributeViewModel.WorkflowActionAttributeId).SingleOrDefault();
                    workflowActionAttributeViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowActionAttributeViewModel.WorkflowId;
                    actionobject.WorkflowActionId = workflowActionAttributeViewModel.WorkflowActionId;
                    actionobject.isCharges = workflowActionAttributeViewModel.isCharges;
                    actionobject.isDirections = workflowActionAttributeViewModel.isDirections;
                    actionobject.isEquipment = workflowActionAttributeViewModel.isEquipment;
                    actionobject.isExclusions = workflowActionAttributeViewModel.isExclusions;
                    actionobject.isExpertise = workflowActionAttributeViewModel.isExpertise;
                    actionobject.isMaterialList = workflowActionAttributeViewModel.isMaterialList;
                    actionobject.isMeasurements = workflowActionAttributeViewModel.isMeasurements;
                    actionobject.isPublications = workflowActionAttributeViewModel.isPublications;
                    actionobject.WorkflowActionAttributeIds = workflowActionAttributeViewModel.WorkflowActionAttributeIds;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowActionAttribute.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
                else
                {
                    if (workflowActionAttributeViewModel == null)
                        return BadRequest($"{nameof(workflowActionAttributeViewModel)} cannot be null");
                    DAL.Models.WorkflowActionAttribute actionobject = new DAL.Models.WorkflowActionAttribute();
                    workflowActionAttributeViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowActionAttributeViewModel.WorkflowId;
                    actionobject.WorkflowActionId = workflowActionAttributeViewModel.WorkflowActionId;
                    actionobject.WorkflowActionAttributeIds = workflowActionAttributeViewModel.WorkflowActionAttributeIds;
                    actionobject.isCharges = workflowActionAttributeViewModel.isCharges;
                    actionobject.isDirections = workflowActionAttributeViewModel.isDirections;
                    actionobject.isEquipment = workflowActionAttributeViewModel.isEquipment;
                    actionobject.isExclusions = workflowActionAttributeViewModel.isExclusions;
                    actionobject.isExpertise = workflowActionAttributeViewModel.isExpertise;
                    actionobject.isMaterialList = workflowActionAttributeViewModel.isMaterialList;
                    actionobject.isMeasurements = workflowActionAttributeViewModel.isMeasurements;
                    actionobject.isPublications = workflowActionAttributeViewModel.isPublications;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowActionAttribute.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
            }

            return Ok(ModelState);
        }

        [HttpPost("SaveMaterialList")]
        public IActionResult SaveMaterialList([FromBody] WorkflowMaterialViewModel workflowMaterialViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.WorkflowMaterial.Any(o => o.WorkflowMaterialListId == workflowMaterialViewModel.WorkflowMaterialListId))
                {
                    if (workflowMaterialViewModel == null)
                        return BadRequest($"{nameof(workflowMaterialViewModel)} cannot be null");
                    var actionobject = _context.WorkflowMaterial.Where(a => a.WorkflowId == workflowMaterialViewModel.WorkflowMaterialListId).SingleOrDefault();

                    workflowMaterialViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowMaterialViewModel.WorkflowId;
                    actionobject.TaskId = workflowMaterialViewModel.ActionId;
                    actionobject.ItemMasterId = workflowMaterialViewModel.ItemMasterId;
                    //actionobject.MaterialTypeId = workflowMaterialViewModel.MaterialTypeId;
                    actionobject.Quantity = workflowMaterialViewModel.Quantity;
                    actionobject.UnitOfMeasureId = workflowMaterialViewModel.UnitOfMeasureId;
                    actionobject.ConditionCodeId = workflowMaterialViewModel.ConditionCodeId;
                    actionobject.UnitCost = workflowMaterialViewModel.UnitCost;
                    actionobject.ExtendedCost = workflowMaterialViewModel.ExtendedCost;
                    actionobject.ProvisionId = workflowMaterialViewModel.ProvisionId;
                    actionobject.IsDeferred = workflowMaterialViewModel.IsDeferred;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowMaterial.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
                else
                {
                    if (workflowMaterialViewModel == null)
                        return BadRequest($"{nameof(workflowMaterialViewModel)} cannot be null");
                    DAL.Models.WorkflowMaterial actionobject = new DAL.Models.WorkflowMaterial();
                    workflowMaterialViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowMaterialViewModel.WorkflowId;
                    actionobject.TaskId = workflowMaterialViewModel.ActionId;
                    actionobject.ItemMasterId = workflowMaterialViewModel.ItemMasterId;
                    //actionobject.MaterialTypeId = workflowMaterialViewModel.MaterialTypeId;
                    actionobject.Quantity = workflowMaterialViewModel.Quantity;
                    actionobject.UnitOfMeasureId = workflowMaterialViewModel.UnitOfMeasureId;
                    actionobject.ConditionCodeId = workflowMaterialViewModel.ConditionCodeId;
                    actionobject.UnitCost = workflowMaterialViewModel.UnitCost;
                    actionobject.ExtendedCost = workflowMaterialViewModel.ExtendedCost;
                    actionobject.ProvisionId = workflowMaterialViewModel.ProvisionId;
                    actionobject.IsDeferred = workflowMaterialViewModel.IsDeferred;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowMaterial.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
            }
            return Ok(ModelState);
        }

        [HttpPost("SaveChargeList")]
        public IActionResult SaveChargeList([FromBody] WorkflowChargesListViewModel workflowChargesListViewModel)
        {
            if (ModelState.IsValid)
            {

                if (_context.WorkflowChargesList.Any(o => o.WorkflowChargesListId == workflowChargesListViewModel.WorkflowChargesListId))

                {
                    if (workflowChargesListViewModel == null)
                        return BadRequest($"{nameof(workflowChargesListViewModel)} cannot be null");
                    var actionobject = _context.WorkflowChargesList.Where(a => a.WorkflowId == workflowChargesListViewModel.WorkflowChargesListId).SingleOrDefault();

                    workflowChargesListViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowChargesListViewModel.WorkflowId;
                    actionobject.TaskId = workflowChargesListViewModel.ActionId;
                    actionobject.WorkflowChargeTypeId = workflowChargesListViewModel.WorkflowChargeTypeId;
                    actionobject.Quantity = workflowChargesListViewModel.Quantity;
                    actionobject.UnitCost = workflowChargesListViewModel.UnitCost;
                    actionobject.ExtendedCost = workflowChargesListViewModel.ExtendedCost;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowChargesList.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
                else
                {
                    if (workflowChargesListViewModel == null)
                        return BadRequest($"{nameof(workflowChargesListViewModel)} cannot be null");
                    DAL.Models.WorkflowChargesList actionobject = new DAL.Models.WorkflowChargesList();
                    workflowChargesListViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowChargesListViewModel.WorkflowId;
                    actionobject.TaskId = workflowChargesListViewModel.ActionId;
                    actionobject.WorkflowChargeTypeId = workflowChargesListViewModel.WorkflowChargeTypeId;
                    actionobject.Quantity = workflowChargesListViewModel.Quantity;
                    actionobject.UnitCost = workflowChargesListViewModel.UnitCost;
                    actionobject.ExtendedCost = workflowChargesListViewModel.ExtendedCost;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowChargesList.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);

                }
            }
            return Ok(ModelState);
        }

        [HttpPost("SaveEquipment")]
        public IActionResult SaveEquipment([FromBody] WorkflowEquipmentListViewModel workflowEquipmentListViewModel)
        {
            if (ModelState.IsValid)
            {
                if (_context.WorkflowEquipmentList.Any(o => o.WorkflowEquipmentListId == workflowEquipmentListViewModel.WorkflowEquipmentListId))
                {
                    if (workflowEquipmentListViewModel == null)
                        return BadRequest($"{nameof(workflowEquipmentListViewModel)} cannot be null");
                    var actionobject = _context.WorkflowEquipmentList.Where(a => a.WorkflowId == workflowEquipmentListViewModel.WorkflowEquipmentListId).SingleOrDefault();
                    workflowEquipmentListViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowEquipmentListViewModel.WorkflowId;
                    actionobject.TaskId = workflowEquipmentListViewModel.ActionId;
                    actionobject.AssetId = workflowEquipmentListViewModel.AssetId;
                    actionobject.AssetDescription = workflowEquipmentListViewModel.AssetDescription;
                    actionobject.Quantity = workflowEquipmentListViewModel.Quantity;
                    //actionobject.MaterialRequirementTypeId = workflowEquipmentListViewModel.MaterialRequirementTypeId;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowEquipmentList.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
                else
                {
                    if (workflowEquipmentListViewModel == null)
                        return BadRequest($"{nameof(workflowEquipmentListViewModel)} cannot be null");
                    DAL.Models.WorkflowEquipmentList actionobject = new DAL.Models.WorkflowEquipmentList();
                    workflowEquipmentListViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowEquipmentListViewModel.WorkflowId;
                    actionobject.TaskId = workflowEquipmentListViewModel.ActionId;
                    actionobject.AssetId = workflowEquipmentListViewModel.AssetId;
                    actionobject.AssetDescription = workflowEquipmentListViewModel.AssetDescription;
                    actionobject.Quantity = workflowEquipmentListViewModel.Quantity;
                    //actionobject.MaterialRequirementTypeId = workflowEquipmentListViewModel.MaterialRequirementTypeId;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowEquipmentList.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);

                }
            }
            return Ok(ModelState);
        }

        [HttpPost("SaveExpertise")]
        public IActionResult SaveExpertise([FromBody] WorkflowExpertiseListViewModel workflowExpertiseListViewModel)
        {
            if (ModelState.IsValid)
            {

                if (_context.WorkflowExpertiseList.Any(o => o.WorkflowExpertiseListId == workflowExpertiseListViewModel.WorkflowExpertiseListId))

                {
                    if (workflowExpertiseListViewModel == null)
                        return BadRequest($"{nameof(workflowExpertiseListViewModel)} cannot be null");
                    var actionobject = _context.WorkflowExpertiseList.Where(a => a.WorkflowId == workflowExpertiseListViewModel.WorkflowExpertiseListId).SingleOrDefault();
                    workflowExpertiseListViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowExpertiseListViewModel.WorkflowId;
                    actionobject.TaskId = workflowExpertiseListViewModel.ActionId;
                    actionobject.ExpertiseTypeId = workflowExpertiseListViewModel.ExpertiseTypeId;
                    actionobject.EstimatedHours = workflowExpertiseListViewModel.EstimatedHours;
                    actionobject.LaborDirectRate = workflowExpertiseListViewModel.LaborDirectRate;
                    actionobject.DirectLaborRate = workflowExpertiseListViewModel.DirectLaborRate;
                    actionobject.OverheadBurden = workflowExpertiseListViewModel.OverheadBurden;
                    actionobject.OverheadCost = workflowExpertiseListViewModel.OverheadCost;
                    actionobject.LaborOverheadCost = workflowExpertiseListViewModel.LaborOverheadCost;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowExpertiseList.Update(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);
                }
                else
                {
                    if (workflowExpertiseListViewModel == null)
                        return BadRequest($"{nameof(workflowExpertiseListViewModel)} cannot be null");
                    DAL.Models.WorkflowExpertiseList actionobject = new DAL.Models.WorkflowExpertiseList();
                    workflowExpertiseListViewModel.MasterCompanyId = 1;
                    actionobject.WorkflowId = workflowExpertiseListViewModel.WorkflowId;
                    actionobject.TaskId = workflowExpertiseListViewModel.ActionId;
                    actionobject.ExpertiseTypeId = workflowExpertiseListViewModel.ExpertiseTypeId;
                    actionobject.EstimatedHours = workflowExpertiseListViewModel.EstimatedHours;
                    actionobject.LaborDirectRate = workflowExpertiseListViewModel.LaborDirectRate;
                    actionobject.DirectLaborRate = workflowExpertiseListViewModel.DirectLaborRate;
                    actionobject.OverheadBurden = workflowExpertiseListViewModel.OverheadBurden;
                    actionobject.OverheadCost = workflowExpertiseListViewModel.OverheadCost;
                    actionobject.LaborOverheadCost = workflowExpertiseListViewModel.LaborOverheadCost;
                    actionobject.MasterCompanyId = 1;
                    actionobject.IsActive = true;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = "admin";
                    actionobject.UpdatedBy = "admin";
                    _context.WorkflowExpertiseList.Add(actionobject);
                    _unitOfWork.SaveChanges();
                    return Ok(actionobject);

                }
            }
            return Ok(ModelState);
        }

        #endregion Public Members


    }
}
