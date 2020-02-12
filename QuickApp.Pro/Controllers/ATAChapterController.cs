using System;
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

      

        [HttpGet("Get")]
     
        public IActionResult Get()
        {

            try
            {
                var allATAMaininfo = _unitOfWork.ATAMains.GetAllATAMainnData();
                if (allATAMaininfo.Count() > 0)
                    return Ok(allATAMaininfo);
                else
                    return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
             

        }
        [HttpGet("GetAll")]
      
        public IActionResult GetAll()
        {
            try
            {
                var allATAMaininfo = _unitOfWork.ATAMains.GetAllATAMainData();
                if (allATAMaininfo.Count() > 0)
                    return Ok(allATAMaininfo);
                else
                    return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }

        }
        [HttpGet("ataauditHistoryById/{id}")]
        [Produces(typeof(List<ATAChapterAudit>))]
        public IActionResult GetAuditHostoryById(long id)
        {
           

            try
            {
                var result = _unitOfWork.ATAChapter.GetATAChapterHistory(id);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }



        }

        [HttpPost("actions")]
        public IActionResult CreateAction([FromBody] ATAChapter ataMainViewModel)
        {
            try
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
                    ataMainobject.IsActive = true;
                    ataMainobject.IsDeleted = false;
                    ataMainobject.CreatedDate = DateTime.Now;
                    ataMainobject.UpdatedDate = DateTime.Now;
                    ataMainobject.CreatedBy = ataMainViewModel.CreatedBy;
                    ataMainobject.UpdatedBy = ataMainViewModel.UpdatedBy;
                    _unitOfWork.ATAChapter.Add(ataMainobject);
                    _unitOfWork.SaveChanges();

                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);

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


        [HttpDelete("deleteATAMAIN/{id}")]
        [Produces(typeof(ATAChapterViewModel))]
        public IActionResult DeleteAction(long id)
        {
            try
            {
                var existingResult = _unitOfWork.ATAChapter.GetSingleOrDefault(c => c.ATAChapterId == id);
                existingResult.IsDeleted = true;
                existingResult.UpdatedDate = DateTime.Now;
                _unitOfWork.ATAChapter.Update(existingResult);
                //_unitOfWork.ATAMains.Remove(existingResult);

                _unitOfWork.SaveChanges();

                return Ok(id);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpGet("atachapterhistory")]
        public IActionResult GetATAChapterHistory(long ataChapterId)
        {
            var result = _unitOfWork.ATAChapter.GetATAChapterHistory(ataChapterId);//getting List Here
            return Ok(result);
        }

        [HttpPost("UploadataChapterCustomData")]
        public IActionResult UploadataChapterCustomData()
        {
            

          var result  =  _unitOfWork.ATAChapter.UploadCustomData(Request.Form.Files[0]);
            return Ok(result);
        }
    }




}

   