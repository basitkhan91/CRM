﻿using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]

    public class GlAccountClassController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public GlAccountClassController(IUnitOfWork unitOfWork, ILogger<GlAccountClassController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<GLAccountClassViewModel>))]
        public IActionResult Get()
        {
            var allGlAccountClass = _unitOfWork.GLAccountClass.GetAllGLAccountClassData(); 
            return Ok(Mapper.Map<IEnumerable<GLAccountClassViewModel>>(allGlAccountClass));

        }
        
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GLAccountClass", id); 

            try
            {
                var resul1 = Mapper.Map<IEnumerable<GLAccountClassViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("glaccountclasspost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] GLAccountClassViewModel GLAccountClassViewModel)
        {
            if (ModelState.IsValid)
            {
                if (GLAccountClassViewModel == null)
                    return BadRequest($"{nameof(GLAccountClassViewModel)} cannot be null");

                DAL.Models.GLAccountClass glaccountclassobject = new DAL.Models.GLAccountClass();
                glaccountclassobject.GLAccountClassId = GLAccountClassViewModel.GLAccountClassId;
                glaccountclassobject.GLCID = GLAccountClassViewModel.GLCID ;
                glaccountclassobject.GLAccountClassName = GLAccountClassViewModel.GLAccountClassName;
                glaccountclassobject.MasterCompanyId = GLAccountClassViewModel.MasterCompanyId;
                glaccountclassobject.IsActive = GLAccountClassViewModel.IsActive;
                glaccountclassobject.CreatedDate = DateTime.Now;
                glaccountclassobject.UpdatedDate = DateTime.Now;
                glaccountclassobject.CreatedBy = GLAccountClassViewModel.CreatedBy;
                glaccountclassobject.UpdatedBy = GLAccountClassViewModel.UpdatedBy;
                _unitOfWork.GLAccountClass.Add(glaccountclassobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("glaccountclasspost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] GLAccountClassViewModel GLAccountClassViewModel)
        {

            if (ModelState.IsValid)
            {
                if (GLAccountClassViewModel == null)
                    return BadRequest($"{nameof(GLAccountClassViewModel)} cannot be null");

                var existingResult = _unitOfWork.GLAccountClass.GetSingleOrDefault(c => c.GLAccountClassId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = GLAccountClassViewModel.UpdatedBy;
                existingResult.GLAccountClassId = GLAccountClassViewModel.GLAccountClassId;
                existingResult.GLCID = GLAccountClassViewModel.GLCID;
                existingResult.GLAccountClassName = GLAccountClassViewModel.GLAccountClassName;
                existingResult.IsActive = GLAccountClassViewModel.IsActive;
                existingResult.MasterCompanyId = GLAccountClassViewModel.MasterCompanyId;

                _unitOfWork.GLAccountClass.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("glaccountclasspost/{id}")]
        [Produces(typeof(GLAccountClassViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.GLAccountClass.GetSingleOrDefault(c => c.GLAccountClassId == id);
            existingResult.IsDelete = true;
            _unitOfWork.GLAccountClass.Update(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<GLAccountClassAudit>()
                .Find(x => x.GLAccountClassId == id)
                .OrderByDescending(x => x.GLAccountClassAuditId);

            var auditResult = new List<AuditResult<GLAccountClassAudit>>();

            auditResult.Add(new AuditResult<GLAccountClassAudit> { AreaName = "GL Account Class", Result = audits.ToList() });

            return Ok(auditResult);
        }


        [HttpPost("pagination")]
        public IActionResult GetGlAccount([FromBody]GlAccountClassPaginationViewModel paginate)
        {
            GetData getData = new GetData();
            IQueryable<GlAccountClassPaginationViewModel> queryable = null;
            List<GlAccountClassPaginationViewModel> glAccountClassList = new List<GlAccountClassPaginationViewModel>();
            GlAccountClassPaginationViewModel glAccountClass = null;
            if (!string.IsNullOrEmpty(paginate.GLAccountClassName)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var glAccountClasss = _unitOfWork.glAccountClass;
                var glAccountClasss = _unitOfWork.GLAccountClass.GetAllGLAccountClassData();
                foreach (var item in glAccountClasss)
                {
                    glAccountClass = new GlAccountClassPaginationViewModel();
                    glAccountClass.GLAccountClassId = item.GLAccountClassId;
                    glAccountClass.GLAccountClassName = item.GLAccountClassName;
                    glAccountClass.GLCID = item.GLCID;
                    glAccountClass.CreatedDate = item.CreatedDate;
                    glAccountClass.CreatedBy = item.CreatedBy;
                    glAccountClass.UpdatedDate = item.UpdatedDate;
                    glAccountClass.UpdatedBy = item.UpdatedBy;
                    glAccountClass.IsActive = item.IsActive;
                    glAccountClassList.Add(glAccountClass);
                }
                if (!string.IsNullOrEmpty(paginate.GLAccountClassName))
                {
                    glAccountClassList = glAccountClassList.Where(c => c.GLAccountClassName != null && c.GLAccountClassName.ToUpper().Contains(paginate.GLAccountClassName.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    glAccountClassList = glAccountClassList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    glAccountClassList = glAccountClassList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = glAccountClassList.Count();
            }
            else
            {
                var glAccountClasss = _unitOfWork.GLAccountClass.GetAllGLAccountClassData();
                foreach (var item in glAccountClasss)
                {
                    glAccountClass = new GlAccountClassPaginationViewModel();
                    glAccountClass.GLAccountClassId = item.GLAccountClassId;
                    glAccountClass.GLAccountClassName = item.GLAccountClassName;
                    glAccountClass.GLCID = item.GLCID;
                    glAccountClass.CreatedDate = item.CreatedDate;
                    glAccountClass.CreatedBy = item.CreatedBy;
                    glAccountClass.UpdatedDate = item.UpdatedDate;
                    glAccountClass.UpdatedBy = item.UpdatedBy;
                    glAccountClass.IsActive = item.IsActive;
                    glAccountClassList.Add(glAccountClass);
                }
                //glAccountClassList.Add(glAccountClass);
                getData.TotalRecordsCount = glAccountClassList.Count();
            }
            queryable = glAccountClassList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.GetLAccountClasses = DAL.Common.PaginatedList<GlAccountClassPaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }
    }

    public class GetData
    {
        public int TotalRecordsCount { get; set; }
        public List<GlAccountClassPaginationViewModel> GetLAccountClasses { get; set; }
    }
}

