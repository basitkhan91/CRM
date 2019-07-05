using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetType")]
    public class AssetTypeSingleScreenController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetTypeSingleScreenController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var assets = unitOfWork.Repository<AssetType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetTypeId);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetType>().Find(x => x.AssetTypeId == id && x.IsDelete != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetType assetType)
        {
            if (assetType != null)
            {
                if (ModelState.IsValid)
                {
                    assetType.CreatedDate = DateTime.Now;
                    assetType.UpdatedDate = DateTime.Now;
                    assetType.IsActive = true;
                    assetType.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetType>().Add(assetType);
                    unitOfWork.SaveChanges();
                    return Ok(assetType);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost("update")]
        public IActionResult updateAsset([FromBody]AssetType assetType)
        {
            if (assetType != null)
            {
                if (ModelState.IsValid)
                {
                    assetType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetType>().Update(assetType);
                    unitOfWork.SaveChanges();
                    return Ok(assetType);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeAssetById(long id)
        {
            var assetType = unitOfWork.Repository<AssetType>().Find(x => x.AssetTypeId == id).FirstOrDefault();
            if (assetType != null)
            {
                assetType.IsDelete = true;
                unitOfWork.Repository<AssetType>().Update(assetType);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<AssetTypeAudit>()
                .Find(x => x.AssetTypeId == id)
                .OrderByDescending(x => x.AssetTypeAuditId);

            var auditResult = new List<AuditResult<AssetTypeAudit>>();

            auditResult.Add(new AuditResult<AssetTypeAudit> { AreaName = "Asset Type", Result = audits.ToList() });

            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}