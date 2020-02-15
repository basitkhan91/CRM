using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/AircraftModel")]
    public class AircraftModelController : Controller
    {

        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AircraftModelController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAllAircraftModel()
        {
            var aircraftModels = unitOfWork.aircraftModel.GetAllAircraftModel().OrderBy(p=>p.ModelName);
            //var aircraftModels = unitOfWork.Repository<AircraftModel>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AircraftModelId);
            return Ok(aircraftModels);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAircraftModelById(long id)
        {
            var aircraftModel = unitOfWork.Repository<AircraftModel>().Find(x => x.AircraftModelId == id && x.IsDeleted != true);
            return Ok(aircraftModel);
        }

        [HttpPost("add")]
        public IActionResult addAircraftModel([FromBody]AircraftModel aircraftModel)
        {
            if (aircraftModel != null)
            {
                if (ModelState.IsValid)
                {
                    aircraftModel.IsActive = true;
                    aircraftModel.CreatedDate = DateTime.Now;
                    aircraftModel.UpdatedDate = DateTime.Now;
                    aircraftModel.IsDeleted = false;
                    aircraftModel.MasterCompanyId = 1;
                    unitOfWork.Repository<AircraftModel>().Add(aircraftModel);
                    unitOfWork.SaveChanges();
                    return Ok(aircraftModel);
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
        public IActionResult updateAircraftModel([FromBody]AircraftModel aircraftModel)
        {
            if (aircraftModel != null)
            {
                if (ModelState.IsValid)
                {
                    aircraftModel.UpdatedDate = DateTime.Now;
                    aircraftModel.IsActive = aircraftModel.IsActive;
                    aircraftModel.IsDeleted = false;
                    aircraftModel.MasterCompanyId = 1;
                    unitOfWork.Repository<AircraftModel>().Update(aircraftModel);
                    unitOfWork.SaveChanges();
                    return Ok(aircraftModel);
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
        public IActionResult removeAircraftModelById(long id)
        {
            var aircraftModel = unitOfWork.Repository<AircraftModel>().Find(x => x.AircraftModelId == id).FirstOrDefault();
            if (aircraftModel != null)
            {
                aircraftModel.UpdatedDate = DateTime.Now;
                aircraftModel.IsDeleted = true;
                unitOfWork.Repository<AircraftModel>().Update(aircraftModel);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateActive/{id}")]
        public IActionResult UpdateActive(long id, [FromBody] AircraftModel aircraftModel)
        {
            if (ModelState.IsValid)
            {
                if (aircraftModel != null)
                {
                    var existingResult = unitOfWork.Repository<AircraftModel>().Find(x => x.AircraftModelId == id).FirstOrDefault();
                    existingResult.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = aircraftModel.IsActive;
                    existingResult.IsDeleted = false;
                    unitOfWork.Repository<AircraftModel>().Update(existingResult);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            //var audits = unitOfWork.Repository<AircraftModelAudit>()
            //    .Find(x => x.AircraftModelId == id)
            //    .OrderByDescending(x => x.AircraftModelId);

            //var auditResult = new List<AuditResult<AircraftModelAudit>>();

            //auditResult.Add(new AuditResult<AircraftModelAudit> { AreaName = "Aircraft Model", Result = audits.ToList() });

            //return Ok(auditResult);
            var aircraftModels = unitOfWork.aircraftModel.GetAuditHistory(id);
            return Ok(aircraftModels);

        }


        [HttpGet("getModelsByManufacturerId/{id}")]
        public IActionResult getAircraftModelsByManufacturerId(string id)
        {

			//var aircraftModel = unitOfWork.Repository<AircraftModel>().Find(x => x.AircraftTypeId == id && x.IsDeleted != true);
			var aircraftModel = unitOfWork.aircraftModel.GetAllAircraftModelData(id);
			return Ok(aircraftModel);
		}

        [HttpPost("pagination")]
        public IActionResult GetAircraftModel([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = (pageIndex / pageListPerPage)+1;
            var data = DAL.Common.PaginatedList<AircraftModel>.Create(unitOfWork.aircraftModel.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }

        [HttpGet("getLandingPage")]
        public IActionResult getAllLandingPageAircraftModel()
        {
            var aircraftModels = unitOfWork.aircraftModel.GetAllAircraftModel();//getting List Here
            var data = aircraftModels.Skip(0).Take(10).OrderByDescending(c => c.AircraftModelId).ToList();
            return Ok(data);
        }

        [HttpGet("aircraftmodelhistory")]
        public IActionResult GetAircraftModelHistory(long aircraftModelId)
        {
            var result = unitOfWork.aircraftModel.GetAircraftModelHistory(aircraftModelId);//getting List Here
            return Ok(result);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
