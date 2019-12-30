using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class PercentageController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;


        public PercentageController(IUnitOfWork unitOfWork, ILogger<PercentageController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<PercentageViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.PercentageRepository.GetPercentages();
            var resul1 = Mapper.Map<IEnumerable<PercentageViewModel>>(result);
            return Ok(resul1);

        }

        [HttpPost("percentagepost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] PercentageViewModel PercentageViewModel)
        {
            if (ModelState.IsValid)
            {
                if (PercentageViewModel == null)
                    return BadRequest($"{nameof(PercentageViewModel)} cannot be null");

                DAL.Models.Percentage percentobject = new DAL.Models.Percentage();
                // percentobject.PercentId = PercentageViewModel.PercentId;
                percentobject.PercentValue = PercentageViewModel.PercentValue;
                percentobject.MasterCompanyId = PercentageViewModel.MasterCompanyId;
                percentobject.IsActive = PercentageViewModel.IsActive;
                percentobject.CreatedDate = DateTime.Now;
                percentobject.UpdatedDate = DateTime.Now;
                percentobject.CreatedBy = PercentageViewModel.CreatedBy;
                percentobject.UpdatedBy = PercentageViewModel.UpdatedBy;
                percentobject.IsDeleted = false;
                _unitOfWork.PercentageRepository.Add(percentobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }


        [HttpPut("percentagepost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody]  PercentageViewModel PercentageViewModel)
        {

            if (ModelState.IsValid)
            {
                if (PercentageViewModel == null)
                    return BadRequest($"{nameof(PercentageViewModel)} cannot be null");

                var existingResult = _unitOfWork.PercentageRepository.GetSingleOrDefault(c => c.PercentId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = PercentageViewModel.UpdatedBy;
                existingResult.PercentId = PercentageViewModel.PercentId;
                existingResult.PercentValue = PercentageViewModel.PercentValue;
                existingResult.IsActive = PercentageViewModel.IsActive;
                existingResult.MasterCompanyId = PercentageViewModel.MasterCompanyId;
                _unitOfWork.PercentageRepository.Update(existingResult);
                _unitOfWork.SaveChanges();
            }
            return Ok(ModelState);
        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<PercentageAudit>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            try
            {
                var result = _unitOfWork.PercentageRepository.GetpercentageAuditDetails(id);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
