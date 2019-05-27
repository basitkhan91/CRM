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

        [HttpGet("getAll")]
        public IActionResult getAllManualJournel()
        {
            var journel = unitOfWork.Repository<JournalManual>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.ID);
            return Ok(journel);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getManualJournelById(long id)
        {
            var journel = unitOfWork.Repository<JournalManual>().Find(x => x.ID == id && x.IsDeleted != true);
            return Ok(journel);
        }

        [HttpPost("add")]
        public IActionResult AddManualJournel([FromBody]JournalManual journelData,JournalBatch journalBatch)
        {
            if (journelData != null)
            {
                if (ModelState.IsValid)
                {
                    journelData.IsActive = true;
                    journelData.CreatedDate = DateTime.Now;
                    journelData.UpdatedDate = null;
                    journelData.MasterCompanyId = 1;
                    journelData.IsManual = true;
                    unitOfWork.Repository<JournalManual>().Add(journelData);
                    unitOfWork.SaveChanges();

                    if (journelData.ID != 0)
                    {
                        journelData.JournalManualBatchNumber = journelData.ID;
                        unitOfWork.Repository<JournalManual>().Update(journelData);
                        unitOfWork.SaveChanges();
                    }

                    if (journelData != null)
                    {
                        journalBatch.JournalBatchNumber = journelData.JournalManualBatchNumber;
                        journalBatch.JournalBatchName = journelData.JournalManualBatchName;
                        journalBatch.JournalBatchDescription = journelData.JournalManualBatchDescription;
                        journalBatch.GLAccountId = journelData.GLAccountId;
                        journalBatch.JournalSourceId = 1;
                        journalBatch.JournalTypeId = journelData.JournalManualTypeId;
                        journalBatch.JournalPeriodName = journelData.JournalManualPeriodName;
                        journalBatch.LocalCurrencyId = journelData.JournalManualLocalCurrencyId;
                        journalBatch.LocalDebitAmount = journelData.JournalManualLocalDebitCurrency;
                        journalBatch.LocalCreditAmount = journelData.JournalManualLocalCreditCurrency;
                        journalBatch.ReportingCurrencyId = journelData.JournalManualReportingCurrencyId;
                        journalBatch.ReportingDebitAmount = journelData.JournalManualReposrtingDebitCurrency;

                        journalBatch.ReportingCreditAmount = journelData.JournalManualReposrtingCreditCurrency;
                        journalBatch.IsReversing = journelData.isreversing;
                        journalBatch.IsRecurring = journelData.isrecurring;
                        journalBatch.MasterCompanyId = journelData.MasterCompanyId;
                        //journalBatch.createdBy = journelData.CreatedBy;
                        journalBatch.UpdatedBy = journelData.UpdatedBy;
                        journalBatch.CreatedDate = journelData.CreatedDate;
                        journalBatch.UpdatedDate = journelData.UpdatedDate;
                        journalBatch.IsDeleted = journelData.IsDeleted;
                        journalBatch.IsActive = journelData.IsActive;

                        unitOfWork.Repository<JournalBatch>().Add(journalBatch);
                        unitOfWork.SaveChanges();
                    }
                    return Ok(journelData);
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
        public IActionResult updateManualJournel([FromBody]JournalManual journel)
        {
            if (journel != null)
            {
                if (ModelState.IsValid)
                {
                    journel.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<JournalManual>().Update(journel);
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

        [HttpGet("removeById/{id}")]
        public IActionResult removeManualJournelById(long id)
        {
            var journel = unitOfWork.Repository<JournalManual>().Find(x => x.ID == id).FirstOrDefault();
            if (journel != null)
            {
                journel.UpdatedDate = DateTime.Now;
                journel.IsDeleted = true;
                unitOfWork.Repository<JournalManual>().Update(journel);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateActive/{id}")]
        public IActionResult updateManualJournelActive(long id, [FromBody] JournalManual journel)
        {
            if (ModelState.IsValid)
            {
                if (journel != null)
                {
                    var existingResult = unitOfWork.Repository<JournalManual>().Find(x => x.ID == id).FirstOrDefault();
                    journel.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = journel.IsActive;
                    unitOfWork.Repository<JournalManual>().Update(journel);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        //[HttpGet("audits/{id}")]
        //public IActionResult AuditDetails(long id)
        //{
        //    var audits = unitOfWork.Repository<JournalManual>()
        //        .Find(x => x.Id == id)
        //        .OrderByDescending(x => x.AssetStatusAuditId);

        //    var auditResult = new List<AuditResult<AssetStatusAudit>>();

        //    auditResult.Add(new AuditResult<AssetStatusAudit> { AreaName = "Journel Status", Result = audits.ToList() });

        //    return Ok(auditResult);
        //}

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
