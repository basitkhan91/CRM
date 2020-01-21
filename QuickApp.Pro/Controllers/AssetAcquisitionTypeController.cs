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
    [Route("api/assetacquisition")]
    public class AssetAcquisitionTypeController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetAcquisitionTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetAcquisitionTypeSPModel).GetProperties();
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
            dynamicGridData.ColumnData = unitOfWork.Repository<AssetAcquisitionType>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AssetAcquisitionTypeId); ;
            return Ok(dynamicGridData);
        }

        [HttpGet("getDeleted")]
        public IActionResult getDeleted()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetAcquisitionTypeSPModel).GetProperties();
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
            dynamicGridData.ColumnData = unitOfWork.Repository<AssetAcquisitionType>().GetAll().Where(x => x.IsDeleted == true).OrderByDescending(x => x.AssetAcquisitionTypeId); ;
            return Ok(dynamicGridData);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetAcquisitionType>().Find(x => x.AssetAcquisitionTypeId == id && x.IsDeleted != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetAcquisitionType asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.IsActive = asset.IsActive;
                    asset.CreatedDate = DateTime.Now;
                    asset.UpdatedDate = DateTime.Now;
                    asset.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetAcquisitionType>().Add(asset);
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
        public IActionResult updateAsset([FromBody]AssetAcquisitionType asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetAcquisitionType>().Update(asset);
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
            var assetauditcount = unitOfWork.Repository<AssetAcquisitionTypeAudit>().Find(x => x.AssetAcquisitionTypeId == id).Count();
            var assetaudit = unitOfWork.Repository<AssetAcquisitionTypeAudit>().Find(x => x.AssetAcquisitionTypeId == id).FirstOrDefault();
            var asset = unitOfWork.Repository<AssetAcquisitionType>().Find(x => x.AssetAcquisitionTypeId == id).FirstOrDefault();
            if (asset != null)
            {
                if (assetaudit != null)
                {
                    if (assetauditcount > 1)
                    {
                        asset.UpdatedDate = DateTime.Now;
                        asset.IsDeleted = true;
                        unitOfWork.Repository<AssetAcquisitionType>().Update(asset);
                        unitOfWork.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        assetaudit.IsDelete = true;
                        unitOfWork.AssetAcquisitionTypeAudit.Remove(assetaudit);
                        unitOfWork.SaveChanges();

                        asset.IsDeleted = true;
                        unitOfWork.AssetAcquisitionType.Remove(asset);
                        unitOfWork.SaveChanges();
                        return Ok();
                    }
                }
                else
                {
                    asset.IsDeleted = true;
                    unitOfWork.AssetAcquisitionType.Remove(asset);
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
        public IActionResult UpdateActive(long id, [FromBody] AssetAcquisitionType asset)
        {
            if (ModelState.IsValid)
            {
                if (asset != null)
                {
                    var existingResult = unitOfWork.Repository<AssetAcquisitionType>().Find(x => x.AssetAcquisitionTypeId == id).FirstOrDefault();
                    asset.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = asset.IsActive;
                    unitOfWork.Repository<AssetAcquisitionType>().Update(asset);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id) {
            var audits = unitOfWork.Repository<AssetAcquisitionTypeAudit>()
                .Find(x => x.AssetAcquisitionTypeId == id)
                .OrderByDescending(x => x.AssetAcquisitionTypeAuditId);

            var auditResult = new List<AuditResult<AssetAcquisitionTypeAudit>>();

            auditResult.Add(new AuditResult<AssetAcquisitionTypeAudit> { AreaName="Asset Acquistion Type", Result = audits.ToList() });
            
            return Ok(auditResult);
        }

        [HttpGet("AssetAcquisitionTypeauditdetails/{AssetAcquisitionTypeId}")]
        [Produces(typeof(List<AssetAcquisitionTypeAudit>))]
        public IActionResult GetAuditHostoryById(long AssetAcquisitionTypeId)
        {
            try
            {
                var result = unitOfWork.AssetAcquisitionType.GetAssetAcquisitionTypeAuditDetails(AssetAcquisitionTypeId);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("UploadAssetAcquisitionTypeCustomData")]
        public IActionResult UploadAssetAcquisitionTypeCustomData()
        {

            unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("AssetAcquisitionType"), Request.Form.Files[0]);
            return Ok();
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }

    
}