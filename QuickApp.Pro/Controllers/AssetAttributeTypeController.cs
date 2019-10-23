using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetAttributeType")]
    public class AssetAttributeTypeController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetAttributeTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllAssetTypes")]
        public IActionResult getAll()
        {
            var assetTypeData = unitOfWork.AssetTypeRepository.GetAll();
            return Ok(assetTypeData);
        }

       
        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var assetTypeData = unitOfWork.Repository<AssetType>().Find(x => x.AssetTypeId == id && x.IsDelete != true);
            return Ok(assetTypeData);
        }

        [HttpPost("addAssetType")]
        public IActionResult addAssetType([FromBody]AssetType assetTypeData)
        {
            if (assetTypeData != null)
            {
                if (ModelState.IsValid)
                {
                    assetTypeData.MasterCompanyId = 1;
                    assetTypeData.CreatedDate = DateTime.Now;
                    assetTypeData.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetType>().Add(assetTypeData);
                    unitOfWork.SaveChanges();
                    return Ok(assetTypeData);
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

        [HttpPut("update")]
        public IActionResult updateAssetType([FromBody]AssetType assetType)
        {
            if (assetType != null)
            {
                if (ModelState.IsValid)
                {
                    assetType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetType>().Update(assetType);
                    unitOfWork.SaveChanges();
                    return Ok(assetType);
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

        [HttpGet("removeAssetTypeById/{id}")]
        public IActionResult removeAssetTypeById(long id)
        {
            var assetType = unitOfWork.Repository<AssetType>().Find(x => x.AssetTypeId == id).FirstOrDefault();
            if (assetType != null)
            {
                assetType.IsDelete = true;
                unitOfWork.Repository<AssetType>().Update(assetType);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
