using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using System.Collections.Generic;

namespace QuickApp.Pro.Controllers
{
    [Route("api/AssetModule")]
    public class AssetModuleController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        //private IUnitOfWork UnitOfWork;
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
    }
}
