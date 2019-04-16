﻿using System;
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

        //For getting the stockline values

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

                throw;
            }
        }

        //for Stockline Adjustment Reason Data

        [HttpGet("GetAdjustmentReason")]
        [Produces(typeof(List<StocklineAdjustmnetReasonViewModel>))]
        public IActionResult GetAdjustmentReason()
        {

            try
            {
                var result = _unitOfWork.stocklineAdjustmentReasonRepository.GetAllAdjustmentReasonData();

                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
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

                throw;
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

                throw;
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

                throw;
            }
        }


        // [HttpGet("AdjustmentGet")]

        //// [Produces(typeof(List<StockLineAdjustmentViewModel>))]
        // public IActionResult getstocklineadjustement()
        // {
        //     var allcustomertype = _context.StockLineAdjustment.
        //     //.getStockLineAdjustmentList()
        //     return Ok(stockLineAdjustmentViewModel);

        // }


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

                throw;
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

                throw;
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

                throw;
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

            var actionobject = _unitOfWork.stocklineAdjustmentReasonRepository.GetSingleOrDefault(a => a.AdjustmentReasonId == id);



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
            var existingResultofstocklineList = _unitOfWork.stocklineAdjustmentReasonRepository.GetSingleOrDefault(c => c.AdjustmentReasonId == id);
            _unitOfWork.stocklineAdjustmentReasonRepository.Remove(existingResultofstocklineList);
            _unitOfWork.SaveChanges();
            //_unitOfWork.stocklineAdjustmentReasonRepository.Remove(existingResult);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }




        

        [HttpPost("PostIntegration")]
        public IActionResult stockLineIntegrationpost([FromBody] StockLineViewModel stockLineViewModel)
        {
            if (ModelState.IsValid)
            {
               
                    DAL.Models.StocklineIntegrationPortal actionobject = new DAL.Models.StocklineIntegrationPortal();
                    //st.StockLineId = 1;
                    stockLineViewModel.MasterCompanyId = 1;
                    actionobject.StocklineId = stockLineViewModel.StockLineId;
                    actionobject.IntegrationPortalId = stockLineViewModel.IntegrationPortalId;
                    actionobject.IsListed = stockLineViewModel.IsListed;
                    //actionobject.IsActive = customerViewModel.IsActive;
                    actionobject.CreatedDate = DateTime.Now;
                    actionobject.UpdatedDate = DateTime.Now;
                    actionobject.CreatedBy = stockLineViewModel.CreatedBy;
                    actionobject.UpdatedBy = stockLineViewModel.UpdatedBy;
                    actionobject.MasterCompanyId = 1;

                    _context.StocklineIntegrationPortal.Add(actionobject);
                    _context.SaveChanges();

                


                //if (stockLineViewModel == null)
                //return BadRequest($"{nameof(stockLineViewModel)} cannot be null");



                //return Ok(ModelState);

                //_context.stocklineAdjustmentReasons.Add(actionobject);
                //_context.SaveChanges();
                //return Ok(actionobject);
            }

            return Ok(ModelState);
        }
    

        //  For saving the values in Db
        [HttpPost("stockLinepost1")]
        public IActionResult CreateAction([FromBody] StockLineViewModel stockLineViewModel)
        {
            if (ModelState.IsValid)
            {
                if (stockLineViewModel == null)
                    return BadRequest($"{nameof(stockLineViewModel)} cannot be null");
                DAL.Models.StockLine actionobject1 = new DAL.Models.StockLine();

                stockLineViewModel.MasterCompanyId = 1;

                actionobject1.ManagementStructureEntityId = stockLineViewModel.ManagementStructureEntityId;
                actionobject1.MasterCompanyId = 1;
                //actionobject.IsSerialized = true;
                actionobject1.ItemMasterId = stockLineViewModel.ItemMasterId;
                actionobject1.PurchaseOrderId = stockLineViewModel.PurchaseOrderId;
                actionobject1.RepairOrderId = stockLineViewModel.RepairOrderId;
                actionobject1.SiteId = stockLineViewModel.SiteId;
                actionobject1.ShelfId = stockLineViewModel.ShelfId;
                actionobject1.BinId = stockLineViewModel.BinId;
                actionobject1.WarehouseId = stockLineViewModel.WarehouseId;
                actionobject1.LocationId = stockLineViewModel.LocationId;
                actionobject1.QuantityToReceive = stockLineViewModel.QuantityToReceive;
                if (stockLineViewModel.SiteId == 0)
                {
                    actionobject1.SiteId = null;
                }


                if (stockLineViewModel.WarehouseId == 0)
                {
                    actionobject1.WarehouseId = null;
                }


                if (stockLineViewModel.LocationId == 0)
                {
                    actionobject1.LocationId = null;
                }


                if (stockLineViewModel.ShelfId == 0)
                {
                    actionobject1.ShelfId = null;
                }

                if (stockLineViewModel.BinId == 0)
                {
                    actionobject1.BinId = null;
                }

                actionobject1.PartNumber = stockLineViewModel.PartNumber;

                if (stockLineViewModel.PartNumber == null)
                {
                    actionobject1.PartNumber = "null";
                }

                actionobject1.ConditionId = stockLineViewModel.ConditionId;
                actionobject1.StockLineNumber = stockLineViewModel.StockLineNumber;
                actionobject1.StocklineMatchKey = stockLineViewModel.StocklineMatchKey;
                actionobject1.ControlNumber = stockLineViewModel.ControlNumber;
                actionobject1.Quantity = stockLineViewModel.Quantity;
                actionobject1.SerialNumber = stockLineViewModel.SerialNumber;
                actionobject1.ShelfLife = stockLineViewModel.ShelfLife;
                actionobject1.ShelfLifeExpirationDate = stockLineViewModel.ShelfLifeExpirationDate;
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
                //actionobject.MasterCompanyId = stockLineViewModel.MasterCompanyId;
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
                actionobject1.TimeLifeCyclesId = stockLineViewModel.TimeLifeCyclesId;
                if (stockLineViewModel.TimeLifeCyclesId == 0)
                {
                    actionobject1.TimeLifeCyclesId = null;
                }

                actionobject1.CompanyId = 1;
                actionobject1.BusinessUnitId = 1;
                actionobject1.DivisionId = 1;
                actionobject1.DepartmentId = 1;

                //actionobject1.CompanyId = stockLineViewModel.CompanyId;
                //actionobject1.BusinessUnitId = stockLineViewModel.BusinessUnitId;
                //actionobject1.DivisionId = stockLineViewModel.DivisionId;
                //actionobject1.DepartmentId = stockLineViewModel.DepartmentId;

                //if (stockLineViewModel.CompanyId == 0)
                //{
                //    actionobject1.CompanyId = null;
                //}

                //if (stockLineViewModel.BusinessUnitId == 0)
                //{
                //    actionobject1.BusinessUnitId = null;
                //}

                //if (stockLineViewModel.DivisionId == 0)
                //{
                //    actionobject1.DivisionId = null;
                //}

                //if (stockLineViewModel.DepartmentId == 0)
                //{
                //    actionobject1.DepartmentId = null;
                //}

                actionobject1.Site = stockLineViewModel.Site;
                actionobject1.Shelf = stockLineViewModel.Shelf;
                actionobject1.Bin = stockLineViewModel.Bin;
                actionobject1.TimeLife = stockLineViewModel.TimeLife;
                actionobject1.ObtainFromType = stockLineViewModel.ObtainFromType;
                actionobject1.OwnerType = stockLineViewModel.OwnerType;
                actionobject1.TraceableToType = stockLineViewModel.TraceableToType;
                actionobject1.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
                actionobject1.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;


                _context.StockLine.Add(actionobject1);
                _context.SaveChanges();

                if (actionobject1.StockLineId != 0)
                {
                    var exists = _context.StockLine.Where(a => a.StockLineId == actionobject1.StockLineId).SingleOrDefault();
                    exists.StockLineNumber = "STL-" + actionobject1.StockLineId;
                    exists.ControlNumber = "CNT-" + actionobject1.StockLineId;
                    exists.IdNumber = "Id-"+actionobject1.StockLineId;
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

            var actionobject = _unitOfWork.stockLineList.GetSingleOrDefault(a => a.StockLineId == id);
            //var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == customerViewModel.Addressid);

            stockLineViewModel.MasterCompanyId = 1;
            //actionobject.IsSerialized = true;
            
            actionobject.SiteId = stockLineViewModel.SiteId;
            actionobject.ShelfId = stockLineViewModel.ShelfId;
            actionobject.BinId = stockLineViewModel.BinId;
            actionobject.WarehouseId = stockLineViewModel.WarehouseId;
            actionobject.LocationId = stockLineViewModel.LocationId;
            actionobject.QuantityToReceive = stockLineViewModel.QuantityToReceive;
            if (stockLineViewModel.SiteId == 0)
            {
                actionobject.SiteId = null;
            }


            if (stockLineViewModel.WarehouseId == 0)
            {
                actionobject.WarehouseId = null;
            }


            if (stockLineViewModel.LocationId == 0)
            {
                actionobject.LocationId = null;
            }


            if (stockLineViewModel.ShelfId == 0)
            {
                actionobject.ShelfId = null;
            }

            if (stockLineViewModel.BinId == 0)
            {
                actionobject.BinId = null;
            }
           
            
            actionobject.PartNumber = stockLineViewModel.PartNumber;
            actionobject.StockLineNumber = stockLineViewModel.StockLineNumber;
            actionobject.StocklineMatchKey = stockLineViewModel.StocklineMatchKey;
            actionobject.ControlNumber = stockLineViewModel.ControlNumber;
            actionobject.Quantity = stockLineViewModel.Quantity;
            actionobject.SerialNumber = stockLineViewModel.SerialNumber;
            actionobject.ShelfLife = stockLineViewModel.ShelfLife;
            actionobject.ShelfLifeExpirationDate = stockLineViewModel.ShelfLifeExpirationDate;
            actionobject.ObtainFrom = stockLineViewModel.ObtainFrom;
            actionobject.Owner = stockLineViewModel.Owner;
            actionobject.ConditionId = stockLineViewModel.ConditionId;
            actionobject.TraceableTo = stockLineViewModel.TraceableTo;
            actionobject.ManufacturerId = stockLineViewModel.ManufacturerId;
            actionobject.Manufacturer = stockLineViewModel.Manufacturer;
            actionobject.ManufacturerLotNumber = stockLineViewModel.ManufacturerLotNumber;
            actionobject.ManufacturingDate = stockLineViewModel.ManufacturingDate;
            actionobject.ManufacturingBatchNumber = stockLineViewModel.ManufacturingBatchNumber;
            actionobject.PartCertificationNumber = stockLineViewModel.PartCertificationNumber;
            actionobject.CertifiedBy = stockLineViewModel.CertifiedBy;
            actionobject.CertifiedDate = stockLineViewModel.CertifiedDate;
            actionobject.TagDate = stockLineViewModel.TagDate;
            actionobject.TagType = stockLineViewModel.TagType;
            actionobject.CertifiedDueDate = stockLineViewModel.CertifiedDueDate;
            actionobject.CalibrationMemo = stockLineViewModel.CalibrationMemo;
            actionobject.OrderDate = stockLineViewModel.OrderDate;
            actionobject.PurchaseOrderId = stockLineViewModel.PurchaseOrderId;
            actionobject.PurchaseOrderUnitCost = stockLineViewModel.PurchaseOrderUnitCost;
            actionobject.InventoryUnitCost = stockLineViewModel.InventoryUnitCost;
            //actionobject.MasterCompanyId = stockLineViewModel.MasterCompanyId;
            actionobject.RepairOrderId = stockLineViewModel.RepairOrderId;
            actionobject.RepairOrderUnitCost = stockLineViewModel.RepairOrderUnitCost;
            actionobject.ReceivedDate = stockLineViewModel.ReceivedDate;
            actionobject.ReceiverNumber = stockLineViewModel.ReceiverNumber;
            actionobject.ReconciliationNumber = stockLineViewModel.ReconciliationNumber;
            actionobject.UnitSalesPrice = stockLineViewModel.UnitSalesPrice;
            actionobject.CoreUnitCost = stockLineViewModel.CoreUnitCost;
            actionobject.GLAccountId = stockLineViewModel.GLAccountId;
            actionobject.AssetId = stockLineViewModel.AssetId;
            actionobject.IsHazardousMaterial = stockLineViewModel.IsHazardousMaterial;
            actionobject.IsPMA = stockLineViewModel.IsPMA;
            actionobject.IsDER = stockLineViewModel.IsDER;
            actionobject.OEM = stockLineViewModel.OEM;
            actionobject.Memo = stockLineViewModel.Memo;
            actionobject.ManagementStructureEntityId = stockLineViewModel.ManagementStructureEntityId;
            //actionobject.CompanyId = stockLineViewModel.CompanyId;
            //actionobject.BusinessUnitId = stockLineViewModel.BusinessUnitId;
            //actionobject.DivisionId = stockLineViewModel.DivisionId;
            //actionobject.DepartmentId = stockLineViewModel.DepartmentId;
            actionobject.Site = stockLineViewModel.Site;
            actionobject.Shelf = stockLineViewModel.Shelf;
            actionobject.Bin = stockLineViewModel.Bin;
            actionobject.TimeLife = stockLineViewModel.TimeLife;
            actionobject.TimeLifeCyclesId = stockLineViewModel.TimeLifeCyclesId;
            actionobject.ObtainFromType = stockLineViewModel.ObtainFromType;
            actionobject.OwnerType = stockLineViewModel.OwnerType;
            actionobject.TraceableToType = stockLineViewModel.TraceableToType;
            actionobject.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
            actionobject.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;
            //actionobject.IsActive = customerViewModel.IsActive;
            actionobject.CreatedDate = DateTime.Now;
            actionobject.UpdatedDate = DateTime.Now;
            actionobject.CreatedBy = stockLineViewModel.CreatedBy;
            actionobject.UpdatedBy = stockLineViewModel.UpdatedBy;
            actionobject.IdNumber = stockLineViewModel.IdNumber;
            //_unitOfWork.SaveChanges();




            //if (stockLineViewModel.PurchaseOrderId == null)
            //{
            //    actionobject.PurchaseOrderId = null;
            //}
            //if (stockLineViewModel.RepairOrderId == null)
            //{
            //    actionobject.RepairOrderId = null;
            //}

            //if (stockLineViewModel.BusinessUnitId == null)
            //{
            //    actionobject.BusinessUnitId = null;
            //}
            //if (stockLineViewModel.DepartmentId == null)
            //{
            //    actionobject.DepartmentId = null;

            //}
            //if (stockLineViewModel.DivisionId == null)
            //{
            //    actionobject.DivisionId = null;
            //}
            _context.StockLine.Update(actionobject);
            _context.SaveChanges();

            return Ok(ModelState);
        }

        //If Id exists update StockLine update to List if Data Exist with Id in Adjustment Table
        [HttpPut("stockLineAdjustmentToListpostIfExist/{id}")]
        public IActionResult UpdateStocklineAdjustmentIfExist(long id, [FromBody] StockLAdjustmentViewModel stockLineViewModel)
        {
            
            var actionobject = _unitOfWork.stocklineAdjustmentRepository.GetSingleOrDefault(a => a.StockLineId == id && a.StocklineAdjustmentDataTypeId == stockLineViewModel.AdjustmentDataTypeId) ;



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

                var actionobject = _unitOfWork.stockLineList.GetSingleOrDefault(a => a.StockLineId == id);

                //var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == customerViewModel.Addressid);

                //stockLineViewModel.MasterCompanyId = 1;
                //actionobject.IsSerialized = true;

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



                //if (stockLineViewModel.SiteId != 0)
                //{

                //}
                //else
                //{
                //    actionobject.SiteId = null;
                //}

                //if (stockLineViewModel.WarehouseId != 0)
                //{
                //    actionobject.WarehouseId = stockLineViewModel.WarehouseId;
                //}
                //else
                //{
                //    actionobject.WarehouseId = null;
                //}
                //if (stockLineViewModel.LocationId != 0)
                //{
                //    actionobject.LocationId = stockLineViewModel.LocationId;
                //}
                //else
                //{
                //    actionobject.LocationId = null;
                //}
                //if (stockLineViewModel.ShelfId != 0)
                //{
                //    actionobject.ShelfId = stockLineViewModel.ShelfId;
                //}
                //else
                //{
                //    actionobject.ShelfId = null;
                //}
                //if (stockLineViewModel.BinId != 0)
                //{
                //    actionobject.BinId = stockLineViewModel.BinId;
                //}
                //else
                //{
                //    actionobject.BinId = null;
                //}
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
                if (stockLineViewModel.CoreUnitCost != 0)
                {
                    actionobject.CoreUnitCost = stockLineViewModel.CoreUnitCost;
                }
                if (stockLineViewModel.UnitSalesPrice != 0)
                {
                    actionobject.UnitSalesPrice = stockLineViewModel.UnitSalesPrice;
                }
                if (stockLineViewModel.ManagementStructureEntityId != 0)
                {
                    actionobject.ManagementStructureEntityId = stockLineViewModel.ManagementStructureEntityId;
                }
                if (stockLineViewModel.UnitCostAdjustmentReasonTypeId != 0)
                {
                    actionobject.UnitCostAdjustmentReasonTypeId = stockLineViewModel.UnitCostAdjustmentReasonTypeId;
                }
                if (stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId != 0)
                {
                    actionobject.UnitSalePriceAdjustmentReasonTypeId = stockLineViewModel.UnitSalePriceAdjustmentReasonTypeId;
                }

                if(stockLineViewModel.isSerialized == false)
                {
                    actionobject.SerialNumber = null;
                }
                //if (stockLineViewModel.DiscountSalesPrice != 0)
                //{
                //    actionobject. = stockLineViewModel.DiscountSalesPrice;
                //}
                //if (stockLineViewModel.LotCostAdjustment != 0)
                //{
                //    actionobject.ManufacturerLotNumber = stockLineViewModel.LotCostAdjustment;
                //}
                //if (stockLineViewModel.RevalueStockCost != 0)
                //{
                //    actionobject. = stockLineViewModel.RevalueStockCost;
                //}

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
            actionobject.MasterCompanyId = managementStructureEntityViewModel.MasterCompanyId;
            actionobject.UnitSalesPrice = managementStructureEntityViewModel.UnitSalesPrice;
            //actionobject.CompanyId = managementStructureEntityViewModel.CompanyId;
            //actionobject.BusinessUnitId = managementStructureEntityViewModel.BusinessUnitId;
            //actionobject.DivisionId = managementStructureEntityViewModel.DivisionId;
            //actionobject.DepartmentId = managementStructureEntityViewModel.DepartmentId;
            actionobject.Site = managementStructureEntityViewModel.Site;
            actionobject.Shelf = managementStructureEntityViewModel.Shelf;
            actionobject.Bin = managementStructureEntityViewModel.Bin;
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



        [HttpPost("PostTimeLine")]
        public IActionResult Timesaveadjustment([FromBody] TimeLifeViewModel timeLifeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (timeLifeViewModel == null)
                    return BadRequest($"{nameof(timeLifeViewModel)} cannot be null");
                DAL.Models.TimeLife actionobject = new DAL.Models.TimeLife();
               
                timeLifeViewModel.MasterCompanyId = 1;
                

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
                //actionobject.CreatedBy = timeLifeViewModel.CreatedBy;
                //actionobject.UpdatedBy = timeLifeViewModel.UpdatedBy;



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
            //var address = _unitOfWork.Address.GetSingleOrDefault(a => a.AddressId == customerViewModel.Addressid);

            actionobject.PartNumber = itemMasterViewModel.PartNumber;
            actionobject.PartDescription = itemMasterViewModel.Partdescription;
            
            //if (itemMasterViewModel.PartId != null)
            //{
            //    actionobject.PartId = itemMasterViewModel.PartId;
            //}

            

            
           
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

                throw;
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

    }


   


}