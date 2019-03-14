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
    public class UnitOfMeasureController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public UnitOfMeasureController(IUnitOfWork unitOfWork, ILogger<UnitOfMeasureController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }


        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("UnitOfMeasure", id); //.GetAllCustomersData();


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
        [HttpGet("Get")]
        [Produces(typeof(List<UnitOfMeasureViewModel>))]
        public IActionResult Get()
        {
            var allUnitOfMeasureinfo = _unitOfWork.UnitOfMeasure.getUnitOfMeasureData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<UnitOfMeasureViewModel>>(allUnitOfMeasureinfo));

        }
        [HttpPost("unitofmeasure")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] UnitOfMeasureViewModel unitOfMeasureViewModel)
        {
            if (ModelState.IsValid)
            {
                if (unitOfMeasureViewModel == null)
                    return BadRequest($"{nameof(unitOfMeasureViewModel)} cannot be null");

                DAL.Models.UnitOfMeasure unitOfMeasureobject = new DAL.Models.UnitOfMeasure();
                unitOfMeasureobject.Description = unitOfMeasureViewModel.Description;
                unitOfMeasureobject.ShortName = unitOfMeasureViewModel.ShortName;
                unitOfMeasureobject.Standard = unitOfMeasureViewModel.Standard;
                unitOfMeasureobject.Memo = unitOfMeasureViewModel.Memo;
                unitOfMeasureobject.MasterCompanyId = unitOfMeasureViewModel.MasterCompanyId;
                unitOfMeasureobject.IsActive = unitOfMeasureViewModel.IsActive;
                unitOfMeasureobject.CreatedDate = DateTime.Now;
                unitOfMeasureobject.UpdatedDate = DateTime.Now;
                unitOfMeasureobject.CreatedBy = unitOfMeasureViewModel.CreatedBy;
                unitOfMeasureobject.UpdatedBy = unitOfMeasureViewModel.UpdatedBy;
                _unitOfWork.UnitOfMeasure.Add(unitOfMeasureobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("unitofmeasure/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] UnitOfMeasureViewModel unitOfMeasureViewModel)
        {

            if (ModelState.IsValid)
            {
                if (unitOfMeasureViewModel == null)
                    return BadRequest($"{nameof(unitOfMeasureViewModel)} cannot be null");

                var existingResult = _unitOfWork.UnitOfMeasure.GetSingleOrDefault(c => c.UnitOfMeasureId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = unitOfMeasureViewModel.UpdatedBy;
                existingResult.Description = unitOfMeasureViewModel.Description;
                existingResult.ShortName = unitOfMeasureViewModel.ShortName;
                existingResult.Memo = unitOfMeasureViewModel.Memo;
                existingResult.Standard = unitOfMeasureViewModel.Standard;
                existingResult.IsActive = unitOfMeasureViewModel.IsActive;
                existingResult.MasterCompanyId = unitOfMeasureViewModel.MasterCompanyId;

                _unitOfWork.UnitOfMeasure.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("unitofmeasure/{id}")]
        [Produces(typeof(UnitOfMeasureViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.UnitOfMeasure.GetSingleOrDefault(c => c.UnitOfMeasureId == id);
            existingResult.IsDelete = true;
            _unitOfWork.UnitOfMeasure.Update(existingResult);
            //_unitOfWork.UnitOfMeasure.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

    }




}