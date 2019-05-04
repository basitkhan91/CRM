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
                    poroCategory.CreatedDate = DateTime.Now;
                    poroCategory.UpdatedDate = DateTime.Now;
                    poroCategory.IsActive = true;
                    poroCategory.MasterCompanyId = 1;
                    unitOfWork.Repository<POROCategory>().Add(poroCategory);
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