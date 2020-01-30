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
    [Route("api/assetlocation")]
    public class AssetLocationController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetLocationController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetLocationSPModel).GetProperties();
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
            dynamicGridData.ColumnData = unitOfWork.Repository<AssetLocation>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AssetLocationId); ;
            return Ok(dynamicGridData);
        }

        [HttpGet("getDeleted")]
        public IActionResult getDeleted()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetLocationSPModel).GetProperties();
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
            dynamicGridData.ColumnData = unitOfWork.Repository<AssetLocation>().GetAll().Where(x => x.IsDeleted == true).OrderByDescending(x => x.AssetLocationId); ;
            return Ok(dynamicGridData);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetLocation>().Find(x => x.AssetLocationId == id && x.IsDeleted != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetLocation asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.IsActive = asset.IsActive;
                    asset.CreatedDate = DateTime.Now;
                    asset.UpdatedDate = DateTime.Now;
                    asset.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetLocation>().Add(asset);
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
        public IActionResult updateAsset([FromBody]AssetLocation asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetLocation>().Update(asset);
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
            var assetauditcount = unitOfWork.Repository<AssetLocationAudit>().Find(x => x.AssetLocationId == id).Count();
            var assetaudit = unitOfWork.Repository<AssetLocationAudit>().Find(x => x.AssetLocationId == id).FirstOrDefault();
            var asset = unitOfWork.Repository<AssetLocation>().Find(x => x.AssetLocationId == id).FirstOrDefault();
            if (asset != null)
            {
                if(assetaudit != null) {
                    if (assetauditcount > 1)
                    {
                        asset.UpdatedDate = DateTime.Now;
                        asset.IsDeleted = true;
                        unitOfWork.Repository<AssetLocation>().Update(asset);
                        unitOfWork.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        assetaudit.IsDeleted = true;
                        unitOfWork.AssetLocationAudit.Remove(assetaudit);
                        unitOfWork.SaveChanges();

                        asset.IsDeleted = true;
                        unitOfWork.AssetLocation.Remove(asset);
                        unitOfWork.SaveChanges();
                        return Ok();
                    }
                }
                else
                {
                    asset.IsDeleted = true;
                    unitOfWork.AssetLocation.Remove(asset);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
                
                
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateActive/{id}")]
        public IActionResult UpdateActive(long id, [FromBody] AssetLocation asset)
        {
            if (ModelState.IsValid)
            {
                if (asset != null)
                {
                    var existingResult = unitOfWork.Repository<AssetLocation>().Find(x => x.AssetLocationId == id).FirstOrDefault();
                    asset.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = asset.IsActive;
                    unitOfWork.Repository<AssetLocation>().Update(asset);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id) {
            var audits = unitOfWork.Repository<AssetLocationAudit>()
                .Find(x => x.AssetLocationId == id)
                .OrderByDescending(x => x.AssetLocationAuditId);

            var auditResult = new List<AuditResult<AssetLocationAudit>>();

            auditResult.Add(new AuditResult<AssetLocationAudit> { AreaName="Asset Location", Result = audits.ToList() });
            
            return Ok(auditResult);
        }

        [HttpGet("AssetLocationauditdetails/{AssetLocationId}")]
        [Produces(typeof(List<AssetLocationAudit>))]
        public IActionResult GetAuditHostoryById(long AssetLocationId)
        {
            try
            {
                var result = unitOfWork.AssetLocation.GetAssetLocationAuditDetails(AssetLocationId);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("UploadAssetLocationCustomData")]
        public IActionResult UploadAssetLocationCustomData()
        {

            unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("AssetLocation"), Request.Form.Files[0]);
            return Ok();
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }

    
}