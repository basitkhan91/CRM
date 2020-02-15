using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/GLAccountCategory")]
    public class GLAccountCategoryController : Controller
    {
        #region Private Members

        private readonly IUnitOfWork _unitOfWork;

        #endregion Private Members

        #region Constructor

        public GLAccountCategoryController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpPost("add")]
        public IActionResult add([FromBody]GLAccountCategory item)
        {
            bool isValid = _unitOfWork.GLAccountCategoryRepository.IsValid(item);
            var existingItems = _unitOfWork.GLAccountCategoryRepository.GetAllItems();
            if (isValid)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;      //[dbo].[GLAccountCategory].[UpdatedBy] not null in schema definition
                    item.IsActive = true;
                    item.MasterCompanyId = 1;
                    bool isDuplicate = _unitOfWork.GLAccountCategoryRepository.IsDuplicate(item, existingItems);
                    if (!isDuplicate)
                    {
                        _unitOfWork.Repository<GLAccountCategory>().Add(item);
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
            List<GLAccountCategoryAudit> audits = _unitOfWork.Repository<GLAccountCategoryAudit>().Find(x => x.GLAccountCategoryId == id).OrderByDescending(x => x.GLAccountCategoryAuditId).ToList();

            return Ok(audits);
        }

        [HttpPost("bulkUpload")]
        public IActionResult BulkUpload()
        {
            var result = _unitOfWork.GLAccountCategoryRepository.BulkUpload(Request.Form.Files[0]);

            return Ok(result);
        }

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<GLAccountCategory> items = _unitOfWork.GLAccountCategoryRepository.GetAllItems();
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getById(long id)
        {
            GLAccountCategory item = _unitOfWork.Repository<GLAccountCategory>().Find(x => x.GLAccountCategoryId == id).FirstOrDefault(x => !(x?.IsDelete ?? false));
            return Ok(item);
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeById(long id)
        {
            var item = _unitOfWork.Repository<GLAccountCategory>().Find(x => x.GLAccountCategoryId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                _unitOfWork.Repository<GLAccountCategory>().Update(item);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]GLAccountCategory item)
        {
            //  bool isValid = _unitOfWork.GLAccountCategoryRepository.IsValid(item);
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.UpdatedDate = DateTime.Now;
                    GLAccountCategory existingItem = _unitOfWork.Repository<GLAccountCategory>().Find(x => x.GLAccountCategoryId == item.GLAccountCategoryId).FirstOrDefault(x => !(x?.IsDelete ?? false));
                    existingItem.UpdatedDate = DateTime.Now;
                    existingItem.UpdatedBy = item.UpdatedBy;
                    existingItem.IsActive = item.IsActive;
                    existingItem.GLCID = item.GLCID;
                    existingItem.GLAccountCategoryName = item.GLAccountCategoryName;
                    //_unitOfWork.Repository<GLAccountCategory>().Update(item);
                    _unitOfWork.SaveChanges();
                    return Ok(item);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut("update/{id}")]

        public IActionResult updateGLAccountCategory([FromBody]GLAccountCategory item)
        {
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.UpdatedBy;
                    item.GLCID = item.GLCID;
                    item.GLAccountCategoryId = item.GLAccountCategoryId;
                    item.GLAccountCategoryName = item.GLAccountCategoryName;
                    
                    item.MasterCompanyId = item.MasterCompanyId;
                    item.IsActive = item.IsActive;
                   _unitOfWork.Repository<GLAccountCategory>().Update(item);
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