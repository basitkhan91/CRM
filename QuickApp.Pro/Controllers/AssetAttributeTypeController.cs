using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetAttributeType")]
    public class AssetAttributeTypeController : Controller
    {
        #region Private Members

        private readonly IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public AssetAttributeTypeController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpPost("add")]
        public IActionResult add([FromBody]AssetAttributeType item)
        {
            bool isValid = _unitOfWork.AssetAttributeTypeRepository.IsValid(item);
            var existingItems = _unitOfWork.AssetAttributeTypeRepository.GetAllItems();
            if (isValid)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;      //[dbo].[AssetAttributeType].[UpdatedBy] not null in schema definition
                    item.IsActive = true;
                    item.IsDelete = false;
                    item.MasterCompanyId = 1;
                    bool isDuplicate = _unitOfWork.AssetAttributeTypeRepository.IsDuplicate(item, existingItems);
                    if (!isDuplicate)
                    {
                        _unitOfWork.Repository<AssetAttributeType>().Add(item);
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
            List<AssetAttributeTypeAudit> audits = _unitOfWork.Repository<AssetAttributeTypeAudit>().Find(x => x.AssetAttributeTypeId == id).OrderByDescending(x => x.AssetAttributeTypeAuditId).ToList();

            return Ok(audits);
        }

        [HttpPost("bulkUpload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.AssetAttributeTypeRepository.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<AssetAttributeType> items = _unitOfWork.AssetAttributeTypeRepository.GetAllItems();
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getById(long id)
        {
            AssetAttributeType item = _unitOfWork.Repository<AssetAttributeType>().Find(x => x.AssetAttributeTypeId == id).FirstOrDefault(x => !(x?.IsDelete ?? false));
            return Ok(item);
        }

        [HttpGet("getByAssetTypeId/{id}")]
        public IActionResult getByAssetTypeId(long id)
        {
            AssetAttributeType item = _unitOfWork.Repository<AssetAttributeType>().Find(x => x.AssetTypeId == id).FirstOrDefault(x => !(x?.IsDelete ?? false));
            return Ok(item);
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeById(long id)
        {
            var item = _unitOfWork.Repository<AssetAttributeType>().Find(x => x.AssetAttributeTypeId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                _unitOfWork.Repository<AssetAttributeType>().Update(item);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]AssetAttributeType item)
        {
            bool isValid = _unitOfWork.AssetAttributeTypeRepository.IsValid(item);
            if (isValid)
            {
                AssetAttributeType existingItem = _unitOfWork.Repository<AssetAttributeType>().Find(x => x.AssetAttributeTypeId == item.AssetAttributeTypeId).FirstOrDefault(x => !(x?.IsDelete ?? false));

                existingItem.AssetTypeId = item.AssetTypeId;
                existingItem.AssetAttributeTypeName = item.AssetAttributeTypeName;
                existingItem.Description = item.Description;
                existingItem.ConventionType = item.ConventionType;
                existingItem.DepreciationMethod = item.DepreciationMethod;
                existingItem.ResidualPercentage = item.ResidualPercentage;
                existingItem.ResidualValue = item.ResidualValue;
                existingItem.AssetLife = item.AssetLife;
                existingItem.DepreciationFrequencyId = item.DepreciationFrequencyId;
                existingItem.AcquiredGLAccountId = item.AcquiredGLAccountId;
                existingItem.DeprExpenseGLAccountId = item.DeprExpenseGLAccountId;
                existingItem.AdDepsGLAccountId = item.AdDepsGLAccountId;
                existingItem.AssetSale = item.AssetSale;
                existingItem.AssetWriteOff = item.AssetWriteOff;
                existingItem.AssetWriteDown = item.AssetWriteDown;

                existingItem.UpdatedDate = DateTime.Now;
                existingItem.UpdatedBy = item.UpdatedBy;
                existingItem.IsActive = item.IsActive;
                existingItem.IsDelete = false;
                _unitOfWork.SaveChanges();
                return Ok(item);
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
