using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/StageCode")]
    public class StageCodeController : Controller
    {
        #region Private Members

        private readonly IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public StageCodeController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpPost("add")]
        public IActionResult add([FromBody]StageCode item)
        {
            bool isValid = _unitOfWork.StageCodeRepository.IsValid(item);
            var existingItems = _unitOfWork.StageCodeRepository.GetAllItems();
            if (isValid)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;      //[dbo].[StageCode].[UpdatedBy] not null in schema definition
                    item.IsActive = true;
                    item.MasterCompanyId = 1;
                    bool isDuplicate = _unitOfWork.StageCodeRepository.IsDuplicate(item, existingItems);
                    if (!isDuplicate)
                    {
                        _unitOfWork.Repository<StageCode>().Add(item);
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
            List<StageCodeAudit> audits = _unitOfWork.Repository<StageCodeAudit>().Find(x => x.StageCodeId == id).OrderByDescending(x => x.StageCodeAuditId).ToList();

            return Ok(audits);
        }

        [HttpPost("bulkUpload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.StageCodeRepository.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<StageCode> items = _unitOfWork.StageCodeRepository.GetAllItems();
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getById(long id)
        {
            StageCode item = _unitOfWork.Repository<StageCode>().Find(x => x.StageCodeId == id).FirstOrDefault(x => !(x?.IsDelete ?? false));
            return Ok(item);
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeById(long id)
        {
            var item = _unitOfWork.Repository<StageCode>().Find(x => x.StageCodeId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                _unitOfWork.Repository<StageCode>().Update(item);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]StageCode item)
        {

            bool isValid = _unitOfWork.StageCodeRepository.IsValid(item);
            var existingItems = _unitOfWork.StageCodeRepository.GetAllItems();
            if (isValid)
            {
                if (ModelState.IsValid)
                {
                    bool isDuplicate = _unitOfWork.StageCodeRepository.IsDuplicate(item, existingItems);
                    if (!isDuplicate)
                    {
                        try
                        {
                            StageCode existingItem = _unitOfWork.Repository<StageCode>().Find(x => x.StageCodeId == item.StageCodeId).FirstOrDefault();
                            existingItem.UpdatedDate = DateTime.Now;
                            existingItem.UpdatedBy = item.UpdatedBy;
                            existingItem.IsActive = item.IsActive;
                            existingItem.GateCode = item.GateCode;
                            existingItem.Description = item.Description;
                            existingItem.Sequence = item.Sequence;
                            existingItem.Memo = item.Memo;
                            existingItem.IsDelete = item.IsDelete;
                            _unitOfWork.Repository<StageCode>().Update(existingItem);
                            _unitOfWork.SaveChanges();
                            item.UploadTag = UploadTag.Success;
                            return Ok(item);
                        }
                        catch (Exception ex)
                        {

                            return BadRequest(ex.Message);
                        }
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

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}