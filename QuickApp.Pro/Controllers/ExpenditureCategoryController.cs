using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/ExpenditureCategory")]
    public class ExpenditureCategoryController : Controller
    {
        #region Private Members

        private readonly IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public ExpenditureCategoryController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpPost("add")]
        public IActionResult add([FromBody]ExpenditureCategory item)
        {
            bool isValid = _unitOfWork.ExpenditureCategoryRepository.IsValid(item);
            var existingItems = _unitOfWork.ExpenditureCategoryRepository.GetAllItems();
            if (isValid)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;      //[dbo].[ExpenditureCategory].[UpdatedBy] not null in schema definition
                    item.IsActive = true;
                    item.MasterCompanyId = 1;
                    bool isDuplicate = _unitOfWork.ExpenditureCategoryRepository.IsDuplicate(item, existingItems);
                    if (!isDuplicate)
                    {
                        _unitOfWork.Repository<ExpenditureCategory>().Add(item);
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
            List<ExpenditureCategoryAudit> audits = _unitOfWork.Repository<ExpenditureCategoryAudit>().Find(x => x.ExpenditureCategoryId == id).OrderByDescending(x => x.ExpenditureCategoryAuditId).ToList();

            return Ok(audits);
        }

        [HttpPost("bulkUpload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.ExpenditureCategoryRepository.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<ExpenditureCategory> items = _unitOfWork.ExpenditureCategoryRepository.GetAllItems();
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getById(long id)
        {
            ExpenditureCategory item = _unitOfWork.Repository<ExpenditureCategory>().Find(x => x.ExpenditureCategoryId == id).FirstOrDefault(x => !(x?.IsDelete ?? false));
            return Ok(item);
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeById(long id)
        {
            var item = _unitOfWork.Repository<ExpenditureCategory>().Find(x => x.ExpenditureCategoryId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                _unitOfWork.Repository<ExpenditureCategory>().Update(item);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]ExpenditureCategory item)
        {
            bool isValid = _unitOfWork.ExpenditureCategoryRepository.IsValid(item);
            if (isValid)
            {
                item.UpdatedDate = DateTime.Now;
                ExpenditureCategory existingItem = _unitOfWork.Repository<ExpenditureCategory>().Find(x => x.ExpenditureCategoryId == item.ExpenditureCategoryId).FirstOrDefault(x => !(x?.IsDelete ?? false));
                existingItem.UpdatedDate = DateTime.Now;
                existingItem.UpdatedBy = item.UpdatedBy;
                existingItem.IsActive = item.IsActive;
                existingItem.Description = item.Description;
                existingItem.Memo = item.Memo;
                //_unitOfWork.Repository<ExpenditureCategory>().Update(item);
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
