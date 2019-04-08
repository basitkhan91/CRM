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

    [Route("api/depreciationMethod")]
    public class AssetDepriciationMethodController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetDepriciationMethodController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var depreciationMethods = unitOfWork.Repository<AssetDepreciationMethod>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepreciationMethodId);
            return Ok(depreciationMethods);
        }

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
            var depriciation = unitOfWork.Repository<AssetDepreciationMethod> ().Find(x => x.AssetDepreciationMethodId == id).FirstOrDefault();
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

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}