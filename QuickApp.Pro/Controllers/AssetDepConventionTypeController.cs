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

    [Route("api/assetDepConventionType")]
    public class AssetDepConventionTypeController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetDepConventionTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetDepConvensionColModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);//FirstCharToUpper(property.Name);
                // columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<AssetDepConvensionSPModel> assetdepConvensionMethods = new List<AssetDepConvensionSPModel>();
            AssetDepConvensionSPModel assetDepConvension = null;
            var assets = unitOfWork.Repository<AssetDepConvention>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepConventionId);
            foreach (var item in assets)
            {
                assetDepConvension = new AssetDepConvensionSPModel();

                assetDepConvension.Code = item.AssetDepConventionCode;
                assetDepConvension.Name = item.AssetDepConventionName;
                assetDepConvension.Memo = item.AssetDepConventionMemo;
                assetDepConvension.AssetDepConventionId = item.AssetDepConventionId;
                assetDepConvension.CreatedDate = item.CreatedDate;
                assetDepConvension.CreatedBy = item.CreatedBy;
                assetDepConvension.UpdatedDate = item.UpdatedDate;
                assetDepConvension.UpdatedBy = item.UpdatedBy;
                assetDepConvension.IsActive = item.IsActive;
                assetdepConvensionMethods.Add(assetDepConvension);
            }
            dynamicGridData.ColumnData = assetdepConvensionMethods;
            return Ok(dynamicGridData);         
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetDepById(long id)
        {
            var assetDep = unitOfWork.Repository<AssetDepConvention>().Find(x => x.AssetDepConventionId == id && x.IsDelete != true);
            return Ok(assetDep);
        }

        [HttpPost("add")]
        public IActionResult addAssetDep([FromBody]AssetDepConvention assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    assetDep.CreatedDate = DateTime.Now;
                    assetDep.UpdatedDate = DateTime.Now;
                    assetDep.IsActive = assetDep.IsActive;
                    assetDep.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDepConvention>().Add(assetDep);
                    unitOfWork.SaveChanges();
                    return Ok(assetDep);
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
        public IActionResult updateAssetDep([FromBody]AssetDepConvention assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    assetDep.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetDepConvention>().Update(assetDep);
                    unitOfWork.SaveChanges();
                    return Ok(assetDep);
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
        public IActionResult removeAssetDepById(long id)
        {
            var assetDep = unitOfWork.Repository<AssetDepConvention>().Find(x => x.AssetDepConventionId == id).FirstOrDefault();
            if (assetDep != null)
            {
                assetDep.IsDelete = true;
                unitOfWork.Repository<AssetDepConvention>().Update(assetDep);
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
            var audits = unitOfWork.Repository<AssetDepConventionTypeAudit>()
                .Find(x => x.AssetDepConventionTypeId == id)
                .OrderByDescending(x => x.AssetDepConventionTypeAuditId);

            var auditResult = new List<AuditResult<AssetDepConventionTypeAudit>>();

            auditResult.Add(new AuditResult<AssetDepConventionTypeAudit> { AreaName = "Intangible", Result = audits.ToList() });

            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}