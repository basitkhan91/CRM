﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{  

    [Route("api/[controller]")]
    public class ATAMainController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ATAMainController(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        //[HttpGet("Get")]
        //[Produces(typeof(List<ATAChapterViewModel>))]
        //public IActionResult Get()
        //{
        //    var result = _unitOfWork.ATAMains.GetAllATAMainnData(); //.GetAllCustomersData();


        //    try
        //    {
        //        var resul1 = Mapper.Map<IEnumerable<ATAChapterViewModel>>(result);

        //        return Ok(resul1);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }



        //}

        [HttpGet("Get")]
       // [Produces(typeof(List<ATAChapterViewModel>))]
        public IActionResult Get()
        {
            var allATAMaininfo = _unitOfWork.ATAMains.GetAllATAMainnData();
            return Ok(allATAMaininfo);

        }

        [HttpGet("ataauditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ATAMain", id); //.GetAllCustomersData();


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

        [HttpPost("actions")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ATAChapterViewModel ataMainViewModel)
        {
            if (ModelState.IsValid)
            {
                if (ataMainViewModel == null)
                    return BadRequest($"{nameof(ataMainViewModel)} cannot be null");

                DAL.Models.ATAChapter ataMainobject = new DAL.Models.ATAChapter();
                ataMainobject.ATAChapterCategory = ataMainViewModel.ATAChapterCategory;
                ataMainobject.ATAChapterName = ataMainViewModel.ATAChapterName;
                ataMainobject.ATAChapterCode = ataMainViewModel.ATAChapterCode;
                ataMainobject.Memo = ataMainViewModel.Memo;
                ataMainobject.MasterCompanyId = 1;
                ataMainobject.IsActive = ataMainViewModel.IsActive;
                ataMainobject.CreatedDate = DateTime.Now;
                ataMainobject.UpdatedDate = DateTime.Now;
                ataMainobject.CreatedBy = ataMainViewModel.CreatedBy;
                ataMainobject.UpdatedBy = ataMainViewModel.UpdatedBy;
                _unitOfWork.ATAChapter.Add(ataMainobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("actions/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ATAChapterViewModel ataMainViewModel)
        {

            if (ModelState.IsValid)
            {
                if (ataMainViewModel == null)
                    return BadRequest($"{nameof(ataMainViewModel)} cannot be null");

                var existingResult = _unitOfWork.ATAChapter.GetSingleOrDefault(c => c.ATAChapterId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = ataMainViewModel.UpdatedBy;
                existingResult.ATAChapterName = ataMainViewModel.ATAChapterName;
                existingResult.ATAChapterCode = ataMainViewModel.ATAChapterCode;
                existingResult.Memo = ataMainViewModel.Memo;
                existingResult.ATAChapterCategory = ataMainViewModel.ATAChapterCategory;
                existingResult.IsActive = ataMainViewModel.IsActive;
                existingResult.MasterCompanyId = 1;

                _unitOfWork.ATAChapter.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("actions/{id}")]
        [Produces(typeof(ATAChapterViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ATAChapter.GetSingleOrDefault(c => c.ATAChapterId == id);
            existingResult.IsDelete = true;
            _unitOfWork.ATAChapter.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ATAChapterAudit>()
                .Find(x => x.ATAChapterId == id)
                .OrderByDescending(x => x.ATAChapterAuditId);

            var auditResult = new List<AuditResult<ATAChapterAudit>>();

            auditResult.Add(new AuditResult<ATAChapterAudit> { AreaName = "ATA Chapter", Result = audits.ToList() });

            return Ok(auditResult);
        }
        [HttpGet("GetATASUBS_BY_ATAMain_ID/{ChID}")]
        public IActionResult GetATASub(long ChID)
        {
            var result = _unitOfWork.ATAChapter.GetATASUBS(ChID);
            return Ok(result);
        }
        [HttpGet("GetMultiATASUBSBYATAMainID/{ChapterID}")]
        public IActionResult GetMultiATASub(string ChapterID)
        {
            var result = _unitOfWork.ATAChapter.GetMultiATASUBS(ChapterID);
            return Ok(result);
        }
    }




}

   