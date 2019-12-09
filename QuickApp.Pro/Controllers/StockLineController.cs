using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class StockLineController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;

        public StockLineController(IUnitOfWork unitOfWork, ILogger<CustomerController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;

        }

        [HttpPost("List")]
        public IActionResult GetList([FromBody] Filters<StockLineListFilters> stockLineFilters)
        {
            var result = _unitOfWork.stockLineList.GetList(stockLineFilters);
            return Ok(result);
        }

        [HttpGet("ListGlobalSearch")]
        public IActionResult GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {
            var result = _unitOfWork.stockLineList.GetListGlobalFilter(value, pageNumber, pageSize);
            return Ok(result);
        }

        //For getting the stockline values

        [HttpPost("Get")]
        public IActionResult Get([FromBody] Filters<StockListFilters> stocklistFilters)
        {

            try
            {
                var result = _unitOfWork.stockLineList.GetAllStockLinelistData(stocklistFilters);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Get")]
        [Produces(typeof(List<StockLineViewModel>))]
        public IActionResult Get()
        {

            try
            {
                var result = _unitOfWork.stockLineList.GetAllStockLinelistData();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAdjustmentReason")]
        [Produces(typeof(List<StocklineAdjustmnetReasonViewModel>))]
        public IActionResult GetAdjustmentReason(long adjustmentReasonId)
        {

            try
            {
                var result = _unitOfWork.StocklineAdjustmentReasonRepository.GetAllAdjustmentReasonData(adjustmentReasonId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpGet("GetCompanyData")]
        [Produces(typeof(List<StockLineViewModel>))]
        public IActionResult GetCompanyData()
        {
            try
            {
                var result = _unitOfWork.stockLineList.GetAllCompanyData();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetBinByShelfIdAdjustmentBeforeChange/{id}")]
        [Produces(typeof(List<BinViewModel>))]
        public IActionResult GetBinByShelfIdAdjustmentBeforeChange(long id)
        {

            try
            {
                var result = _unitOfWork.stockLineList.GetBinByShelfIdAdjustmentBeforeChange(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("StocklineGetById/{id}")]
        [Produces(typeof(List<BinViewModel>))]
        public IActionResult GetStocklineDataById(long id)
        {

            try
            {
                var result = _unitOfWork.stockLineList.getStocklineDataById(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //For getting the stocklineAdjustment Data
        [HttpGet("AdjustmentGet/{id}")]
        [Produces(typeof(List<StockLAdjustmentViewModel>))]
        public IActionResult Getstocklineadjustement(long id)
        {
            try
            {
                var result = _unitOfWork.stockLineList.GetAllStockLineAdjustmentlistData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("IntegrationPortalGet/{id}")]
        [Produces(typeof(List<StocklineIntegrationPortalViewModel>))]
        public IActionResult GetIntegrationPortal(long id)
        {
            try
            {
                var result = _unitOfWork.stockLineList.GetAllStockLineIntegrationPortalData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("timeLifeGetById/{id}")]
        [Produces(typeof(List<TimeLifeViewModel>))]
        public IActionResult GetTimeLife(long id)
        {
            try
            {
                var result = _unitOfWork.stockLineList.GetAllTimeLifeData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("stockLineAdjustmentReasonpost")]
        public IActionResult stockLineAdjustmentReasonpost([FromBody] StocklineAdjustmnetReasonViewModel stocklineAdjustmnetReasonViewModel)
        {
            if (ModelState.IsValid)
            {
                if (stocklineAdjustmnetReasonViewModel == null)
                    return BadRequest($"{nameof(stocklineAdjustmnetReasonViewModel)} cannot be null");
                DAL.Models.StocklineAdjustmentReason actionobject = new DAL.Models.StocklineAdjustmentReason();
                //st.StockLineId = 1;
                stocklineAdjustmnetReasonViewModel.MasterCompanyId = 1;
                actionobject.Description = stocklineAdjustmnetReasonViewModel.Description;
                actionobject.IsActive = stocklineAdjustmnetReasonViewModel.IsActive;
                //actionobject.IsActive = customerViewModel.IsActive;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = stocklineAdjustmnetReasonViewModel.CreatedBy;
                actionobject.UpdatedBy = stocklineAdjustmnetReasonViewModel.UpdatedBy;
                actionobject.MasterCompanyId = 1;
                _context.stocklineAdjustmentReason.Add(actionobject);
                _context.SaveChanges();

                return Ok(ModelState);

                //_context.stocklineAdjustmentReasons.Add(actionobject);
                //_context.SaveChanges();
                //return Ok(actionobject);
            }

            return Ok(ModelState);
        }


        [HttpPut("stockLineAdjustmentReasonPut/{id}")]
        public IActionResult stockLineAdjustmentReasonPut(long id, [FromBody] StocklineAdjustmnetReasonViewModel stocklineAdjustmnetReasonViewModel)
        {

            var actionobject = _unitOfWork.StocklineAdjustmentReasonRepository.GetSingleOrDefault(a => a.AdjustmentReasonId == id);



            stocklineAdjustmnetReasonViewModel.MasterCompanyId = 1;

            actionobject.AdjustmentReasonId = stocklineAdjustmnetReasonViewModel.AdjustmentReasonId;
            actionobject.Description = stocklineAdjustmnetReasonViewModel.Description;
            actionobject.IsActive = stocklineAdjustmnetReasonViewModel.IsActive;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            _context.stocklineAdjustmentReason.Update(actionobject);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        [HttpDelete("stockLineAdjustmentReasonDelete/{id}")]
        [Produces(typeof(StocklineAdjustmnetReasonViewModel))]
        public IActionResult stockLineAdjustmentReasonDelete(long id)
        {
            // var existingResult = _unitOfWork.stocklineAdjustmentReasonRepository.GetSingleOrDefault(c => c.AdjustmentReasonId == id);
            var existingResultofstocklineList = _unitOfWork.StocklineAdjustmentReasonRepository.GetSingleOrDefault(c => c.AdjustmentReasonId == id);
            _unitOfWork.StocklineAdjustmentReasonRepository.Remove(existingResultofstocklineList);
            _unitOfWork.SaveChanges();
            //_unitOfWork.stocklineAdjustmentReasonRepository.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpPost("stockLineIntegration")]
        public IActionResult stockLineIntegration([FromBody] StockLineViewModel stockLineViewModel)
        {
            if (stockLineViewModel == null)
                return BadRequest($"{nameof(stockLineViewModel)} cannot be null");
            if (ModelState.IsValid)
            {
                StocklineIntegrationPortal actionobject = new StocklineIntegrationPortal();
                actionobject.MasterCompanyId = 1;
                actionobject.StocklineId = stockLineViewModel.StockLineId;
                actionobject.IntegrationPortalId = stockLineViewModel.IntegrationPortalId;
                actionobject.IsListed = stockLineViewModel.IsListed;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = stockLineViewModel.CreatedBy;
                actionobject.UpdatedBy = stockLineViewModel.UpdatedBy;

                _context.StocklineIntegrationPortal.Add(actionobject);
                _context.SaveChanges();

                // _context.stocklineAdjustmentReasons.Add(actionobject);
            }
            return Ok(ModelState);
        }
        //  For saving the values in Db
        [HttpPost("stockLine")]
        public IActionResult stockLine([FromBody] StockLineViewModel stockLineViewModel)
        {
            if (ModelState.IsValid)
            {
                if (stockLineViewModel == null) return BadRequest($"{nameof(stockLineViewModel)} cannot be null");

                var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == stockLineViewModel.ManagementStructureId).SingleOrDefault();
                StockLine actionobject1 = new StockLine();

                actionobject1.PartNumber = stockLineViewModel.PartNumber;
                actionobject1.StockLineNumber = stockLineViewModel.StockLineNumber;
                actionobject1.StocklineMatchKey = stockLineViewModel.StocklineMatchKey;
                actionobject1.ControlNumber = stockLineViewModel.ControlNumber;
                actionobject1.ItemMasterId = stockLineViewModel.ItemMasterId;
                actionobject1.Quantity = stockLineViewModel.Quantity;
                actionobject1.QuantityOnOrder = stockLineViewModel.QuantityOnOrder;
                actionobject1.QuantityAvailable = stockLineViewModel.QuantityAvailable;
                actionobject1.QuantityOnHand = stockLineViewModel.QuantityOnHand;
                actionobject1.QuantityIssued = stockLineViewModel.QuantityAvailable;
                actionobject1.QuantityTurnIn = stockLineViewModel.QuantityTurnIn;
                actionobject1.QuantityReserved = stockLineViewModel.QuantityReserved;
                actionobject1.ConditionId = stockLineViewModel.ConditionId;
                actionobject1.SerialNumber = stockLineViewModel.SerialNumber;
                actionobject1.ShelfLife = stockLineViewModel.ShelfLife;
                actionobject1.BlackListed = stockLineViewModel.BlackListed.HasValue ? stockLineViewModel.BlackListed.Value : false;
                actionobject1.BlackListedReason = stockLineViewModel.BlackListedReason;
                actionobject1.Incident = stockLineViewModel.Incident.HasValue ? stockLineViewModel.Incident.Value : false;
                actionobject1.IncidentReason = stockLineViewModel.IncidentReason;
                actionobject1.Accident = stockLineViewModel.Accident.HasValue ? stockLineViewModel.Accident.Value : false;
                actionobject1.AccidentReason = stockLineViewModel.AccidentReason;
                actionobject1.ShelfLifeExpirationDate = stockLineViewModel.ShelfLifeExpirationDate;
                actionobject1.WarehouseId = stockLineViewModel.WarehouseId;
                actionobject1.LocationId = stockLineViewModel.LocationId;
                actionobject1.ObtainFrom = stockLineViewModel.ObtainFrom;
                actionobject1.Owner = stockLineViewModel.Owner;
                actionobject1.TraceableTo = stockLineViewModel.TraceableTo;
                actionobject1.ManufacturerId = stockLineViewModel.ManufacturerId;
                actionobject1.Manufacturer = stockLineViewModel.Manufacturer;
                actionobject1.ManufacturerLotNumber = stockLineViewModel.ManufacturerLotNumber;
                actionobject1.ManufacturingDate = stockLineViewModel.ManufacturingDate;
                actionobject1.ManufacturingBatchNumber = stockLineViewModel.ManufacturingBatchNumber;
                actionobject1.PartCertificationNumber = stockLineViewModel.PartCertificationNumber;
                actionobject1.CertifiedBy = stockLineViewModel.CertifiedBy;
                actionobject1.CertifiedDate = stockLineViewModel.CertifiedDate;
                actionobject1.TagDate = stockLineViewModel.TagDate;
                actionobject1.TagType = stockLineViewModel.TagType;
                actionobject1.CertifiedDueDate = stockLineViewModel.CertifiedDueDate;
                actionobject1.CalibrationMemo = stockLineViewModel.CalibrationMemo;
                actionobject1.OrderDate = stockLineViewModel.OrderDate;
                actionobject1.PurchaseOrderId = stockLineViewModel.PurchaseOrderId;
                actionobject1.PurchaseOrderUnitCost = stockLineViewModel.PurchaseOrderUnitCost;
                actionobject1.InventoryUnitCost = stockLineViewModel.InventoryUnitCost;
                actionobject1.RepairOrderId = stockLineViewModel.RepairOrderId;
                actionobject1.RepairOrderUnitCost = stockLineViewModel.RepairOrderUnitCost;
                actionobject1.ReceivedDate = stockLineViewModel.ReceivedDate;
                actionobject1.ReceiverNumber = stockLineViewModel.ReceiverNumber;
                actionobject1.ReconciliationNumber = stockLineViewModel.ReconciliationNumber;
                actionobject1.UnitSalesPrice = stockLineViewModel.UnitSalesPrice;
                actionobject1.CoreUnitCost = stockLineViewModel.CoreUnitCost;
                actionobject1.GLAccountId = stockLineViewModel.GLAccountId;
                actionobject1.AssetId = stockLineViewModel.AssetId;
                actionobject1.IsHazardousMaterial = stockLineViewModel.IsHazardousMaterial;
                actionobject1.IsPMA = stockLineViewModel.IsPMA;
                actionobject1.IsDER = stockLineViewModel.IsDER;
                actionobject1.OEM = stockLineViewModel.OEM;
                actionobject1.Memo = stockLineViewModel.Memo;
                actionobject1.ManagementStructureEntityId = stockLineViewModel.ManagementStructureId;
                actionobject1.TimeLifeCyclesId = stockLineViewModel.TimeLifeCyclesId == 0 ? null : stockLineViewModel.TimeLifeCyclesId;
                actionobject1.MasterCompanyId = 1;
                actionobject1.IsSerialized = stockLineViewModel.isSerialized;
                actionobject1.ShelfId = stockLineViewModel.ShelfId == 0 ? null : stockLineViewModel.ShelfId;
                actionobject1.BinId = stockLineViewModel.BinId == 0 ? null : stockLineViewModel.BinId;
                actionobject1.SiteId = stockLineViewModel.SiteId == 0 ? null : stockLineViewModel.SiteId;
                //actionobject1.LegalEntityId = stockLineViewModel.LegalEntityId == 0 ? null : stockLineViewModel.LegalEntityId;
                if (entityobject != null && entityobject.LegalEntityId != null)
                {
                    actionobject1.LegalEntityId = entityobject.LegalEntityId;
                }
                actionobject1.ObtainFromType = stockLineViewModel.ObtainFromType;
                actionobject1.OwnerType = stockLineViewModel.OwnerType;
                actionobject1.TraceableToType = stockLineViewModel.TraceableToType;
                actionobject1.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
                actionobject1.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;
                actionobject1.IdNumber = stockLineViewModel.IdNumber;
                actionobject1.QuantityToReceive = stockLineViewModel.QuantityToReceive;
                actionobject1.PurchaseOrderExtendedCost = stockLineViewModel.PurchaseOrderExtendedCost;
                actionobject1.ManufacturingTrace = stockLineViewModel.ManufacturingTrace;
                actionobject1.ExpirationDate = stockLineViewModel.ExpirationDate;
                actionobject1.AircraftTailNumber = stockLineViewModel.AircraftTailNumber;
                actionobject1.ShippingViaId = stockLineViewModel.ShippingViaId;
                actionobject1.EngineSerialNumber = stockLineViewModel.EngineSerialNumber;
                actionobject1.QuantityRejected = stockLineViewModel.QuantityRejected;
                actionobject1.PurchaseOrderPartRecordId = stockLineViewModel.PurchaseOrderPartRecordId;
                actionobject1.ShippingAccount = stockLineViewModel.ShippingAccount;
                actionobject1.ShippingReference = stockLineViewModel.ShippingReference;
                actionobject1.TimeLifeDetailsNotProvided = stockLineViewModel.TimeLifeDetailsNotProvided;

                _context.StockLine.Add(actionobject1);
                _context.SaveChanges();

                if (actionobject1.StockLineId != 0)
                {
                    var exists = _context.StockLine.Where(a => a.StockLineId == actionobject1.StockLineId).SingleOrDefault();
                    exists.StockLineNumber = "STL-" + actionobject1.StockLineId;
                    exists.ControlNumber = "CNT-" + actionobject1.StockLineId;
                    exists.IdNumber = "Id-" + actionobject1.StockLineId;
                    _context.StockLine.Update(exists);
                    _context.SaveChanges();
                }

                return Ok(actionobject1);
            }

            return Ok(ModelState);
        }

        // If Id exists update into the Db
        [HttpPut("stockLinepost/{id}")]
        public IActionResult UpdateStockline(long id, [FromBody] StockLineViewModel stockLineViewModel)
        {
            var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == stockLineViewModel.ManagementStructureId).SingleOrDefault();
            var actionobject1 = _unitOfWork.stockLineList.GetSingleOrDefault(a => a.StockLineId == id);
            actionobject1.PartNumber = stockLineViewModel.PartNumber;
            actionobject1.StockLineNumber = stockLineViewModel.StockLineNumber;
            actionobject1.StocklineMatchKey = stockLineViewModel.StocklineMatchKey;
            actionobject1.ControlNumber = stockLineViewModel.ControlNumber;
            actionobject1.ItemMasterId = stockLineViewModel.ItemMasterId;
            actionobject1.BlackListed = stockLineViewModel.BlackListed.HasValue ? stockLineViewModel.BlackListed.Value : false;
            actionobject1.BlackListedReason = stockLineViewModel.BlackListedReason;
            actionobject1.Incident = stockLineViewModel.Incident.HasValue ? stockLineViewModel.Incident.Value : false;
            actionobject1.IncidentReason = stockLineViewModel.IncidentReason;
            actionobject1.Accident = stockLineViewModel.Accident.HasValue ? stockLineViewModel.Accident.Value : false;
            actionobject1.AccidentReason = stockLineViewModel.AccidentReason;
            actionobject1.Quantity = stockLineViewModel.Quantity;
            actionobject1.QuantityOnOrder = stockLineViewModel.QuantityOnOrder;
            actionobject1.QuantityAvailable = stockLineViewModel.QuantityAvailable;
            actionobject1.QuantityOnHand = stockLineViewModel.QuantityOnHand;
            actionobject1.QuantityIssued = stockLineViewModel.QuantityAvailable;
            actionobject1.QuantityTurnIn = stockLineViewModel.QuantityTurnIn;
            actionobject1.QuantityReserved = stockLineViewModel.QuantityReserved;
            actionobject1.ConditionId = stockLineViewModel.ConditionId;
            actionobject1.SerialNumber = stockLineViewModel.SerialNumber;
            actionobject1.ShelfLife = stockLineViewModel.ShelfLife;
            actionobject1.ShelfLifeExpirationDate = stockLineViewModel.ShelfLifeExpirationDate;
            actionobject1.WarehouseId = stockLineViewModel.WarehouseId;
            actionobject1.LocationId = stockLineViewModel.LocationId;
            actionobject1.ObtainFrom = stockLineViewModel.ObtainFrom;
            actionobject1.Owner = stockLineViewModel.Owner;
            actionobject1.TraceableTo = stockLineViewModel.TraceableTo;
            actionobject1.ManufacturerId = stockLineViewModel.ManufacturerId;
            actionobject1.Manufacturer = stockLineViewModel.Manufacturer;
            actionobject1.ManufacturerLotNumber = stockLineViewModel.ManufacturerLotNumber;
            actionobject1.ManufacturingDate = stockLineViewModel.ManufacturingDate;
            actionobject1.ManufacturingBatchNumber = stockLineViewModel.ManufacturingBatchNumber;
            actionobject1.PartCertificationNumber = stockLineViewModel.PartCertificationNumber;
            actionobject1.CertifiedBy = stockLineViewModel.CertifiedBy;
            actionobject1.CertifiedDate = stockLineViewModel.CertifiedDate;
            actionobject1.TagDate = stockLineViewModel.TagDate;
            actionobject1.TagType = stockLineViewModel.TagType;
            actionobject1.CertifiedDueDate = stockLineViewModel.CertifiedDueDate;
            actionobject1.CalibrationMemo = stockLineViewModel.CalibrationMemo;
            actionobject1.OrderDate = stockLineViewModel.OrderDate;
            actionobject1.PurchaseOrderId = stockLineViewModel.PurchaseOrderId;
            actionobject1.PurchaseOrderUnitCost = stockLineViewModel.PurchaseOrderUnitCost;
            actionobject1.InventoryUnitCost = stockLineViewModel.InventoryUnitCost;
            actionobject1.RepairOrderId = stockLineViewModel.RepairOrderId;
            actionobject1.RepairOrderUnitCost = stockLineViewModel.RepairOrderUnitCost;
            actionobject1.ReceivedDate = stockLineViewModel.ReceivedDate;
            actionobject1.ReceiverNumber = stockLineViewModel.ReceiverNumber;
            actionobject1.ReconciliationNumber = stockLineViewModel.ReconciliationNumber;
            actionobject1.UnitSalesPrice = stockLineViewModel.UnitSalesPrice;
            actionobject1.CoreUnitCost = stockLineViewModel.CoreUnitCost;
            actionobject1.GLAccountId = stockLineViewModel.GLAccountId;
            actionobject1.AssetId = stockLineViewModel.AssetId;
            actionobject1.IsHazardousMaterial = stockLineViewModel.IsHazardousMaterial;
            actionobject1.IsPMA = stockLineViewModel.IsPMA;
            actionobject1.IsDER = stockLineViewModel.IsDER;
            actionobject1.OEM = stockLineViewModel.OEM;
            actionobject1.Memo = stockLineViewModel.Memo;
            actionobject1.ManagementStructureEntityId = stockLineViewModel.ManagementStructureId;
            actionobject1.TimeLifeCyclesId = stockLineViewModel.TimeLifeCyclesId == 0 ? null : stockLineViewModel.TimeLifeCyclesId;
            actionobject1.MasterCompanyId = 1;
            actionobject1.IsSerialized = stockLineViewModel.isSerialized;
            actionobject1.ShelfId = stockLineViewModel.ShelfId == 0 ? null : stockLineViewModel.ShelfId;
            actionobject1.BinId = stockLineViewModel.BinId == 0 ? null : stockLineViewModel.BinId;
            actionobject1.SiteId = stockLineViewModel.SiteId == 0 ? null : stockLineViewModel.SiteId;
            if (entityobject != null && entityobject.LegalEntityId != null)
            {
                actionobject1.LegalEntityId = entityobject.LegalEntityId;
            }
            //actionobject1.LegalEntityId = stockLineViewModel.LegalEntityId == 0 ? null : stockLineViewModel.LegalEntityId;
            actionobject1.ObtainFromType = stockLineViewModel.ObtainFromType;
            actionobject1.OwnerType = stockLineViewModel.OwnerType;
            actionobject1.TraceableToType = stockLineViewModel.TraceableToType;
            actionobject1.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
            actionobject1.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;
            actionobject1.IdNumber = stockLineViewModel.IdNumber;
            actionobject1.QuantityToReceive = stockLineViewModel.QuantityToReceive;
            actionobject1.PurchaseOrderExtendedCost = stockLineViewModel.PurchaseOrderExtendedCost;
            actionobject1.ManufacturingTrace = stockLineViewModel.ManufacturingTrace;
            actionobject1.ExpirationDate = stockLineViewModel.ExpirationDate;
            actionobject1.AircraftTailNumber = stockLineViewModel.AircraftTailNumber;
            actionobject1.ShippingViaId = stockLineViewModel.ShippingViaId;
            actionobject1.EngineSerialNumber = stockLineViewModel.EngineSerialNumber;
            actionobject1.QuantityRejected = stockLineViewModel.QuantityRejected;
            actionobject1.PurchaseOrderPartRecordId = stockLineViewModel.PurchaseOrderPartRecordId;
            actionobject1.ShippingAccount = stockLineViewModel.ShippingAccount;
            actionobject1.ShippingReference = stockLineViewModel.ShippingReference;
            actionobject1.TimeLifeDetailsNotProvided = stockLineViewModel.TimeLifeDetailsNotProvided;
            actionobject1.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
            actionobject1.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;
            actionobject1.CreatedDate = DateTime.Now;
            actionobject1.UpdatedDate = DateTime.Now;
            _context.StockLine.Update(actionobject1);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        //If Id exists update StockLine update to List if Data Exist with Id in Adjustment Table
        [HttpPut("stockLineAdjustmentToListpostIfExist/{id}")]
        public IActionResult UpdateStocklineAdjustmentIfExist(long id, [FromBody] StockLAdjustmentViewModel stockLineViewModel)
        {

            var actionobject = _unitOfWork.stocklineAdjustmentRepository.GetSingleOrDefault(a => a.StockLineId == id && a.StocklineAdjustmentDataTypeId == stockLineViewModel.AdjustmentDataTypeId);



            stockLineViewModel.MasterCompanyId = 1;

            actionobject.StocklineAdjustmentDataTypeId = stockLineViewModel.AdjustmentDataTypeId;
            actionobject.ChangedFrom = stockLineViewModel.BeforeSite;
            actionobject.ChangedTo = stockLineViewModel.AfterSite;
            actionobject.AdjustmentMemo = stockLineViewModel.AdjustmentMemo;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            _context.StocklineAdjustment.Update(actionobject);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        //If Id exists update Time Life 
        [HttpPut("timeLifeUpdate/{id}")]
        public IActionResult UpdateTimeLifeIfExist(long id, [FromBody] TimeLifeViewModel timeLifeViewModel)
        {
            var actionobject = _unitOfWork.timeLife.GetSingleOrDefault(a => a.TimeLifeCyclesId == id);
            timeLifeViewModel.MasterCompanyId = 1;
            actionobject.TimeRemaining = timeLifeViewModel.TimeRemaining;
            actionobject.TimeSinceInspection = timeLifeViewModel.TimeSinceInspection;
            actionobject.TimeSinceNew = timeLifeViewModel.TimeSinceNew;
            actionobject.TimeSinceOVH = timeLifeViewModel.TimeSinceOVH;
            actionobject.TimeSinceRepair = timeLifeViewModel.TimeSinceRepair;

            actionobject.LastSinceInspection = timeLifeViewModel.LastSinceInspection;
            actionobject.LastSinceNew = timeLifeViewModel.LastSinceNew;
            actionobject.LastSinceOVH = timeLifeViewModel.LastSinceOVH;

            actionobject.CyclesRemaining = timeLifeViewModel.CyclesRemaining;
            actionobject.CyclesSinceInspection = timeLifeViewModel.CyclesSinceInspection;
            actionobject.CyclesSinceNew = timeLifeViewModel.CyclesSinceNew;
            actionobject.CyclesSinceOVH = timeLifeViewModel.CyclesSinceOVH;
            actionobject.CyclesSinceRepair = timeLifeViewModel.CyclesSinceRepair;
            actionobject.TimeLifeCyclesId = timeLifeViewModel.TimeLifeCyclesId;

            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            _context.TimeLife.Update(actionobject);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        //If Id exists update into the Db Adjustment to List Update
        [HttpPut("stockLineAdjustmentToListpost/{id}")]
        public IActionResult UpdateStockline(long id, [FromBody] StockLineAdjustmentEditListViewModel stockLineViewModel)
        {
            if (stockLineViewModel != null)
            {
                var entityobject = _context.ManagementStructure.Where(a => a.ManagementStructureId == stockLineViewModel.ManagementStructureId).SingleOrDefault();
                var actionobject = _unitOfWork.stockLineList.GetSingleOrDefault(a => a.StockLineId == id);

                if (stockLineViewModel.sitetryChange == true)
                {
                    actionobject.SiteId = stockLineViewModel.SiteId;
                    actionobject.WarehouseId = null;
                    actionobject.LocationId = null;
                    actionobject.ShelfId = null;
                    actionobject.BinId = null;
                }

                if (stockLineViewModel.warehousetryChange == true)
                {
                    actionobject.WarehouseId = stockLineViewModel.WarehouseId;
                    actionobject.LocationId = null;
                    actionobject.ShelfId = null;
                    actionobject.BinId = null;
                }

                if (stockLineViewModel.locationtryChange == true)
                {
                    actionobject.LocationId = stockLineViewModel.LocationId;
                    actionobject.ShelfId = null;
                    actionobject.BinId = null;
                }
                if (stockLineViewModel.shelftryChange == true)
                {
                    actionobject.ShelfId = stockLineViewModel.ShelfId;
                    actionobject.BinId = null;
                }
                if (stockLineViewModel.bintryChnage == true)
                {
                    actionobject.BinId = stockLineViewModel.BinId;
                }

                if (stockLineViewModel.PartNumber != null)
                {
                    actionobject.PartNumber = stockLineViewModel.PartNumber;
                }
                if (stockLineViewModel.SerialNumber != null)
                {
                    actionobject.SerialNumber = stockLineViewModel.SerialNumber;
                }
                if (stockLineViewModel.Quantity != 0)
                {
                    actionobject.Quantity = stockLineViewModel.Quantity;
                }
                if (stockLineViewModel.isQunatity == true && stockLineViewModel.Quantity == 0)
                {
                    actionobject.Quantity = 0;
                }
                actionobject.QuantityOnOrder = stockLineViewModel.QuantityOnOrder;
                actionobject.QuantityAvailable = stockLineViewModel.QuantityAvailable;
                actionobject.QuantityOnHand = stockLineViewModel.QuantityOnHand;
                actionobject.QuantityIssued = stockLineViewModel.QuantityAvailable;
                actionobject.QuantityTurnIn = stockLineViewModel.QuantityTurnIn;
                actionobject.QuantityReserved = stockLineViewModel.QuantityReserved;
                if (stockLineViewModel.CoreUnitCost != 0)
                {
                    actionobject.CoreUnitCost = stockLineViewModel.CoreUnitCost;
                }
                if (stockLineViewModel.UnitSalesPrice != 0)
                {
                    actionobject.UnitSalesPrice = stockLineViewModel.UnitSalesPrice;
                }
                if (stockLineViewModel.ManagementStructureId != 0)
                {
                    actionobject.ManagementStructureEntityId = stockLineViewModel.ManagementStructureId;
                }
                if (stockLineViewModel.UnitCostAdjustmentReasonTypeId != 0)
                {
                    actionobject.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
                }
                if (stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId != 0)
                {
                    actionobject.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;
                }

                if (stockLineViewModel.isSerialized == false)
                {
                    actionobject.SerialNumber = null;
                }
                actionobject.BlackListed = stockLineViewModel.BlackListed;
                actionobject.BlackListedReason = stockLineViewModel.BlackListedReason;
                actionobject.Incident = stockLineViewModel.Incident;
                actionobject.IncidentReason = stockLineViewModel.IncidentReason;
                actionobject.Accident = stockLineViewModel.Accident;
                actionobject.AccidentReason = stockLineViewModel.AccidentReason;
                actionobject.QuantityOnHand = stockLineViewModel.QuantityOnHand;
                actionobject.QuantityAvailable = stockLineViewModel.QuantityAvailable;
                actionobject.QuantityIssued = stockLineViewModel.QuantityIssued;
                actionobject.QuantityReserved = stockLineViewModel.QuantityReserved;

                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                _context.StockLine.Update(actionobject);
                _context.SaveChanges();

                return Ok(ModelState);
            }
            return Ok(ModelState);
        }
        //
        //For saving the values in Db 
        [HttpPost("stockLineAdjustmentpost")]
        public IActionResult CreateAction2([FromBody] StockLAdjustmentViewModel stockLAdjustmentViewModel)
        {
            if (ModelState.IsValid)
            {
                if (stockLAdjustmentViewModel == null)
                    return BadRequest($"{nameof(stockLAdjustmentViewModel)} cannot be null");

                //for Getting StockLine Adjustment Data
                //var collection = _unitOfWork.stocklineAdjustmentRepository.GetSingleOrDefault(a => a.StockLineId == stockLAdjustmentViewModel.StockLineId);

                DAL.Models.StocklineAdjustment actionobject = new DAL.Models.StocklineAdjustment();
                //st.StockLineId = 1;
                stockLAdjustmentViewModel.MasterCompanyId = 1;
                //actionobject.IsSerialized = true;

                actionobject.StockLineId = stockLAdjustmentViewModel.StockLineId;
                actionobject.StocklineAdjustmentDataTypeId = stockLAdjustmentViewModel.AdjustmentDataTypeId;

                actionobject.ChangedFrom = stockLAdjustmentViewModel.BeforeSite;
                actionobject.ChangedTo = stockLAdjustmentViewModel.AfterSite;

                actionobject.StockLineId = stockLAdjustmentViewModel.StockLineId;
                actionobject.AdjustmentMemo = stockLAdjustmentViewModel.AdjustmentMemo;
                actionobject.MasterCompanyId = 1;
                actionobject.IsActive = true;


                _context.StocklineAdjustment.Add(actionobject);
                _context.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }
        //
        //For Id exists updating the stockline adjustment and Add New 
        [HttpPut("stockLineAdjustmentpost/{id}")]
        public IActionResult updateStockLineAdjustment(long id, [FromBody] ManagementStructureViewModel managementStructureEntityViewModel)
        {

            var actionobject = _unitOfWork.stockLineList.GetSingleOrDefault(a => a.StockLineId == id);
            //var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == customerViewModel.Addressid);

            managementStructureEntityViewModel.MasterCompanyId = 1;
            //actionobject.IsSerialized = true;
            actionobject.PartNumber = managementStructureEntityViewModel.PartNumber;
            actionobject.SerialNumber = managementStructureEntityViewModel.SerialNumber;
            //actionobject.ConditionId = managementStructureEntityViewModel.ConditionId;
            //actionobject.WarehouseId = managementStructureEntityViewModel.WarehouseId;
            //actionobject.LocationId = managementStructureEntityViewModel.LocationId;
            actionobject.InventoryUnitCost = managementStructureEntityViewModel.InventoryUnitCost;
            actionobject.MasterCompanyId = 1;
            actionobject.UnitSalesPrice = managementStructureEntityViewModel.UnitSalesPrice;
            //actionobject.CompanyId = managementStructureEntityViewModel.CompanyId;
            //actionobject.BusinessUnitId = managementStructureEntityViewModel.BusinessUnitId;
            //actionobject.DivisionId = managementStructureEntityViewModel.DivisionId;
            //actionobject.DepartmentId = managementStructureEntityViewModel.DepartmentId;
            //actionobject.Site = managementStructureEntityViewModel.Site;
            //actionobject.Shelf = managementStructureEntityViewModel.Shelf;
            //actionobject.Bin = managementStructureEntityViewModel.Bin;
            //actionobject.TimeLife = managementStructureEntityViewModel.TimeLife;
            //actionobject.TimeLifeId = managementStructureEntityViewModel.TimeLifeId;
            //actionobject.IsActive = customerViewModel.IsActive;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            actionobject.CreatedBy = managementStructureEntityViewModel.CreatedBy;
            actionobject.UpdatedBy = managementStructureEntityViewModel.UpdatedBy;
            //_unitOfWork.SaveChanges();
            if (managementStructureEntityViewModel.MasterCompanyId == null)
            {
                actionobject.MasterCompanyId = null;
            }
            _context.StockLine.Update(actionobject);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        [HttpDelete("stockLineList/{id}")]
        [Produces(typeof(StockLineViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.stockLineList.GetSingleOrDefault(c => c.StockLineId == id);
            var existingResultofstocklineList = _unitOfWork.stockLineList.GetSingleOrDefault(c => c.StockLineId == id);
            _unitOfWork.stockLineList.Remove(existingResultofstocklineList);
            _unitOfWork.SaveChanges();
            _unitOfWork.stockLineList.Remove(existingResult);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpPost("stockLineTimeLifeAdjustment")]
        public IActionResult stockLineTimeLifeAdjustment([FromBody] TimeLifeViewModel timeLifeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (timeLifeViewModel == null)
                    return BadRequest($"{nameof(timeLifeViewModel)} cannot be null");

                TimeLife actionobject = new TimeLife();
                actionobject.MasterCompanyId = 1;
                actionobject.StockLineId = 0;

                actionobject.CyclesSinceNew = timeLifeViewModel.CyclesSinceNew;
                actionobject.CyclesSinceOVH = timeLifeViewModel.CyclesSinceOVH;
                actionobject.CyclesSinceRepair = timeLifeViewModel.CyclesSinceRepair;
                actionobject.CyclesSinceInspection = timeLifeViewModel.CyclesSinceInspection;

                actionobject.TimeSinceNew = timeLifeViewModel.TimeSinceNew;
                actionobject.TimeSinceOVH = timeLifeViewModel.TimeSinceOVH;
                actionobject.TimeSinceRepair = timeLifeViewModel.TimeSinceRepair;
                actionobject.TimeSinceInspection = timeLifeViewModel.TimeSinceInspection;

                actionobject.LastSinceNew = timeLifeViewModel.LastSinceNew;
                actionobject.LastSinceOVH = timeLifeViewModel.LastSinceOVH;
                actionobject.LastSinceInspection = timeLifeViewModel.LastSinceInspection;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = timeLifeViewModel.CreatedBy;
                actionobject.UpdatedBy = timeLifeViewModel.UpdatedBy;

                _context.TimeLife.Add(actionobject);
                _context.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }

        //If Id exists update into the Db Item Master Part
        [HttpPut("itemMasterPartUpdate/{id}")]
        public IActionResult UpdateItemMaster(long id, [FromBody] ItemMasterViewModel itemMasterViewModel)
        {

            var actionobject = _unitOfWork.itemMaster.GetSingleOrDefault(a => a.ItemMasterId == id);
            actionobject.PartNumber = itemMasterViewModel.PartNumber;
            actionobject.PartDescription = itemMasterViewModel.Partdescription;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            actionobject.CreatedBy = itemMasterViewModel.CreatedBy;
            actionobject.UpdatedBy = itemMasterViewModel.UpdatedBy;

            _context.ItemMaster.Update(actionobject);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        [HttpPost("stockLinePOUnitCostGet")]
        [Produces(typeof(List<StockLAdjustmentViewModel>))]
        public IActionResult stockLinePOUnitCostGet(StockLAdjustmentViewModel sdv)
        {
            try
            {
                var result = (from pop in _context.PurchaseOrderPart

                              join im in _context.ItemMaster on pop.ItemMasterId equals sdv.ItemMasterId

                              join po in _context.PurchaseOrder on sdv.PurchaseOrderId equals po.PurchaseOrderId

                              select new
                              {
                                  pop.UnitCost,

                              }).ToList();


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("PurchaseOrderUnitCost/{POId}")]
        [Produces(typeof(List<PurchaseOrderPart>))]
        public IActionResult PurchaseOrderUnitCost(long POId)
        {
            try
            {
                var result = (from pop in _context.PurchaseOrderPart
                              where pop.PurchaseOrderId== POId
                              select new PurchaseOrderPart
                              {
                                UnitCost=  pop.UnitCost,
                                PurchaseOrderId=pop.PurchaseOrderId
                              }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost("RepairOrderUnitCost/{ROId}")]
        [Produces(typeof(List<RepairOrderPart>))]
        public IActionResult RepairOrderUnitCost(long ROId)
        {
            try
            {
                var result = (from rop in _context.RepairOrderPart
                              where rop.RepairOrderId == ROId
                              select new RepairOrderPart
                              {
                                UnitCost =   rop.UnitCost,
                                RepairOrderId=rop.RepairOrderId
                              }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost("stockLineROUnitCostGet")]
        [Produces(typeof(List<StockLAdjustmentViewModel>))]
        public IActionResult stockLineROUnitCostGet(StockLAdjustmentViewModel sdv)
        {
            try
            {
                var result = (from pop in _context.RepairOrderPart

                              join im in _context.ItemMaster on pop.ItemMasterId equals sdv.ItemMasterId

                              join po in _context.RepairOrder on sdv.RepairOrderId equals po.RepairOrderId

                              select new
                              {
                                  pop.UnitCost,

                              }).ToList();


                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("deleteIntegration/{id}")]
        [Produces(typeof(StockLineViewModel))]
        public IActionResult deleteIntegration(long id)
        {
            var existingResult = _context.StocklineIntegrationPortal.Where(c => c.StocklineId == id).ToList();

            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.StocklineIntegrationPortalRepository.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            return Ok(id);
        }

        [HttpDelete("removeMapperById/{id}")]
        [Produces(typeof(GLAccountNodeShareWithEntityMapper))]
        public IActionResult deleteMapperNode(long id)
        {
            var existingResult = _context.GLAccountNodeShareWithEntityMapper.Where(c => c.GLAccountNodeId == id).ToList();

            for (var i = 0; i < existingResult.Count; i++)
            {
                _unitOfWork.GLAccountNodeShareWithEntityMapper.Remove(existingResult[i]);
                _unitOfWork.SaveChanges();
            }
            return Ok(id);
        }

        [HttpGet("stocklinereoprt")]
        public IActionResult GenerateStockLineReoprt()
        {
            var result = _unitOfWork.stockLineList.GenerateStockLineReoprt();
            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Stock Line Report");
                workSheet.Cells.LoadFromCollection(result, true);
                package.Save();
            }
            stream.Position = 0;
            string excelName = $"StockLineReport-{DateTime.Now.ToString("ddMMMyyyy")}.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
    }
}