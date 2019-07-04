using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/AircraftManufacturer")]
    public class AircraftManufacturerController : Controller
    {
       
            #region Private Members

            private IUnitOfWork unitOfWork;

            #endregion Private Members

            #region Constructor

            public AircraftManufacturerController(IUnitOfWork unitOfWork)
            {
                this.unitOfWork = unitOfWork;
            }

            #endregion Constructor

            #region Public Methods

            [HttpGet("getAll")]
            public IActionResult getAllAircraftManufacturer()
            {
                var aircraftManufacturer = unitOfWork.Repository<AircraftType>().GetAll().Where(x => (x.IsDeleted != true && x.IsDeleted == null )).OrderBy(x => x.AircraftTypeId);
                return Ok(aircraftManufacturer);
            }

            [HttpGet("getById/{id}")]
            public IActionResult getAircraftManufacturerById(long id)
            {
                var aircraftManufacturer = unitOfWork.Repository<AircraftType>().Find(x => x.AircraftTypeId == id && x.IsDeleted != true);
                return Ok(aircraftManufacturer);
            }

            [HttpPost("add")]
            public IActionResult addAircraftManufacturer([FromBody]AircraftType aircraftmanufacturer)
            {
                if (aircraftmanufacturer != null)
                {
                    if (ModelState.IsValid)
                    {
                    aircraftmanufacturer.IsActive = true;
                    aircraftmanufacturer.CreatedDate = DateTime.Now;
                    aircraftmanufacturer.UpdatedDate = null;
                    aircraftmanufacturer.MasterCompanyId = 1;
                        unitOfWork.Repository<AircraftType>().Add(aircraftmanufacturer);
                        unitOfWork.SaveChanges();
                        return Ok(aircraftmanufacturer);
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
            public IActionResult updateAircraftManufacturer([FromBody]AircraftType aircraftmanufacturer)
            {
                if (aircraftmanufacturer != null)
                {
                    if (ModelState.IsValid)
                    {
                        aircraftmanufacturer.UpdatedDate = DateTime.Now;
                        unitOfWork.Repository<AircraftType>().Update(aircraftmanufacturer);
                        unitOfWork.SaveChanges();
                        return Ok(aircraftmanufacturer);
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
            public IActionResult removeAircraftManufacturerById(long id)
            {
                var aircraftmanufacturer = unitOfWork.Repository<AircraftType>().Find(x => x.AircraftTypeId == id).FirstOrDefault();
                if (aircraftmanufacturer != null)
                {
                    aircraftmanufacturer.UpdatedDate = DateTime.Now;
                    aircraftmanufacturer.IsDeleted = true;
                    unitOfWork.Repository<AircraftType>().Update(aircraftmanufacturer);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }

            [HttpPut("updateActive/{id}")]
            public IActionResult UpdateAircraftManufacturer(long id, [FromBody] AircraftType aircraftmanufacturer)
            {
                if (ModelState.IsValid)
                {
                    if (aircraftmanufacturer != null)
                    {
                        var existingResult = unitOfWork.Repository<AircraftType>().Find(x => x.AircraftTypeId == id).FirstOrDefault();
                        aircraftmanufacturer.UpdatedDate = DateTime.Now;
                        existingResult.IsActive = aircraftmanufacturer.IsActive;
                        unitOfWork.Repository<AircraftType>().Update(aircraftmanufacturer);
                        unitOfWork.SaveChanges();
                        return Ok();
                    }
                }
                return Ok(ModelState);
            }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<AircraftTypeAudit>()
                .Find(x => x.AircraftTypeId == id)
                .OrderByDescending(x => x.AircraftTypeAuditId);

            var auditResult = new List<AuditResult<AircraftTypeAudit>>();

            auditResult.Add(new AuditResult<AircraftTypeAudit> { AreaName = "Aircraft Manufacturer Type", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetAircraftManufacturer([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = (pageIndex / pageListPerPage) + 1;
            var data = DAL.Common.PaginatedList<AircraftType>.Create(unitOfWork.aircraftType.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods


    }
}
