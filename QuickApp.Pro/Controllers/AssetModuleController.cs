using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
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
                asset.AssetRecordId = 0;
                asset.CreatedDate = DateTime.Now;
                asset.UpdatedDate = DateTime.Now;
                asset.MasterCompanyId = 1;
                _context.Asset.Add(asset);
                _context.SaveChanges();
            }
            return Ok(asset);
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
            var asset = _unitOfWork.Repository<Asset>().Find(x => x.AssetRecordId == id).FirstOrDefault();
            if (asset != null)
            {
                asset.IsDelete = true;
                _unitOfWork.Repository<Asset>().Update(asset);
                _unitOfWork.SaveChanges();
                return Ok();
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
                    if (capabilities[i].ItemMasterId == null) {
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
    }
}

