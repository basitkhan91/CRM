using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetIntangibleType")]
    public class AssetIntangibleTypeController : Controller
    {
        #region Private Members

        private readonly IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetIntangibleTypeController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpPost("add")]
        public IActionResult add([FromBody]AssetIntangibleType item)
        {
            bool isValid = _unitOfWork.AssetIntangibleTypeRepository.IsValid(item);
            var existingItems = _unitOfWork.AssetIntangibleTypeRepository.GetAllItems();
            if (isValid)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;      //[dbo].[AssetIntangibleType].[UpdatedBy] not null in schema definition
                    item.IsActive = true;
                    item.MasterCompanyId = 1;
                    bool isDuplicate = _unitOfWork.AssetIntangibleTypeRepository.IsDuplicate(item, existingItems);
                    if (!isDuplicate)
                    {
                        _unitOfWork.Repository<AssetIntangibleType>().Add(item);
                        _unitOfWork.SaveChanges();
                        item.UploadTag = UploadTag.Success;
                        return Ok(item);
                    }
                    else
                    {
                        item.UploadTag = UploadTag.Duplicate;
                        return BadRequest(item);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                item.UploadTag = UploadTag.Invalid;
                return BadRequest(item);
            }
        }

        [HttpGet("audit/{id}")]
        public IActionResult AuditDetails(long id)
        {
            List<AssetIntangibleTypeAudit> audits = _unitOfWork.Repository<AssetIntangibleTypeAudit>().Find(x => x.AssetIntangibleTypeId == id).OrderByDescending(x => x.AssetIntangibleTypeAuditId).ToList();

            return Ok(audits);
        }

        [HttpPost("bulkUpload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.AssetIntangibleTypeRepository.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<AssetIntangibleType> items = _unitOfWork.AssetIntangibleTypeRepository.GetAllItems();
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getById(long id)
        {
            AssetIntangibleType item = _unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id).FirstOrDefault(x => !(x?.IsDelete ?? false));
            return Ok(item);
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeById(long id)
        {
            var item = _unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                _unitOfWork.Repository<AssetIntangibleType>().Update(item);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]AssetIntangibleType item)
        {
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.UpdatedDate = DateTime.Now;
                    AssetIntangibleType existingItem = _unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == item.AssetIntangibleTypeId).FirstOrDefault(x => !(x?.IsDelete ?? false));
                    existingItem.UpdatedDate = DateTime.Now;
                    existingItem.UpdatedBy = item.UpdatedBy;
                    existingItem.IsActive = item.IsActive;
                    existingItem.AssetIntangibleName = item.AssetIntangibleName;
                    existingItem.AssetIntangibleMemo = item.AssetIntangibleMemo;
                    _unitOfWork.Repository<AssetIntangibleType>().Update(existingItem);
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

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}