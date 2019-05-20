using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/Journals")]
    public class JournalsController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members


        #region Constructor

        public JournalsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllJournel")]
        public IActionResult getAllJournel()
        {
            var journel = unitOfWork.Repository<AssetStatus>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.Id);
            return Ok(journel);
        }

        [HttpGet("getJournelById/{id}")]
        public IActionResult getJournelById(long id)
        {
            var journel = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id && x.IsDeleted != true);
            return Ok(journel);
        }

        [HttpPost("addJournel")]
        public IActionResult addJournel([FromBody]AssetStatus journel)
        {
            if (journel != null)
            {
                if (ModelState.IsValid)
                {
                    journel.IsActive = true;
                    journel.CreatedDate = DateTime.Now;
                    journel.UpdatedDate = null;
                    journel.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetStatus>().Add(journel);
                    unitOfWork.SaveChanges();
                    return Ok(journel);
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

        [HttpPost("updateJournel")]
        public IActionResult updateJournel([FromBody]AssetStatus journel)
        {
            if (journel != null)
            {
                if (ModelState.IsValid)
                {
                    journel.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetStatus>().Update(journel);
                    unitOfWork.SaveChanges();
                    return Ok(journel);
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

        [HttpGet("removeJournelById/{id}")]
        public IActionResult removeJournelById(long id)
        {
            var journel = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id).FirstOrDefault();
            if (journel != null)
            {
                journel.UpdatedDate = DateTime.Now;
                journel.IsDeleted = true;
                unitOfWork.Repository<AssetStatus>().Update(journel);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateJournelActive/{id}")]
        public IActionResult updateJournelActive(long id, [FromBody] AssetStatus journel)
        {
            if (ModelState.IsValid)
            {
                if (journel != null)
                {
                    var existingResult = unitOfWork.Repository<AssetStatus>().Find(x => x.Id == id).FirstOrDefault();
                    journel.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = journel.IsActive;
                    unitOfWork.Repository<AssetStatus>().Update(journel);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        [HttpGet("auditsJournel/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<AssetStatusAudit>()
                .Find(x => x.Id == id)
                .OrderByDescending(x => x.AssetStatusAuditId);

            var auditResult = new List<AuditResult<AssetStatusAudit>>();

            auditResult.Add(new AuditResult<AssetStatusAudit> { AreaName = "Journel Status", Result = audits.ToList() });

            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
