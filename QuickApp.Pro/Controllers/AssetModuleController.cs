﻿using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace QuickApp.Pro.Controllers
{
    [Route("api/AssetModule")]
    public class AssetModuleController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public AssetModuleController(IUnitOfWork unitOfWork, ILogger<AssetModuleController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<Asset>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Asset.getAllAssetList(); //GetAllAsset Information
            return Ok(result);

        }

        [HttpGet("GetAll")]
        public IActionResult GetAllAsset()
        {
            var assets = _unitOfWork.Asset.getAllAsset();
            return Ok(assets);
        }


        [HttpGet("GetCapes/{id}")]
        [Produces(typeof(List<Capability>))]
        public IActionResult GetCapes(long id)
        {
            var result = _unitOfWork.Asset.getCapesList(id); //GetAllAssetCapes Information
            return Ok(result);

        }


        [HttpPost("addAsset")]
        public IActionResult addasset([FromBody] Asset asset)
        {
            if (asset != null)
            {
                asset.IsActive = true;
                //asset.AssetRecordId = 0;
                asset.CreatedDate = DateTime.Now;
                asset.UpdatedDate = DateTime.Now;
                asset.MasterCompanyId = 1;
                asset.IsDelete = false;
                _context.Asset.Add(asset);
                _context.SaveChanges();
                saveAssetAudit(asset);
            }
            return Ok(asset);
        }

        public void saveAssetAudit(Asset asset)
        {
            AssetAudit assetaudit = new AssetAudit();
            assetaudit.AssetRecordId = asset.AssetRecordId;
            assetaudit.AssetId = asset.AssetId;
            assetaudit.AlternateAssetId = asset.AlternateAssetId;
            assetaudit.Name = asset.Name;
            assetaudit.Description = asset.Description;
            assetaudit.ManagementStructureId = asset.ManagementStructureId;
            assetaudit.AssetAcquisitionTypeId = asset.AssetAcquisitionTypeId;
            assetaudit.IsSerialized = asset.IsSerialized;
            assetaudit.AssetTypeId = asset.AssetTypeId;
            assetaudit.ManufacturerId = asset.ManufacturerId;
            assetaudit.Model = asset.Model;
            assetaudit.UnitOfMeasureId = asset.UnitOfMeasureId;
            assetaudit.CurrencyId = asset.CurrencyId;
            assetaudit.AssetTypeId = asset.AssetTypeId;
            assetaudit.Asset_Location = asset.Asset_Location;
            assetaudit.IsDepreciable = asset.IsDepreciable;
            assetaudit.IsIntangible = asset.IsIntangible;
            assetaudit.AssetIntangibleTypeId = asset.AssetIntangibleTypeId;
            assetaudit.ManufacturedDate = asset.ManufacturedDate;
            assetaudit.ExpirationDate = asset.ExpirationDate;
            assetaudit.Memo = asset.Memo;
            assetaudit.AssetParentId = asset.AssetParentId;
            assetaudit.UnitCost = asset.UnitCost;
            assetaudit.MasterCompanyId = 1;
            assetaudit.CreatedDate = DateTime.Now;
            assetaudit.UpdatedDate = DateTime.Now;
            assetaudit.IsActive = true;
            _context.AssetAudit.Add(assetaudit);
            _context.SaveChanges();
        }


        [HttpPut("updateAsset")]
        public IActionResult updateAsset([FromBody] Asset asset)
        {
            asset.MasterCompanyId = 1;
            asset.UpdatedDate = DateTime.Now;
            _unitOfWork.Repository<Asset>().Update(asset);
            _unitOfWork.SaveChanges();
            return Ok(asset);
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeAssetById(long id)
        {
            var assetaudit = _unitOfWork.Repository<AssetAudit>().Find(x => x.AssetRecordId == id).FirstOrDefault();
            if (assetaudit != null)
            {
                assetaudit.IsDelete = true;
                _unitOfWork.AssetAudit.Remove(assetaudit);
                _unitOfWork.SaveChanges();

                var asset = _unitOfWork.Repository<Asset>().Find(x => x.AssetRecordId == id).FirstOrDefault();
                asset.IsDelete = true;
                _unitOfWork.Asset.Remove(asset);
                _unitOfWork.SaveChanges();

                return Ok(id);
                //_unitOfWork.Repository<Asset>().Update(asset);
                //_unitOfWork.SaveChanges();
                //return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        //capes Saving//
        [HttpPost("Mancapespost")]
        public IActionResult addCapes([FromBody] List<Capability> capabilities)
        {
            if (ModelState.IsValid)
            {
                for (var i = 0; i < capabilities.Count(); i++)
                {
                    capabilities[i].IsActive = true;
                    if (capabilities[i].ItemMasterId == null)
                    {
                        capabilities[i].ItemMasterId = null;
                    }
                    capabilities[i].MasterCompanyId = 1;
                    capabilities[i].CreatedDate = DateTime.Now;
                    capabilities[i].UpdatedDate = DateTime.Now;
                    if (capabilities[i].CapabilityId > 0)
                    {
                        capabilities[i].UpdatedDate = DateTime.Now;
                        _unitOfWork.Repository<Capability>().Update(capabilities[i]);
                    }
                    else
                    {
                        _unitOfWork.Repository<Capability>().Add(capabilities[i]);
                    }
                    _unitOfWork.SaveChanges();
                }
            }
            return Ok();
        }

        [HttpGet("capabilityGet/{id}")]
        public IActionResult capabilityGet(long id)
        {
            var capabilityData = _unitOfWork.Asset.getCapabilityData(id); //.GetAllCustomersData();
            return Ok(capabilityData);

        }
        // please check the below code for audit in AssetCreation

        //[HttpGet("audits/{id}")]
        //public IActionResult AuditDetails(long id)
        //{
        //    var audits = _unitOfWork.Repository<AssetAudit>()
        //        .Find(x => x.AssetRecordId == id)
        //        .OrderByDescending(x => x.AssetRecordAuditId);

        //    var auditResult = new List<AuditResult<AssetAudit>>();

        //    auditResult.Add(new AuditResult<AssetAudit> { AreaName = "Asset", Result = audits.ToList() });

        //    return Ok(auditResult);
        //}

        [HttpPost("addNewAsset")]
        public IActionResult addnewasset([FromBody] Asset asset)
        {
            if (asset != null && asset.AssetId != null) //need to check duplicate
            {
                Asset newAsset = new Asset();
                //newAsset.AssetRecordId = asset.AssetRecordId;
                newAsset.AssetId = asset.AssetId;
                newAsset.AlternateAssetId = asset.AlternateAssetId;
                newAsset.Name = asset.Name;
                newAsset.Description = asset.Description;
                newAsset.ManagementStructureId = asset.ManagementStructureId;
                newAsset.AssetAcquisitionTypeId = asset.AssetAcquisitionTypeId;
                newAsset.IsSerialized = asset.IsSerialized;
                newAsset.AssetTypeId = asset.AssetTypeId;
                newAsset.ManufacturerId = asset.ManufacturerId;
                newAsset.Model = asset.Model;
                newAsset.UnitOfMeasureId = asset.UnitOfMeasureId;
                newAsset.CurrencyId = asset.CurrencyId;
                newAsset.AssetTypeId = asset.AssetTypeId;
                newAsset.UnitCost = asset.UnitCost;
                newAsset.Asset_Location = asset.Asset_Location;
                newAsset.IsActive = true;
                newAsset.IsDelete = false;
                newAsset.CreatedBy = asset.CreatedBy;
                newAsset.UpdatedBy = asset.UpdatedBy;
                newAsset.CreatedDate = DateTime.Now;
                newAsset.UpdatedDate = DateTime.Now;
                newAsset.MasterCompanyId = 1;
                _unitOfWork.Repository<Asset>().Add(newAsset);
                _unitOfWork.SaveChanges();
                return Ok(newAsset);
            }
            else
                return Ok("Enter proper data");

        }
        [HttpPost("updateMaintenanceWarranty")]
        public IActionResult updatemaintenancewarranty(MaintenanceWarrantyViewModel maintenanceWarranty)
        {
            if (maintenanceWarranty != null && maintenanceWarranty.AssetRecordId != null)
            {
                Asset asset = _context.Asset.Where(a => a.AssetRecordId == maintenanceWarranty.AssetRecordId).FirstOrDefault();
                asset.AssetIsMaintenanceReqd = maintenanceWarranty.AssetIsMaintenanceReqd;
                asset.AssetMaintenanceIsContract = maintenanceWarranty.AssetMaintenanceIsContract;
                asset.MaintenanceFrequencyDays = maintenanceWarranty.MaintenanceFrequencyDays;
                asset.MaintenanceFrequencyMonths = maintenanceWarranty.MaintenanceFrequencyMonths;
                asset.DefaultVendorId = maintenanceWarranty.DefaultVendorId;
                asset.GLAccountId = maintenanceWarranty.GLAccountId;
                asset.MaintenanceMemo = maintenanceWarranty.MaintenanceMemo;
                asset.IsWarrantyRequired = maintenanceWarranty.IsWarrantyRequired;
                asset.Warranty = maintenanceWarranty.Warranty;
                asset.WarrantyCompany = maintenanceWarranty.WarrantyCompany;
                asset.WarrantyStartDate = maintenanceWarranty.WarrantyStartDate;
                asset.WarrantyEndDate = maintenanceWarranty.WarrantyEndDate;
                asset.WarrantyStatus = maintenanceWarranty.WarrantyStatus;
                asset.UnexpiredTime = maintenanceWarranty.UnexpiredTime;
                asset.UpdatedBy = maintenanceWarranty.UpdatedBy;
                asset.UpdatedDate = DateTime.Now;
                string mFilePath = string.Empty;
                string wFilePath = string.Empty;
                if (maintenanceWarranty.MaintenanceFile != null)
                {
                    mFilePath = Path.Combine(
                     Directory.GetCurrentDirectory(), "wwwroot",
                     maintenanceWarranty.MaintenanceFile.FileName);
                    using (var stream = new FileStream(mFilePath, FileMode.Create))
                    {
                        maintenanceWarranty.MaintenanceFile.CopyTo(stream);
                    }
                }
                if (maintenanceWarranty.WarantyFile != null)
                {
                    wFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", maintenanceWarranty.WarantyFile.FileName);
                    using (var stream = new FileStream(wFilePath, FileMode.Create))
                    {
                        maintenanceWarranty.WarantyFile.CopyTo(stream);
                    }
                }
                asset.AssetMaintenanceContractFile = mFilePath;
                asset.AssetMaintenanceContractFileExt = Path.GetExtension(mFilePath);
                asset.WarrantyFile = wFilePath;
                asset.WarrantyFileExt = Path.GetExtension(wFilePath);

                _unitOfWork.Repository<Asset>().Update(asset);
                _unitOfWork.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("updateCalibration")]
        public IActionResult updatecalibration([FromBody] CalibrationViewModel calibration)
        {
            if (calibration != null)
            {
                Asset asset = _context.Asset.Where(a => a.AssetRecordId == calibration.AssetRecordId).FirstOrDefault();
                asset.CalibrationDefaultVendorId = calibration.CalibrationDefaultVendorId;
                asset.CalibrationFrequencyMonths = calibration.CalibrationFrequencyMonths;
                asset.CalibrationFrequencyDays = calibration.CalibrationFrequencyDays;
                asset.CalibrationDefaultCost = calibration.CalibrationDefaultCost;
                asset.CalibrationGlAccountId = calibration.CalibrationGlAccountId;
                asset.CalibrationMemo = calibration.CalibrationMemo;
                asset.CertificationFrequencyMonths = calibration.CertificationFrequencyMonths;
                asset.CertificationFrequencyDays = calibration.CertificationFrequencyDays;
                asset.CertificationDefaultCost = calibration.CertificationDefaultCost;
                asset.CertificationGlAccountId = calibration.CertificationGlAccountId;
                asset.CertificationDefaultVendorId = calibration.CertificationDefaultVendorId;
                asset.CertificationMemo = calibration.CertificationMemo;
                asset.AssetCalibrationMin = calibration.AssetCalibrationMin;
                asset.AssetCalibrationMinTolerance = calibration.AssetCalibrationMinTolerance;
                asset.AssetCalibratonMax = calibration.AssetCalibratonMax;
                asset.AssetCalibrationMaxTolerance = calibration.AssetCalibrationMaxTolerance;
                asset.AssetCalibrationExpected = calibration.AssetCalibrationExpected;
                asset.AssetCalibrationExpectedTolerance = calibration.AssetCalibrationExpectedTolerance;
                asset.UpdatedBy = calibration.UpdatedBy;
                _unitOfWork.Repository<Asset>().Update(asset);
                _unitOfWork.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("addAssetCapes")]
        public IActionResult addassetcapes([FromBody] AssetCapes assetCapes)
        {
            AssetCapes newAssetCapes = new AssetCapes();
            newAssetCapes.AssetRecordId = assetCapes.AssetRecordId;
            newAssetCapes.CapabilityId = assetCapes.CapabilityId;
            newAssetCapes.MasterCompanyId = assetCapes.MasterCompanyId;

            newAssetCapes.CreatedBy = assetCapes.CreatedBy;
            newAssetCapes.UpdatedBy = assetCapes.UpdatedBy;
            newAssetCapes.CreatedDate = DateTime.Now;
            newAssetCapes.UpdatedDate = DateTime.Now;
            newAssetCapes.IsActive = true;
            newAssetCapes.IsDeleted = false;
            newAssetCapes.AircraftTypeId = assetCapes.AircraftTypeId;
            newAssetCapes.AircraftModelId = assetCapes.AircraftModelId;
            newAssetCapes.AircraftDashNumberId = assetCapes.AircraftDashNumberId;

            _unitOfWork.Repository<AssetCapes>().Add(newAssetCapes);
            _unitOfWork.SaveChanges();
            return Ok();
        }
        [HttpPost("updateAssetCapes")]
        public IActionResult updateassetcapes([FromBody] List<AssetCapes> assetCapes)
        {
            try
            {
                foreach (AssetCapes capes in assetCapes)
                {
                    AssetCapes newAssetCapes = _context.AssetCapes.Where(c => c.AssetCapesId == capes.AssetCapesId).FirstOrDefault();
                    //newAssetCapes.AssetRecordId = capes.AssetRecordId;
                    newAssetCapes.CapabilityId = capes.CapabilityId;
                    newAssetCapes.MasterCompanyId = capes.MasterCompanyId;
                    newAssetCapes.CreatedBy = capes.CreatedBy;
                    newAssetCapes.UpdatedBy = capes.UpdatedBy;
                    newAssetCapes.UpdatedDate = DateTime.Now;
                    newAssetCapes.IsActive = capes.IsActive;
                    newAssetCapes.IsDeleted = capes.IsDeleted;
                    newAssetCapes.AircraftTypeId = capes.AircraftTypeId;
                    newAssetCapes.AircraftModelId = capes.AircraftModelId;
                    newAssetCapes.AircraftDashNumberId = capes.AircraftDashNumberId;
                    newAssetCapes.AircraftType = capes.AircraftType;
                    newAssetCapes.AircraftModel = capes.AircraftModel;
                    newAssetCapes.AircraftDashNumber = capes.AircraftDashNumber;
                    _unitOfWork.Repository<AssetCapes>().Update(newAssetCapes);
                    _unitOfWork.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return Ok("Getting error");
            }
        }
    }
}

