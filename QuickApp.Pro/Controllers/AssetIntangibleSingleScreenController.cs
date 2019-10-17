using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetIntangible")]
    public class AssetIntangibleSingleScreenController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetIntangibleSingleScreenController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetIntangibleTypeSingleScreenColModel).GetProperties();
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
            List<AssetIntangibleTypeSingleScreenSPModel> assetIntangibleTypes = new List<AssetIntangibleTypeSingleScreenSPModel>();
            AssetIntangibleTypeSingleScreenSPModel assetIntangibleType = null;
            var assetIntangibleTypeSingleScreen = unitOfWork.Repository<AssetIntangibleType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetIntangibleTypeId);
            foreach (var item in assetIntangibleTypeSingleScreen)
            {
                assetIntangibleType = new AssetIntangibleTypeSingleScreenSPModel();

                assetIntangibleType.Code = item.AssetIntangibleCode;
                assetIntangibleType.Name = item.AssetIntangibleName;
                assetIntangibleType.Memo = item.AssetIntangibleMemo;
                assetIntangibleType.AssetIntangibleTypeId = item.AssetIntangibleTypeId;
                assetIntangibleType.CreatedDate = item.CreatedDate;
                assetIntangibleType.CreatedBy = item.CreatedBy;
                assetIntangibleType.UpdatedDate = item.UpdatedDate;
                assetIntangibleType.UpdatedBy = item.UpdatedBy;
                assetIntangibleType.IsActive = item.IsActive;
                assetIntangibleTypes.Add(assetIntangibleType);
            }
            dynamicGridData.ColumnData = assetIntangibleTypes;
            return Ok(dynamicGridData);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetIntangibleById(long id)
        {
            var assetIntangibleTypeSingleScreen = unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id && x.IsDelete != true);
            return Ok(assetIntangibleTypeSingleScreen);
        }

        [HttpPost("add")]
        public IActionResult addAssetIntangible([FromBody]AssetIntangibleType assetIntangibleTypeSingleScreen)
        {
            if (assetIntangibleTypeSingleScreen != null)
            {
                if (ModelState.IsValid)
                {

                    assetIntangibleTypeSingleScreen.UpdatedDate = DateTime.Now;
                    assetIntangibleTypeSingleScreen.CreatedDate = DateTime.Now;
                      assetIntangibleTypeSingleScreen.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetIntangibleType>().Add(assetIntangibleTypeSingleScreen);
                    unitOfWork.SaveChanges();
                    return Ok(assetIntangibleTypeSingleScreen);
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
        public IActionResult updateAssetIntangible([FromBody]AssetIntangibleType assetIntangibleTypeSingleScreen)
        {
            if (assetIntangibleTypeSingleScreen != null)
            {
                if (ModelState.IsValid)
                {
                    if (assetIntangibleTypeSingleScreen.AssetIntangibleTypeId > 0)
                    {
                        assetIntangibleTypeSingleScreen.UpdatedDate = DateTime.Now;
                        unitOfWork.Repository<AssetIntangibleType>().Update(assetIntangibleTypeSingleScreen);
                        unitOfWork.SaveChanges();
                        return Ok(assetIntangibleTypeSingleScreen);
                    }
                    else {
                        return BadRequest("Unable to update [modelname], invalid ID.");
                    }
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
        public IActionResult removeAssetIntangibleById(long id)
        {
            var assetIntangibleTypeSingleScreen = unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id).FirstOrDefault();
            if (assetIntangibleTypeSingleScreen != null)
            {
                assetIntangibleTypeSingleScreen.IsDelete = true;
                unitOfWork.Repository<AssetIntangibleType>().Update(assetIntangibleTypeSingleScreen);
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
            var audits = unitOfWork.Repository<AssetIntangibleTypeSingleScreenAudit>()
                .Find(x => x.AssetIntangibleTypeSingleId == id)
                .OrderByDescending(x => x.AssetIntangibleTypeSingleAuditId);

            var auditResult = new List<AuditResult<AssetIntangibleTypeSingleScreenAudit>>();

            auditResult.Add(new AuditResult<AssetIntangibleTypeSingleScreenAudit> { AreaName = "Intangible", Result = audits.ToList() });

            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}