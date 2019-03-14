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

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }
    }
}
