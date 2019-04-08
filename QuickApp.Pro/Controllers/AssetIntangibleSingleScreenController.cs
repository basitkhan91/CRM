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
            var assetIntangibleTypeSingleScreen = unitOfWork.Repository<AssetIntangibleTypeSingleScreen>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetIntangibleTypeSingleId);
            return Ok(assetIntangibleTypeSingleScreen);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetIntangibleById(long id)
        {
            var assetIntangibleTypeSingleScreen = unitOfWork.Repository<AssetIntangibleTypeSingleScreen>().Find(x => x.AssetIntangibleTypeSingleId == id && x.IsDelete != true);
            return Ok(assetIntangibleTypeSingleScreen);
        }

        [HttpPost("add")]
        public IActionResult addAssetIntangible([FromBody]AssetIntangibleTypeSingleScreen assetIntangibleTypeSingleScreen)
        {
            if (assetIntangibleTypeSingleScreen != null)
            {
                if (ModelState.IsValid)
                {
                    assetIntangibleTypeSingleScreen.IsActive = true;
                    assetIntangibleTypeSingleScreen.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetIntangibleTypeSingleScreen>().Add(assetIntangibleTypeSingleScreen);
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
        public IActionResult updateAssetIntangible([FromBody]AssetIntangibleTypeSingleScreen assetIntangibleTypeSingleScreen)
        {
            if (assetIntangibleTypeSingleScreen != null)
            {
                if (ModelState.IsValid)
                {
                    if (assetIntangibleTypeSingleScreen.AssetIntangibleTypeSingleId > 0)
                    {
                        unitOfWork.Repository<AssetIntangibleTypeSingleScreen>().Update(assetIntangibleTypeSingleScreen);
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
            var assetIntangibleTypeSingleScreen = unitOfWork.Repository<AssetIntangibleTypeSingleScreen>().Find(x => x.AssetIntangibleTypeSingleId == id).FirstOrDefault();
            if (assetIntangibleTypeSingleScreen != null)
            {
                assetIntangibleTypeSingleScreen.IsDelete = true;
                unitOfWork.Repository<AssetIntangibleTypeSingleScreen>().Update(assetIntangibleTypeSingleScreen);
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