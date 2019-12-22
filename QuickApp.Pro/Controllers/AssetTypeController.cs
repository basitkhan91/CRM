using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetType")]
    public class AssetTypeController : Controller
    {
        #region Private Members

        private readonly IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetTypeController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<AssetType> items = _unitOfWork.Repository<AssetType>().GetAll().Where(x => !x.IsDelete).OrderByDescending(x => x.AssetTypeId).ToList();
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getById(long id)
        {
            AssetType item = _unitOfWork.Repository<AssetType>().Find(x => x.AssetTypeId == id && !x.IsDelete).FirstOrDefault();
            return Ok(item);
        }

        [HttpPost("add")]
        public IActionResult add([FromBody]AssetType item)
        {
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;      //[dbo].[AssetType].[UpdatedBy] not null in schema definition
                    item.IsActive = true;
                    item.MasterCompanyId = 1;
                    _unitOfWork.Repository<AssetType>().Add(item);
                    _unitOfWork.SaveChanges();
                    return Ok(item);
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
        public IActionResult update([FromBody]AssetType item)
        {
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.UpdatedDate = DateTime.Now;
                    _unitOfWork.Repository<AssetType>().Update(item);
                    _unitOfWork.SaveChanges();
                    return Ok(item);
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
        public IActionResult removeById(long id)
        {
            var item = _unitOfWork.Repository<AssetType>().Find(x => x.AssetTypeId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                _unitOfWork.Repository<AssetType>().Update(item);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("audit/{id}")]
        public IActionResult AuditDetails(long id)
        {
            List<AssetTypeAudit> audits = _unitOfWork.Repository<AssetTypeAudit>().Find(x => x.AssetTypeId == id).OrderByDescending(x => x.AssetTypeAuditId).ToList();

            return Ok(audits);
        }

        [HttpPost("bulkUpload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.AssetTypeRepository.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}