using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/AssetIntangibleAttributeType")]
    public class AssetIntangibleAttributeTypeController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor
        public AssetIntangibleAttributeTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        #endregion Constructor

        #region Public Methods
        [HttpGet("getById/{id}")]
        public IActionResult getIntangibleAttributeTypeById(long id)
        {
            var intangibleTypeData = unitOfWork.Repository<AssetIntangibleAttributeType>().Find(x => x.AssetIntangibleAttributeTypeId == id && x.IsDelete != true);
            return Ok(intangibleTypeData);
        }
        [HttpPost("add")]
        public IActionResult AddAssetIntangibleAttributeType([FromBody]AssetIntangibleAttributeType assetIntangibleAttributeType)
        {
            if (assetIntangibleAttributeType != null)
            {
                if(ModelState.IsValid)
                {
                    assetIntangibleAttributeType.MasterCompanyId = assetIntangibleAttributeType.MasterCompanyId;
                    assetIntangibleAttributeType.CreatedDate = DateTime.Now;
                    assetIntangibleAttributeType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetIntangibleAttributeType>().Add(assetIntangibleAttributeType);
                    unitOfWork.SaveChanges();
                    return Ok(assetIntangibleAttributeType);
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
        public IActionResult UpdateAssetIntangibleAttributeType([FromBody]AssetIntangibleAttributeType assetIntangibleAttributeType)
        {
            if (assetIntangibleAttributeType != null)
            {
                if (ModelState.IsValid)
                {
                    assetIntangibleAttributeType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetIntangibleAttributeType>().Update(assetIntangibleAttributeType);
                    unitOfWork.SaveChanges();
                    return Ok(assetIntangibleAttributeType);
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
        public IActionResult RemoveAssetIntangibleAttributeType(long id)
        {
            var intangibleAttributeType = unitOfWork.Repository<AssetIntangibleAttributeType>().Find(x => x.AssetIntangibleAttributeTypeId == id).FirstOrDefault();
            if (intangibleAttributeType != null)
            {
                intangibleAttributeType.IsDelete = true;
                unitOfWork.Repository<AssetIntangibleAttributeType>().Update(intangibleAttributeType);
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
            PropertyInfo[] propertyInfos = typeof(AssetIntangibleAttributeTypeModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<AssetIntangibleAttributeTypeModel> dynamicGridData = new DynamicGridData<AssetIntangibleAttributeTypeModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<AssetIntangibleAttributeTypeModel> assetIntangibleAttributeTypeModels = new List<AssetIntangibleAttributeTypeModel>();
            AssetIntangibleAttributeTypeModel assetIntangibleAttributeTypeModel = null;
            var gLAccounts = unitOfWork.Repository<AssetIntangibleAttributeType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetIntangibleAttributeTypeId);
            foreach (var item in gLAccounts)
            {
                assetIntangibleAttributeTypeModel = new AssetIntangibleAttributeTypeModel();
                assetIntangibleAttributeTypeModel.AssetIntangibleAttributeTypeId = item.AssetIntangibleAttributeTypeId;
                assetIntangibleAttributeTypeModel.AmortizationFrequency = item.AmortizationFrequency;
                assetIntangibleAttributeTypeModel.IntangibleLife = item.IntangibleLife;
                assetIntangibleAttributeTypeModel.CreatedDate = item.CreatedDate;
                assetIntangibleAttributeTypeModel.CreatedBy = item.CreatedBy;
                assetIntangibleAttributeTypeModel.UpdatedDate = item.UpdatedDate;
                assetIntangibleAttributeTypeModel.UpdatedBy = item.UpdatedBy;
                //assetIntangibleAttributeTypeModel.IsActive = item.IsActive;
                assetIntangibleAttributeTypeModels.Add(assetIntangibleAttributeTypeModel);
            }
            dynamicGridData.ColumnData = assetIntangibleAttributeTypeModels;
            return Ok(dynamicGridData);
        }
        #endregion
    }
}