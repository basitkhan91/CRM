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

    [Route("api/DepreciationIntervals")]
    public class DepreciationIntervalsController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public DepreciationIntervalsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var depreciationInterval = unitOfWork.Repository<AssetDepreciationIntervalType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepreciationIntervalTypeId);
            return Ok(depreciationInterval);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getdepreciationIntervalById(long id)
        {
            var depreciationInterval = unitOfWork.Repository<AssetDepreciationIntervalType>().Find(x => x.AssetDepreciationIntervalTypeId == id && x.IsDelete != true);
            return Ok(depreciationInterval);
        }

        [HttpPost("add")]
        public IActionResult adddepreciationInterval([FromBody]AssetDepreciationIntervalType depreciationInterval)
        {
            if (depreciationInterval != null)
            {
                if (ModelState.IsValid)
                {
                    depreciationInterval.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDepreciationIntervalType>().Add(depreciationInterval);
                    unitOfWork.SaveChanges();
                    return Ok(depreciationInterval);
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
        public IActionResult updatedepreciationInterval([FromBody]AssetDepreciationIntervalType depreciationInterval)
        {
            if (depreciationInterval != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<AssetDepreciationIntervalType>().Update(depreciationInterval);
                    unitOfWork.SaveChanges();
                    return Ok(depreciationInterval);
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
        public IActionResult removedepreciationIntervalById(long id)
        {
            var depreciationInterval = unitOfWork.Repository<AssetDepreciationIntervalType>().Find(x => x.AssetDepreciationIntervalTypeId == id).FirstOrDefault();
            if (depreciationInterval != null)
            {
                depreciationInterval.IsDelete = true;
                unitOfWork.Repository<AssetDepreciationIntervalType>().Update(depreciationInterval);
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