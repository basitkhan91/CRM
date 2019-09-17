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

        //[HttpGet("getAll")]
        //public IActionResult getAll()
        //{
        //    var depreciationMethods = unitOfWork.Repository<AssetDepreciationMethod>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepreciationMethodId);
        //    return Ok(depreciationMethods);
        //}

        [HttpGet("getById/{id}")]
        public IActionResult getdepreciationMethodById(long id)
        {
            var depreciationMethod = unitOfWork.Repository<AssetDepreciationMethod>().Find(x => x.AssetDepreciationMethodId == id && x.IsDelete != true);
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
                    depricationMethod.IsActive = true;
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
                depriciation.IsDelete = true;
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
            PropertyInfo[] propertyInfos = typeof(AssetDepreciationMethodModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<AssetDepreciationMethodModel> dynamicGridData = new DynamicGridData<AssetDepreciationMethodModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<AssetDepreciationMethodModel> assetDepreciationMethods = new List<AssetDepreciationMethodModel>();
            AssetDepreciationMethodModel assetDepreciationMethod = null;
            var gLAccounts = unitOfWork.Repository<AssetDepreciationMethod>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepreciationMethodId);
            foreach (var item in gLAccounts)
            {
                assetDepreciationMethod = new AssetDepreciationMethodModel();
                assetDepreciationMethod.AssetDepreciationMethodId = item.AssetDepreciationMethodId;
                assetDepreciationMethod.AssetDepreciationMethodName = item.AssetDepreciationMethodName;
                //assetDepreciationMethod.AssetDepreciationMethodCode = item.AssetDepreciationMethodCode;
                assetDepreciationMethod.AssetDepreciationMethodBasis = item.AssetDepreciationMethodBasis;
                assetDepreciationMethod.CreatedDate = item.CreatedDate;
                assetDepreciationMethod.CreatedBy = item.CreatedBy;
                assetDepreciationMethod.UpdatedDate = item.UpdatedDate;
                assetDepreciationMethod.UpdatedBy = item.UpdatedBy;
                //currency.IsActive = item.IsActive;
                assetDepreciationMethods.Add(assetDepreciationMethod);
            }
            dynamicGridData.ColumnData = assetDepreciationMethods;
            return Ok(dynamicGridData);
        }
        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}