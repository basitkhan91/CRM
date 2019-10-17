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

    [Route("api/depreciationMethod")]
    public class AssetDepreciationMethodController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetDepreciationMethodController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getById/{id}")]
        public IActionResult getdepreciationMethodById(long id)
        {
            var depreciationMethod = unitOfWork.Repository<AssetDepreciationMethod>().Find(x => x.AssetDepreciationMethodId == id && x.IsDeleted != true);
            return Ok(depreciationMethod);
        }

        [HttpPost("add")]
        public IActionResult adddepreciationMethod([FromBody]AssetDepreciationMethod depricationMethod)
        {
            if (depricationMethod != null)
            {
                if (ModelState.IsValid)
                {
                    depricationMethod.CreatedDate = DateTime.Now;
                    depricationMethod.UpdatedDate = DateTime.Now;
                    depricationMethod.IsActive = depricationMethod.IsActive;
                    depricationMethod.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDepreciationMethod>().Add(depricationMethod);
                    unitOfWork.SaveChanges();
                    return Ok(depricationMethod);
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
        public IActionResult updatedepreciationMethod([FromBody]AssetDepreciationMethod depricationMethod)
        {
            if (depricationMethod != null)
            {
                if (ModelState.IsValid)
                {
                    depricationMethod.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetDepreciationMethod>().Update(depricationMethod);
                    unitOfWork.SaveChanges();
                    return Ok(depricationMethod);
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
        public IActionResult removedepreciationMethodById(long id)
        {
            var depriciation = unitOfWork.Repository<AssetDepreciationMethod>().Find(x => x.AssetDepreciationMethodId == id).FirstOrDefault();
            if (depriciation != null)
            {
                depriciation.IsDeleted = true;
                unitOfWork.Repository<AssetDepreciationMethod>().Update(depriciation);
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
            var audits = unitOfWork.Repository<AssetDepreciationMethodAudit>()
                .Find(X => X.AssetDepreciationMethodId == id)
                .OrderByDescending(x => x.AssetDepreciationMethodAuditId).ToList();

            var auditResult = new List<AuditResult<AssetDepreciationMethodAudit>>();
            auditResult.Add(new AuditResult<AssetDepreciationMethodAudit>
            { AreaName = "Asset Deprecation Method", Memo = "", Result = audits });

            return Ok(auditResult);
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetDepreciationMethodColModel).GetProperties();
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
            List<AssetDepreciationMethodSPModel> assetDepreciationMethods = new List<AssetDepreciationMethodSPModel>();
            AssetDepreciationMethodSPModel assetDepreciationMethod = null;
            var gLAccounts = unitOfWork.Repository<AssetDepreciationMethod>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AssetDepreciationMethodId);
            foreach (var item in gLAccounts)
            {
                assetDepreciationMethod = new AssetDepreciationMethodSPModel();

                assetDepreciationMethod.Code = item.AssetDepreciationMethodCode;
                assetDepreciationMethod.Name = item.AssetDepreciationMethodName;
                assetDepreciationMethod.DepreciationMethod = item.AssetDepreciationMethodBasis;
                assetDepreciationMethod.Memo = item.AssetDepreciationMemo;
                assetDepreciationMethod.AssetDepreciationMethodId = item.AssetDepreciationMethodId;
                assetDepreciationMethod.CreatedDate = item.CreatedDate;
                assetDepreciationMethod.CreatedBy = item.CreatedBy;
                assetDepreciationMethod.UpdatedDate = item.UpdatedDate;
                assetDepreciationMethod.UpdatedBy = item.UpdatedBy;
                assetDepreciationMethod.IsActive = item.IsActive;
                assetDepreciationMethods.Add(assetDepreciationMethod);
            }
            dynamicGridData.ColumnData = assetDepreciationMethods;
            return Ok(dynamicGridData);
        }

        [HttpPost("UploadDepMethodCustomData")]
        public IActionResult UploadDepMethodCustomData()
        {

            unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("DepreciationMethod"), Request.Form.Files[0]);
            return Ok();
        }
        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}