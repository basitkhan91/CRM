using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
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

        [HttpPost("addAsset")]
        public IActionResult addasset([FromBody] Asset asset)
        {
            if (asset != null)
            {
                asset.IsActive = true;
                asset.AssetRecordId = 0;
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
            _unitOfWork.Repository<Asset>().Update(asset);
            _unitOfWork.SaveChanges();
            return Ok();
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
        public IActionResult addCapes([FromBody] List<AssetCapes> assetCapes)
        {
            if (ModelState.IsValid)
            {
                for (var i = 0; i < assetCapes.Count(); i++)
                {
                    assetCapes[i].IsActive = true;
                    assetCapes[i].MasterCompanyId = 1;
                    assetCapes[i].CreatedDate = DateTime.Now;
                    if (assetCapes[i].CapabilityId > 0)
                    {
                        _unitOfWork.Repository<AssetCapes>().Update(assetCapes[i]);
                    }
                    else
                    {
                        _unitOfWork.Repository<AssetCapes>().Add(assetCapes[i]);
                    }
                    _unitOfWork.SaveChanges();
                }
            }
            return Ok();
        }

        [HttpGet("capabilityTypeList")]
        [Produces(typeof(List<CapabilityType>))]

        public IActionResult capabilityTypeList()
        {
            var allActions = _unitOfWork.capabilityTypeRepository.GetAllCapabilityListData(); //.GetAllCustomersData();
            return Ok(allActions);

        }
    }

}
