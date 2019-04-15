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

    [Route("api/AssetStatus")]
    public class AssetStatusController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetStatusController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var assets = unitOfWork.Repository<AssetStatus>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.Id);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var asset = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id && x.IsDeleted != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]AssetStatus asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.IsActive = true;
                    asset.MasterCompanyId = 1;
                    asset.CreatedDate = DateTime.Now;
                    asset.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetStatus>().Add(asset);
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
        public IActionResult updateAsset([FromBody]AssetStatus asset)
        {
            if (asset != null)
            {
                if (ModelState.IsValid)
                {
                    asset.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetStatus>().Update(asset);
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
            var asset = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id).FirstOrDefault();
            if (asset != null)
            {
                asset.IsDeleted = true;
                unitOfWork.Repository<AssetStatus>().Update(asset);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut("updateActive/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] AssetStatus asset)
        {

            if (ModelState.IsValid)
            {
                if (asset != null)
                {
                    var existingResult = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id).FirstOrDefault();
                    existingResult.IsActive = asset.IsActive;
                    unitOfWork.Repository<AssetStatus>().Update(asset);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }


            return Ok(ModelState);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}