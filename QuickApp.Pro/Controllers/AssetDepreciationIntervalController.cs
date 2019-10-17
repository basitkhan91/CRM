using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;
namespace QuickApp.Pro.Controllers
{
    [Route("api/AssetDepreciationInterval")]
    public class AssetDepreciationIntervalController : Controller
    {

        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor
        public AssetDepreciationIntervalController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        #endregion Constructor
        #region Public Methods
        [HttpGet("getById/{id}")]
        public IActionResult getdepreciationIntervalById(long id)
        {
            var depreciationInterval = unitOfWork.Repository<AssetDepreciationInterval>().Find(x => x.AssetDepreciationIntervalId == id && x.IsDeleted != true);
            return Ok(depreciationInterval);
        }
        [HttpPost("add")]
        public IActionResult adddepreciationInterval([FromBody]AssetDepreciationInterval assetDepreciationInterval)
        {
            if (assetDepreciationInterval != null)
            {
                if (ModelState.IsValid)
                {
                    assetDepreciationInterval.CreatedDate = DateTime.Now;
                    assetDepreciationInterval.UpdatedDate = DateTime.Now;
                    assetDepreciationInterval.IsActive = assetDepreciationInterval.IsActive;
                    unitOfWork.Repository<AssetDepreciationInterval>().Add(assetDepreciationInterval);
                    unitOfWork.SaveChanges();
                    return Ok(assetDepreciationInterval);
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
        public IActionResult updatedepreciationInterval([FromBody]AssetDepreciationInterval assetDepreciationInterval)
        {
            if (assetDepreciationInterval != null)
            {
                if (ModelState.IsValid)
                {
                    assetDepreciationInterval.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetDepreciationInterval>().Update(assetDepreciationInterval);
                    unitOfWork.SaveChanges();
                    return Ok(assetDepreciationInterval);
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
        [HttpGet("remove/{id}")]
        public IActionResult removedepreciationIntervalById(long id)
        {
            var depreciationInterval = unitOfWork.Repository<AssetDepreciationInterval>().Find(x => x.AssetDepreciationIntervalId == id).FirstOrDefault();
            if (depreciationInterval != null)
            {
                depreciationInterval.IsDeleted = true;
                unitOfWork.Repository<AssetDepreciationInterval>().Update(depreciationInterval);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetDepreciationIntervalModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<AssetDepreciationIntervalSPModel> assetDepreciationIntervals = new List<AssetDepreciationIntervalSPModel>();
            AssetDepreciationIntervalSPModel assetDepreciationInterval = null;
            var assetDepInt = unitOfWork.Repository<AssetDepreciationInterval>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AssetDepreciationIntervalId);
            foreach (var item in assetDepInt)
            {
                assetDepreciationInterval = new AssetDepreciationIntervalSPModel();

                assetDepreciationInterval.Code = item.AssetDepreciationIntervalCode;
                assetDepreciationInterval.Name = item.AssetDepreciationIntervalName;
                assetDepreciationInterval.Memo = item.AssetDepreciationIntervalMemo;
                assetDepreciationInterval.AssetDepreciationIntervalId = item.AssetDepreciationIntervalId;
                assetDepreciationInterval.CreatedDate = item.CreatedDate;
                assetDepreciationInterval.CreatedBy = item.CreatedBy;
                assetDepreciationInterval.UpdatedDate = item.UpdatedDate;
                assetDepreciationInterval.UpdatedBy = item.UpdatedBy;
                assetDepreciationInterval.IsActive = item.IsActive;
                assetDepreciationIntervals.Add(assetDepreciationInterval);
            }
            dynamicGridData.ColumnData = assetDepreciationIntervals;
            return Ok(dynamicGridData);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult GetDepreciationIntervalAuditDetails(long Id)
        {
            var audits = unitOfWork.Repository<AssetDepreciationIntervalAudit>()
                                .Find(x => x.AssetDepreciationIntervalId == Id)
                                .OrderByDescending(x => x.AssetDepreciationIntervalAuditId)
                                .ToList();

            var auditResult = new List<AuditResult<AssetDepreciationIntervalAudit>>();

            auditResult.Add(new AuditResult<AssetDepreciationIntervalAudit>
            {
                AreaName = "Depreciation Interval",
                Memo = "Depreciation Interval",
                Result = audits
            });

            return Ok(auditResult);
        }

        [HttpPost("UploadDepIntervalCustomData")]
        public IActionResult UploadDepIntervalCustomData()
        {

            unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("DepreciationInterval"), Request.Form.Files[0]);
            return Ok();
        }
        #endregion
    }
}