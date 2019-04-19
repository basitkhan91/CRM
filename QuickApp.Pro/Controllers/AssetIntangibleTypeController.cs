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

    [Route("api/AssetIntangibleType")]
    public class AssetIntangibleTypeController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetIntangibleTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllIntangibleTypes")]
        public IActionResult getAll()
        {
            var intangibleTypeData = unitOfWork.assetIntangibleType.GetAllIntangibleType();
            return Ok(intangibleTypeData);
        }


        [HttpGet("getById/{id}")]
        public IActionResult getintangibleById(long id)
        {
            var intangibleTypeData = unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id && x.IsDelete != true);
            return Ok(intangibleTypeData);
        }

        [HttpPost("addintangibleType")]
        public IActionResult addintangibleType([FromBody]AssetIntangibleType intangibleTypeData)
        {
            if (intangibleTypeData != null)
            {
                if (ModelState.IsValid)
                {
                    intangibleTypeData.MasterCompanyId = 1;
                    intangibleTypeData.CreatedDate = DateTime.Now;
                    intangibleTypeData.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetIntangibleType>().Add(intangibleTypeData);
                    unitOfWork.SaveChanges();
                    return Ok(intangibleTypeData);
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
        public IActionResult updateintangibleType([FromBody]AssetIntangibleType intangibleType)
        {
            if (intangibleType != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<AssetIntangibleType>().Update(intangibleType);
                    unitOfWork.SaveChanges();
                    return Ok(intangibleType);
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

        [HttpGet("removeintangibleTypeById/{id}")]
        public IActionResult removeintangibleTypeById(long id)
        {
            var intangibleType = unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id).FirstOrDefault();
            if (intangibleType != null)
            {
                intangibleType.IsDelete = true;
                unitOfWork.Repository<AssetIntangibleType>().Update(intangibleType);
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
