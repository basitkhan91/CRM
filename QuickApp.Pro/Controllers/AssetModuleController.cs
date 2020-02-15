using DAL;
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
        [HttpGet("GetWarrantyStatus")]
        public IActionResult GetWarrantyStatus()
        {
            var assets = _unitOfWork.Asset.GetAssetWarrantyStatus();
            return Ok(assets);
        }
        

        [HttpGet("GetAsset/{id}")]
        public IActionResult GetAsset(string id)
        {
            var result = _unitOfWork.Asset.GetAsset(id); //GetAllAssetCapes Information
            return Ok(result);

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
                MasterParts masterpart = new MasterParts();
                masterpart.PartNumber = asset.Name;
                masterpart.Description = asset.Description;
                masterpart.ManufacturerId = asset.ManufacturerId;
                masterpart.MasterCompanyId = 1;
                masterpart.CreatedDate = DateTime.Now;
                masterpart.UpdatedDate = DateTime.Now;
                masterpart.IsDeleted = false;
                masterpart.IsActive = true;
                _context.MasterParts.Add(masterpart);
                _context.SaveChanges();

                asset.IsActive = true;
                asset.MasterPartId = masterpart.MasterPartId;
                //asset.AssetRecordId = 0;
                asset.CreatedDate = DateTime.Now;
                asset.UpdatedDate = DateTime.Now;
                asset.MasterCompanyId = 1;
                asset.IsDelete = false;
                _context.Asset.Add(asset);
                _context.SaveChanges();
            }
            return Ok(asset);
        }



        [HttpPut("updateAsset")]
        public IActionResult updateAsset([FromBody] Asset asset)
        {
            if (asset != null)
            {
                asset.MasterCompanyId = 1;
                asset.UpdatedDate = DateTime.Now;
                if (asset.AssetAcquisitionTypeId == null)
                    asset.AssetAcquisitionTypeId = 1;
                _unitOfWork.Repository<Asset>().Update(asset);
                _unitOfWork.SaveChanges();

                var masterpart = _unitOfWork.Repository<MasterParts>().Find(x => x.MasterPartId == asset.MasterPartId).FirstOrDefault();
                if (masterpart != null)
                {
                    masterpart.PartNumber = asset.Name;
                    masterpart.Description = asset.Description;
                    masterpart.ManufacturerId = asset.ManufacturerId;
                    masterpart.MasterCompanyId = 1;
                    masterpart.UpdatedDate = DateTime.Now;
                    _unitOfWork.Repository<MasterParts>().Update(masterpart);
                    _unitOfWork.SaveChanges();
                }
                return Ok(asset);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("removeById/{id}")]

        public IActionResult removeAssetById(long id)
        {
            var assetauditcount = _unitOfWork.Repository<AssetAudit>().Find(x => x.AssetRecordId == id).Count();
            var assetaudit = _unitOfWork.Repository<AssetAudit>().Find(x => x.AssetRecordId == id).FirstOrDefault();
            var asset = _unitOfWork.Repository<Asset>().Find(x => x.AssetRecordId == id).FirstOrDefault();
            if (asset != null)
            {
                if (assetaudit != null)
                {
                    if (assetauditcount > 1)
                    {
                        asset.MasterCompanyId = 1;
                        asset.IsDelete = true;
                        asset.UpdatedDate = DateTime.Now;
                        _unitOfWork.Repository<Asset>().Update(asset);
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        asset.IsDelete = true;
                        _unitOfWork.Asset.Remove(asset);
                        _unitOfWork.SaveChanges();
                    }
                }
                else
                {
                    asset.IsDelete = true;
                    _unitOfWork.Asset.Remove(asset);
                    _unitOfWork.SaveChanges();
                }
                return Ok(id);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("removeCapesById/{id}")]

        public IActionResult removeAssetCapesById(long id)
        {
            var assetcapesauditcount = _unitOfWork.Repository<AssetCapesAudit>().Find(x => x.AssetCapesId == id).Count();
            var assetcapesaudit = _unitOfWork.Repository<AssetCapesAudit>().Find(x => x.AssetCapesId == id).FirstOrDefault();
            var assetcapes = _unitOfWork.Repository<AssetCapes>().Find(x => x.AssetCapesId == id).FirstOrDefault();
            if (assetcapes != null)
            {
                if (assetcapesaudit != null)
                {
                    if (assetcapesauditcount > 1)
                    {
                        assetcapes.MasterCompanyId = 1;
                        assetcapes.IsDelete = true;
                        assetcapes.UpdatedDate = DateTime.Now;
                        _unitOfWork.Repository<AssetCapes>().Update(assetcapes);
                        _unitOfWork.SaveChanges();
                    }
                    else
                    {
                        assetcapes.IsDelete = true;
                        _unitOfWork.AssetCapes.Remove(assetcapes);
                        _unitOfWork.SaveChanges();
                    }
                }
                else
                {
                        assetcapes.MasterCompanyId = 1;
                        assetcapes.IsDelete = true;
                        assetcapes.UpdatedDate = DateTime.Now;
                        _unitOfWork.Repository<AssetCapes>().Update(assetcapes);
                        _unitOfWork.SaveChanges();
                }
                return Ok(id);
            }
            else
            {
                return BadRequest();
            }
        }

        //capes Saving//
        [HttpPost("Mancapespost")]
        public IActionResult addCapes([FromBody] List<AssetCapes> capabilities)
        {
            if (ModelState.IsValid)
            {
                for (var i = 0; i < capabilities.Count(); i++)
                {
                    _unitOfWork.Repository<AssetCapes>().Add(capabilities[i]);
                    _unitOfWork.SaveChanges();
                    //AssetCapes assetcapes = new AssetCapes();
                    ////capabilities[i].IsActive = true;
                    //if (capabilities[i].ItemMasterId == null)
                    //{
                    //    capabilities[i].ItemMasterId = null;
                    //    assetcapes.ItemMasterId = null;
                    //}
                    //capabilities[i].MasterCompanyId = 1;
                    //assetcapes.MasterCompanyId = 1;
                    //capabilities[i].CreatedDate = DateTime.Now;
                    //assetcapes.CreatedDate = DateTime.Now;
                    //capabilities[i].UpdatedDate = DateTime.Now;
                    //assetcapes.UpdatedDate = DateTime.Now;
                    //if (capabilities[i].CapabilityId > 0)
                    //{
                    //    capabilities[i].UpdatedDate = DateTime.Now;

                    //    _unitOfWork.Repository<Capability>().Update(capabilities[i]);
                    //    _unitOfWork.SaveChanges();

                    //    _unitOfWork.Repository<AssetCapes>().Update(assetcapes);
                    //    _unitOfWork.SaveChanges();
                    //}
                    //else
                    //{
                    //    _unitOfWork.Repository<Capability>().Add(capabilities[i]);
                    //    _unitOfWork.SaveChanges();

                    //    assetcapes.AssetRecordId = capabilities[i].AssetRecordId;
                    //    assetcapes.CapabilityId = (int)capabilities[i].CapabilityTypeId;
                    //    assetcapes.MasterCompanyId = capabilities[i].MasterCompanyId;
                    //    assetcapes.CreatedBy = "1";
                    //    assetcapes.UpdatedBy = "1";
                    //    assetcapes.CreatedDate = DateTime.Today;
                    //    assetcapes.UpdatedDate = DateTime.Today;
                    //    assetcapes.IsActive = capabilities[i].IsActive;
                    //    assetcapes.IsDelete = capabilities[i].IsDelete;
                    //    assetcapes.AircraftTypeId = capabilities[i].AircraftTypeId;
                    //    assetcapes.AircraftModelId = capabilities[i].AircraftModelId;
                    //    assetcapes.AircraftDashNumberId = capabilities[i].AircraftDashNumberId;
                    //    assetcapes.ItemMasterId = capabilities[i].ItemMasterId;
                    //    _unitOfWork.Repository<AssetCapes>().Add(assetcapes);
                    //    _unitOfWork.SaveChanges();
                    //}

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

        [HttpGet("AssetcapabilityGet/{id}")]
        public IActionResult AssetcapabilityGet(long id)
        {
            var capabilityData = _unitOfWork.Asset.getAssetCapabilityData(id); //.GetAllCustomersData();
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
                newAsset.AssetParentId = asset.Asset_Location;
                newAsset.Memo = asset.Memo;
                newAsset.ExpirationDate = asset.ExpirationDate;
                newAsset.ManufacturedDate = asset.ManufacturedDate;
                newAsset.EntryDate = asset.EntryDate;
                newAsset.AssetAcquisitionTypeId = asset.AssetAcquisitionTypeId;
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
            newAssetCapes.IsDelete = false;
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
                    newAssetCapes.IsDelete = capes.IsDelete;
                    newAssetCapes.AircraftTypeId = capes.AircraftTypeId;
                    newAssetCapes.AircraftModelId = capes.AircraftModelId;
                    newAssetCapes.AircraftDashNumberId = capes.AircraftDashNumberId;
                    //newAssetCapes.AircraftType = capes.AircraftType;
                    //newAssetCapes.AircraftModel = capes.AircraftModel;
                    //newAssetCapes.AircraftDashNumber = capes.AircraftDashNumber;
                    _unitOfWork.Repository<AssetCapes>().Update(newAssetCapes);
                    _unitOfWork.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateCapes")]
        public IActionResult updatecapes([FromBody] AssetCapes assetcapes)
        {
            if (assetcapes != null)
            {
                //var ac = _unitOfWork.AssetCapes.GetSingleOrDefault(c => c.IsActive == assetcapes.IsActive && c.UpdatedDate == DateTime.Now);
                var ac = _unitOfWork.Repository<AssetCapes>().Find(x => x.AssetCapesId == assetcapes.AssetCapesId).FirstOrDefault();
                ac.MasterCompanyId = 1;
                ac.UpdatedDate = DateTime.Now;
                ac.IsActive = assetcapes.IsActive;
                _unitOfWork.Repository<AssetCapes>().Update(ac);
                _unitOfWork.SaveChanges();
                return Ok(ac);
            }
            else
            {
                return BadRequest();
            }
        }
    }

}

