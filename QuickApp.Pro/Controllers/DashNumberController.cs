using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/DashNumber")]
    public class DashNumberController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public DashNumberController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAllDashNumbers()
        {
            var dashNumber = unitOfWork.DashNumberRepository.GetDashNumbers();
            //var dashNumber = unitOfWork.Repository<AircraftDashNumber>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.DashNumberId);
            return Ok(dashNumber);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getDashNumberById(long id)
        {
            var asset = unitOfWork.Repository<AircraftDashNumber>().Find(x => x.DashNumberId == id && x.IsDeleted != true);
            return Ok(asset);
        }

        [HttpPost("add")]
        public IActionResult addDashNumber([FromBody]AircraftDashNumber dashNumber)
        {
            if (dashNumber != null)
            {
                if (ModelState.IsValid)
                {
                    dashNumber.IsActive = true;
                    dashNumber.CreatedDate = DateTime.Now;
                    dashNumber.UpdatedDate = null;
                    dashNumber.MasterCompanyId = 1;
                    unitOfWork.Repository<AircraftDashNumber>().Add(dashNumber);
                    unitOfWork.SaveChanges();
                    return Ok(dashNumber);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
          
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost("update")]
        public IActionResult updateDashNumber([FromBody]AircraftDashNumber dashNumber)
        {
            if (dashNumber != null)
            {
                if (ModelState.IsValid)
                {
                    dashNumber.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AircraftDashNumber>().Update(dashNumber);
                    unitOfWork.SaveChanges();
                    return Ok(dashNumber);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeDashNumberById(long id)
        {
            var dashNumber = unitOfWork.Repository<AircraftDashNumber>().Find(x => x.DashNumberId == id).FirstOrDefault();
            if (dashNumber != null)
            {
                dashNumber.UpdatedDate = DateTime.Now;
                dashNumber.IsDeleted = true;
                unitOfWork.Repository<AircraftDashNumber>().Update(dashNumber);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("updateActive/{id}")]
        public IActionResult UpdateActive(long id, [FromBody] AircraftDashNumber dashNumber)
        {
            if (ModelState.IsValid)
            {
                if (dashNumber != null)
                {
                    var existingResult = unitOfWork.Repository<AircraftDashNumber>().Find(x => x.DashNumberId == id).FirstOrDefault();
                    dashNumber.UpdatedDate = DateTime.Now;
                    existingResult.IsActive = dashNumber.IsActive;
                    unitOfWork.Repository<AircraftDashNumber>().Update(dashNumber);
                    unitOfWork.SaveChanges();
                    return Ok();
                }
            }
            return Ok(ModelState);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<AircraftDashNumberAudit>()
                .Find(x => x.DashNumberId == id)
                .OrderByDescending(x => x.DashNumberId);

            var auditResult = new List<AuditResult<AircraftDashNumberAudit>>();

            auditResult.Add(new AuditResult<AircraftDashNumberAudit> { AreaName = "Dash Number", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetAircraftDashNumber([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.limit;
            //var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = paginate.page;
            //var pageCount = (pageIndex / pageListPerPage) + 1;
            var data = DAL.Common.PaginatedList<AircraftDashNumber>.Create(unitOfWork.DashNumberRepository.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }

        [HttpGet("getDashListByModel_Type_Dash_IDS/{Mid}/{Tid}/{Did}")]
        [Produces(typeof(List<ItemMasterViewModel>))]
        public IActionResult GetDashList(string Mid, long Tid, string Did)
        {
            var result = unitOfWork.DashNumberRepository.getDashListByIDS(Mid, Tid, Did);
            return Ok(result);
        }
        [HttpGet("GetDashNoBy_Model_TypeID/{Mid}/{Tid}")]
        public IActionResult GetDashNumb(string Mid, long Tid)
        {
            var result = unitOfWork.DashNumberRepository.GetDashNoByID(Mid, Tid);
            return Ok(result);
        }
        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
