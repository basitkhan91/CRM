using System;
using System.Collections.Generic;
using System.Reflection;
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
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetStatusSPModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);//FirstCharToUpper(property.Name);
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            dynamicGridData.ColumnData = unitOfWork.Repository<AssetStatus>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AssetStatusId); ;
            return Ok(dynamicGridData);
        }               

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetStatus>().Find(x => x.AssetStatusId == id && x.IsDeleted != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetStatus asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.IsActive = asset.IsActive;
                    asset.CreatedDate = DateTime.Now;
                    asset.UpdatedDate = DateTime.Now;
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
            var asset = unitOfWork.Repository<AssetStatus>().Find(x => x.AssetStatusId == id).FirstOrDefault();
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
                    var existingResult = unitOfWork.Repository<AssetStatus>().Find(x => x.AssetStatusId == id).FirstOrDefault();
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
                .Find(x => x.AssetStatusId == id)
                .OrderByDescending(x => x.AssetStatusAuditId);

            var auditResult = new List<AuditResult<AssetStatusAudit>>();

            auditResult.Add(new AuditResult<AssetStatusAudit> { AreaName="Asset Status", Result = audits.ToList() });
            
            return Ok(auditResult);
        }

        [HttpGet("assetstatusauditdetails/{assetStatusId}")]
        [Produces(typeof(List<AssetStatusAudit>))]
        public IActionResult GetAuditHostoryById(long assetStatusId)
        {
            try
            {
                var result = unitOfWork.AssetStatus.GetAssetStatusAuditDetails(assetStatusId);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("UploadAssetStatusCustomData")]
        public IActionResult UploadAssetStatusCustomData()
        {

            unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("AssetStatus"), Request.Form.Files[0]);
            return Ok();
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }

    
}