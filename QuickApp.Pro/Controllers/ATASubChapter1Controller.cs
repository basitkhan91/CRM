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
    public class ATASubChapter1Controller : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public ATASubChapter1Controller(IUnitOfWork unitOfWork, ILogger<WorkflowActionController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ATASubChapterViewModel>))]
        public IActionResult Get()
        {
            //var result = _unitOfWork.ATASubChapter1s.GetAllATAMainnData(); //.GetAllCustomersData();
            var result = _context.ATASubChapter.Where(a=>a.IsDelete==false || a.IsDelete == null).OrderByDescending(c => c.ATASubChapterId).ToList();
            return Ok(result);

            //try
            //{
            //    var resul1 = Mapper.Map<IEnumerable<ATASubChapter1ViewModel>>(result);

            //    return Ok(resul1);
            //}
            //catch (Exception ex)
            //{

            //    throw;
            //}



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
        public IActionResult CreateAction([FromBody] ATASubChapterViewModel ataSubChapter1ViewModel)
        {
            if (ModelState.IsValid)
            {
                if (ataSubChapter1ViewModel == null)
                    return BadRequest($"{nameof(ataSubChapter1ViewModel)} cannot be null");

                DAL.Models.ATASubChapter ataSubChapter1object = new DAL.Models.ATASubChapter();
                ataSubChapter1object.ATASubChapterCode = ataSubChapter1ViewModel.ATASubChapterCode;
                ataSubChapter1object.Description = ataSubChapter1ViewModel.Description;
                ataSubChapter1object.Memo = ataSubChapter1ViewModel.Memo;
                ataSubChapter1object.MasterCompanyId = 1;
                ataSubChapter1object.ATAChapterId = ataSubChapter1ViewModel.ATAChapterId;
                ataSubChapter1object.IsActive = ataSubChapter1ViewModel.IsActive;
                ataSubChapter1object.CreatedDate = DateTime.Now;
                ataSubChapter1object.UpdatedDate = DateTime.Now;
                ataSubChapter1object.CreatedBy = ataSubChapter1ViewModel.CreatedBy;
                ataSubChapter1object.UpdatedBy = ataSubChapter1ViewModel.UpdatedBy;
                _unitOfWork.ATASubChapter.Add(ataSubChapter1object);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("actions/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ATASubChapterViewModel ataSubChapter1ViewModel)
        {

            if (ModelState.IsValid)
            {
                if (ataSubChapter1ViewModel == null)
                    return BadRequest($"{nameof(ataSubChapter1ViewModel)} cannot be null");

                var existingResult = _unitOfWork.ATASubChapter.GetSingleOrDefault(c => c.ATASubChapterId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();
                existingResult.ATAChapterId = ataSubChapter1ViewModel.ATAChapterId;

                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = ataSubChapter1ViewModel.UpdatedBy;
                existingResult.Description = ataSubChapter1ViewModel.Description;
                existingResult.Memo = ataSubChapter1ViewModel.Memo;
                existingResult.ATASubChapterCode = ataSubChapter1ViewModel.ATASubChapterCode;
                existingResult.IsActive = ataSubChapter1ViewModel.IsActive;
                existingResult.MasterCompanyId = 1;

                _unitOfWork.ATASubChapter.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("actions/{id}")]
        [Produces(typeof(ATASubChapterViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ATASubChapter.GetSingleOrDefault(c => c.ATASubChapterId == id);
            existingResult.IsDelete = true;
            _unitOfWork.ATASubChapter.Update(existingResult);
            //_unitOfWork.ATAMains.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

    }
}
