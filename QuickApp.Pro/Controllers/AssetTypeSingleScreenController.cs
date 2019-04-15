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

    [Route("api/AssetType")]
    public class AssetTypeSingleScreenController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetTypeSingleScreenController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var assets = unitOfWork.Repository<AssetTypeSingleScreen>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetTypeSingleScreenId);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetTypeSingleScreen>().Find(x => x.AssetTypeSingleScreenId == id && x.IsDelete != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetTypeSingleScreen assetType)
        {
            if (assetType != null)
            {
                if (ModelState.IsValid)
                {
                    assetType.CreatedDate = DateTime.Now;
                    assetType.UpdatedDate = DateTime.Now;
                    assetType.IsActive = true;
                    assetType.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetTypeSingleScreen>().Add(assetType);
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

        [HttpPost("update")]
        public IActionResult updateAsset([FromBody]AssetTypeSingleScreen assetType)
        {
            if (assetType != null)
            {
                if (ModelState.IsValid)
                {
                    assetType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetTypeSingleScreen>().Update(assetType);
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

        [HttpGet("removeById/{id}")]
        public IActionResult removeAssetById(long id)
        {
            var assetType = unitOfWork.Repository<AssetTypeSingleScreen>().Find(x => x.AssetTypeSingleScreenId == id).FirstOrDefault();
            if (assetType != null)
            {
                assetType.IsDelete = true;
                unitOfWork.Repository<AssetTypeSingleScreen>().Update(assetType);
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