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
        public IActionResult getIntangibleAttributeTypeById(long id)
        {
            var intangibleTypeData = unitOfWork.Repository<AssetDepreciationInterval>().Find(x => x.AssetDepreciationIntervalId == id && x.IsDelete != true);
            return Ok(intangibleTypeData);
        }
        [HttpPost("add")]
        public IActionResult AddAssetIntangibleAttributeType([FromBody]AssetDepreciationInterval assetDepreciationInterval)
        {
            if (assetDepreciationInterval != null)
            {
                if (ModelState.IsValid)
                {
                    assetDepreciationInterval.CreatedDate = DateTime.Now;
                    assetDepreciationInterval.UpdatedDate = DateTime.Now;
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
        public IActionResult UpdateAssetIntangibleAttributeType([FromBody]AssetDepreciationInterval assetIntangibleAttributeType)
        {
            if (assetIntangibleAttributeType != null)
            {
                if (ModelState.IsValid)
                {
                    assetIntangibleAttributeType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetDepreciationInterval>().Update(assetIntangibleAttributeType);
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
            var intangibleAttributeType = unitOfWork.Repository<AssetDepreciationInterval>().Find(x => x.AssetDepreciationIntervalId == id).FirstOrDefault();
            if (intangibleAttributeType != null)
            {
                intangibleAttributeType.IsDelete = true;
                unitOfWork.Repository<AssetDepreciationInterval>().Update(intangibleAttributeType);
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
            dynamicGridData.ColumnData = unitOfWork.Repository<AssetDepreciationInterval>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepreciationIntervalId);
            return Ok(dynamicGridData);
        }
        #endregion
    }
}