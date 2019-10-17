using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/InterCompanySetup")]
    public class InterCompanySetupController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public InterCompanySetupController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var result = unitOfWork.Repository<InterCompanySetup>()
                                .GetAll().Where(x => x.IsActive == true && x.IsDeleted == false)
                                .OrderByDescending(x => x.InterCompanySetupId)
                                .ToList();
            return Ok(result);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            var result = unitOfWork.Repository<InterCompanySetup>().Find(x => x.InterCompanySetupId == id);
            return Ok(result);
        }

        [HttpPost("add")]
        public IActionResult addAsset([FromBody]InterCompanySetup interCompanySetup)
        {
            if (ModelState.IsValid)
            {
                var existingResult = unitOfWork.Repository<InterCompanySetup>().Find(x => x.AffiliateCode == interCompanySetup.AffiliateCode ||
                x.AffiliateName == interCompanySetup.AffiliateName);
                if (existingResult.Count() <= 0)
                {
                    interCompanySetup.IsActive = true;
                    interCompanySetup.IsDeleted = false;
                    interCompanySetup.CreatedDate = DateTime.Now;
                    interCompanySetup.CreatedBy = "Admin"; // TODO : get this from UI.
                    interCompanySetup.UpdatedDate = null;

                    unitOfWork.Repository<InterCompanySetup>().Add(interCompanySetup);
                    unitOfWork.SaveChanges();
                    return Ok(interCompanySetup);
                }
                else
                {
                    return BadRequest(new Exception("Intercompany setup for code : " + interCompanySetup.AffiliateCode + " and Name : " + interCompanySetup.AffiliateName + " already exists"));
                }
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }

        }

        [HttpPost("update")]
        public IActionResult updateAsset([FromBody]InterCompanySetup interCompanySetup)
        {
            if (ModelState.IsValid)
            {
                interCompanySetup.UpdatedDate = DateTime.Now;
                unitOfWork.Repository<InterCompanySetup>().Update(interCompanySetup);
                unitOfWork.SaveChanges();
                return Ok(interCompanySetup);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeAssetById(long id)
        {
            var interCompanySetup = unitOfWork.Repository<InterCompanySetup>().Find(x => x.InterCompanySetupId == id).FirstOrDefault();
            if (interCompanySetup != null)
            {
                interCompanySetup.UpdatedDate = DateTime.Now;
                interCompanySetup.IsDeleted = true;
                unitOfWork.Repository<InterCompanySetup>().Update(interCompanySetup);
                unitOfWork.SaveChanges();
                return Ok(interCompanySetup);
            }
            else
            {
                return BadRequest(new Exception("Something went wrong"));
            }
        }

        [HttpPut("updateActive/{id}")]
        public IActionResult UpdateActive(long id, [FromBody] AssetStatus asset)
        {
            if (ModelState.IsValid)
            {
                var existingResult = unitOfWork.Repository<AssetStatus>().Find(x => x.AssetStatusId == id).FirstOrDefault();
                asset.UpdatedDate = DateTime.Now;
                existingResult.IsActive = asset.IsActive;
                unitOfWork.Repository<AssetStatus>().Update(asset);
                unitOfWork.SaveChanges();
                return Ok(asset);
            }
            else
            {
                return BadRequest(ModelState.Values.FirstOrDefault().Errors);
            }
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<InterCompanySetup>()
                .Find(x => x.InterCompanySetupId == id)
                .OrderByDescending(x => x.InterCompanySetupId);

            var auditResult = new List<AuditResult<InterCompanySetup>>();

            auditResult.Add(new AuditResult<InterCompanySetup> { AreaName = "Asset Status", Result = audits.ToList() });

            return Ok(auditResult);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }


}