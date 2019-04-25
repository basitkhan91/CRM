using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/AssetStatus")]
    public class AssetStatusController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetStatusController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var assets = unitOfWork.Repository<AssetStatus>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.Id);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id && x.IsDeleted != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetStatus asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.IsActive = true;
                    asset.CreatedDate = DateTime.Now;
                    asset.UpdatedDate =null;
                    asset.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetStatus>().Add(asset);
                    unitOfWork.SaveChanges();
                    return Ok(asset);
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
        public IActionResult updateAsset([FromBody]AssetStatus asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetStatus>().Update(asset);
                    unitOfWork.SaveChanges();
                    return Ok(asset);
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
            var asset = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id).FirstOrDefault();
            if (asset != null)
            {
                asset.UpdatedDate = DateTime.Now;
                asset.IsDeleted = true;
                unitOfWork.Repository<AssetStatus>().Update(asset);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateActive/{id}")]
        public IActionResult UpdateActive(long id, [FromBody] AssetStatus asset)
        {
            if (ModelState.IsValid)
            {
                if (asset != null)
                {
                    var existingResult = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id).FirstOrDefault();
                    asset.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = asset.IsActive;
                    unitOfWork.Repository<AssetStatus>().Update(asset);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id) {
            var audits = unitOfWork.Repository<AssetStatusAudit>()
                .Find(x => x.Id == id)
                .OrderByDescending(x => x.AssetStatusAuditId);

            var auditResult = new List<AuditResult<AssetStatusAudit>>();

            auditResult.Add(new AuditResult<AssetStatusAudit> { AreaName="Asset Status", Result = audits.ToList() });
            
            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }

    
}