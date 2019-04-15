using System;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

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
            var assets = unitOfWork.Repository<AssetDepConventionType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepConventionTypeId);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetDepById(long id)
        {
            var assetDep = unitOfWork.Repository<AssetDepConventionType>().Find(x => x.AssetDepConventionTypeId == id && x.IsDelete != true);
            return Ok(assetDep);
        }

        [HttpPost("add")]
        public IActionResult addAssetDep([FromBody]AssetDepConventionType assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    assetDep.CreatedDate = DateTime.Now;
                    assetDep.UpdatedDate = DateTime.Now;
                    assetDep.IsActive = true;
                    assetDep.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDepConventionType>().Add(assetDep);
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
        public IActionResult updateAssetDep([FromBody]AssetDepConventionType assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    assetDep.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetDepConventionType>().Update(assetDep);
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
            var assetDep = unitOfWork.Repository<AssetDepConventionType>().Find(x => x.AssetDepConventionTypeId == id).FirstOrDefault();
            if (assetDep != null)
            {
                assetDep.IsDelete = true;
                unitOfWork.Repository<AssetDepConventionType>().Update(assetDep);
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