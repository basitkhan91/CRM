using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;


namespace QuickApp.Pro.Controllers
{
    [Route("api/Batch")]
    public class BatchController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public BatchController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllBatch")]
        public IActionResult getAll()
        {
            var batch = unitOfWork.Repository<JournalBatch>().GetAll().OrderByDescending(x => x.ID);
            return Ok(batch);
        }


        [HttpGet("getById/{id}")]
        public IActionResult getDataBatchById(long id)
        {
            var batch = unitOfWork.Repository<JournalBatch>().Find(x => x.ID == id && x.IsDeleted != true);
            return Ok(batch);
        }

        [HttpPost("addBatch")]
        public IActionResult addBatchData([FromBody]JournalBatch batch)
        {
            if (batch != null)
            {
                if (ModelState.IsValid)
                {
                    batch.IsActive = true;
                    batch.CreatedDate = DateTime.Now;
                    batch.UpdatedDate = null;
                    batch.MasterCompanyId = 1;
                    unitOfWork.Repository<JournalBatch>().Add(batch);
                    unitOfWork.SaveChanges();
                    return Ok(batch);
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

        [HttpPost("updateBatch")]
        public IActionResult updateBatchData([FromBody]JournalBatch batch)
        {
            if (batch != null)
            {
                if (ModelState.IsValid)
                {
                    batch.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<JournalBatch>().Update(batch);
                    unitOfWork.SaveChanges();
                    return Ok(batch);
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

        [HttpGet("removeBatchById/{id}")]
        public IActionResult removeAssetDataById(long id)
        {
            var batch = unitOfWork.Repository<JournalBatch>().Find(x => x.ID == id).FirstOrDefault();
            if (batch != null)
            {
                batch.UpdatedDate = DateTime.Now;
                batch.IsDeleted = true;
                unitOfWork.Repository<JournalBatch>().Update(batch);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateBatchActive/{id}")]
        public IActionResult updateBatchDataActive(long id, [FromBody] JournalBatch batch)
        {
            if (ModelState.IsValid)
            {
                if (batch != null)
                {
                    var existingResult = unitOfWork.Repository<JournalBatch>().Find(x => x.ID == id).FirstOrDefault();
                    batch.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = batch.IsActive;
                    unitOfWork.Repository<JournalBatch>().Update(batch);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        //[HttpGet("auditsBatch/{id}")]
        //public IActionResult AuditDetails(long id)
        //{
        //    var audits = unitOfWork.Repository<AssetStatusAudit>()
        //        .Find(x => x.Id == id)
        //        .OrderByDescending(x => x.AssetStatusAuditId);

        //    var auditResult = new List<AuditResult<AssetStatusAudit>>();

        //    auditResult.Add(new AuditResult<AssetStatusAudit> { AreaName = "Batch Status", Result = audits.ToList() });

        //    return Ok(auditResult);
        //}

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
