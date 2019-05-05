using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class GLAccountCategoryController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        //private const string GetGLAccountCategoryByIdGLAccountCategoryName = "GetGLAccountCategoryById";

        public GLAccountCategoryController(IUnitOfWork unitOfWork, ILogger<GLAccountCategoryController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<GLAccountCategoryViewModel>))]
        public IActionResult Get()
        {
            var allGLAccountCategory = _unitOfWork.GLAccountCategories.GetAllGLAccountCategoriesData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<GLAccountCategoryViewModel>>(allGLAccountCategory));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GLAccountCategory", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("glaccountcategorypost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateGLAccountCategory([FromBody] GLAccountCategoryViewModel glaccountCategoryViewModel)
        {
            if (ModelState.IsValid)
            {
                if (glaccountCategoryViewModel == null)
                    return BadRequest($"{nameof(glaccountCategoryViewModel)} cannot be null");

                DAL.Models.GLAccountCategories glaccountcategoryobject = new DAL.Models.GLAccountCategories();
                glaccountcategoryobject.GLAccountCategoryName = glaccountCategoryViewModel.GLAccountCategoryName;
                glaccountcategoryobject.GLCID = glaccountCategoryViewModel.GLCID;
                glaccountcategoryobject.MasterCompanyId = glaccountCategoryViewModel.MasterCompanyId;
                glaccountcategoryobject.IsActive = glaccountCategoryViewModel.IsActive;
                glaccountcategoryobject.CreatedDate = DateTime.Now;
                glaccountcategoryobject.UpdatedDate = DateTime.Now;
                glaccountcategoryobject.CreatedBy = glaccountCategoryViewModel.CreatedBy;
                glaccountcategoryobject.UpdatedBy = glaccountCategoryViewModel.UpdatedBy;
                _unitOfWork.GLAccountCategories.Add(glaccountcategoryobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("glaccountcategorypost/{id}")]
        public IActionResult UpdateGLAccountcategory(long id, [FromBody] GLAccountCategoryViewModel glaccountCategoryViewModel)
        {

            if (ModelState.IsValid)
            {
                if (glaccountCategoryViewModel == null)
                    return BadRequest($"{nameof(glaccountCategoryViewModel)} cannot be null");

                var existingResult = _unitOfWork.GLAccountCategories.GetSingleOrDefault(c => c.GLAccountCategoryId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = glaccountCategoryViewModel.UpdatedBy;
                existingResult.GLCID = glaccountCategoryViewModel.GLCID;
                existingResult.GLAccountCategoryName = glaccountCategoryViewModel.GLAccountCategoryName;
                existingResult.IsActive = glaccountCategoryViewModel.IsActive;
                existingResult.MasterCompanyId = glaccountCategoryViewModel.MasterCompanyId;

                _unitOfWork.GLAccountCategories.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("glaccountcategorypost/{id}")]
        [Produces(typeof(GLAccountCategoryViewModel))]
        public IActionResult DeleteGLAccountCategory(long id)
        {
            var existingResult = _unitOfWork.GLAccountCategories.GetSingleOrDefault(c => c.GLAccountCategoryId == id);
            existingResult.IsDelete = true;
            _unitOfWork.GLAccountCategories.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult getGLAccountCategoryAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<GLAccountCategoriesAudit>()
                .Find(x => x.GLAccountCategoryId == Id)
                .OrderByDescending(x => x.GLAccountCategoryAuditId)
                .ToList();

            var auditResult = new List<AuditResult<GLAccountCategoriesAudit>>();

            auditResult.Add(new AuditResult<GLAccountCategoriesAudit>
            {
                AreaName = "GL Account Category",
                Memo = "",
                Result = audits
            });
            return Ok(auditResult);
        }
    }
}