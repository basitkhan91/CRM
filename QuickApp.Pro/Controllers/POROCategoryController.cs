using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/poroCategory")]
    public class POROCategoryController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public POROCategoryController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var poroCategory = unitOfWork.Repository<POROCategory>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.POROCategoryId);
            return Ok(poroCategory);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getporoCategoryById(long id)
        {
            var poroCategory = unitOfWork.Repository<POROCategory>().Find(x => x.POROCategoryId == id && x.IsDelete != true);
            return Ok(poroCategory);
        }

        [HttpPost("add")]
        public IActionResult addporoCategory([FromBody]POROCategory poroCategory)
        {
            if (poroCategory != null)
            {
                if (ModelState.IsValid)
                {
                    POROCategory category = new POROCategory();
                    category.CategoryName = poroCategory.CategoryName;
                    category.IsPO = poroCategory.IsPO;
                    category.IsRO = poroCategory.IsRO;
                    category.CreatedDate = DateTime.Now;
                    category.UpdatedDate = DateTime.Now;
                    category.IsDelete = false;
                    category.IsActive = true;
                    category.MasterCompanyId = 1;
                    unitOfWork.Repository<POROCategory>().Add(category);
                    unitOfWork.SaveChanges();
                    return Ok(poroCategory);
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
        public IActionResult updateporoCategory([FromBody]POROCategory poroCategory)
        {
            if (poroCategory != null)
            {
                if (ModelState.IsValid)
                {
                    poroCategory.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<POROCategory>().Update(poroCategory);
                    unitOfWork.SaveChanges();
                    return Ok(poroCategory);
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
        public IActionResult removeporoCategoryById(long id)
        {
            var poroCategory = unitOfWork.Repository<POROCategory>().Find(x => x.POROCategoryId == id).FirstOrDefault();
            if (poroCategory != null)
            {
                poroCategory.IsDelete = true;
                unitOfWork.Repository<POROCategory>().Update(poroCategory);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("UpdatePOROforActive/{id}")]
        public IActionResult poroUpdateforActive(long id, [FromBody]POROCategory poroCategory)
        {

            var POROCategoryObj = unitOfWork.Repository<POROCategory>().GetSingleOrDefault(a => a.POROCategoryId == id);

            POROCategoryObj.IsActive = poroCategory.IsActive;
            POROCategoryObj.UpdatedDate = DateTime.Now; ;

            //  MasterPartsStatus(long masterPartId, bool status, string updatedBy)

            //unitOfWork.CommonRepository.MasterPartsStatus(CustomerObj.MasterPartId, Convert.ToBoolean(itemMasterViewModel.IsActive), itemMasterViewModel.UpdatedBy);

            unitOfWork.Repository<POROCategory>().Update(POROCategoryObj);
            unitOfWork.SaveChanges();
            return Ok(POROCategoryObj);


        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<POROCategoryAudit>()
                .Find(x => x.POROCategoryId == id)
                .OrderByDescending(x => x.POROCategoryAuditId);

            var auditResult = new List<AuditResult<POROCategoryAudit>>();

            auditResult.Add(new AuditResult<POROCategoryAudit> { AreaName = "PO-RO-category", Result = audits.ToList() });

            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}