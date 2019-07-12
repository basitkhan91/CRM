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
        private readonly ApplicationDbContext _context;
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

        [HttpGet("audits/{Id}")]
        public IActionResult GetUnitOfMeasureAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<UnitOfMeasureAudit>()
                                .Find(x => x.UnitOfMeasureId == Id)
                                .OrderByDescending(x => x.UnitOfMeasureAuditId)
                                .ToList();

            var auditResult = new List<AuditResult<UnitOfMeasureAudit>>();

            auditResult.Add(new AuditResult<UnitOfMeasureAudit>
            {
                AreaName = "Unit Of Measure",
                Memo = "Unit Of Measure",
                Result = audits
            });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetUnitOfMeasure([FromBody]UnitOfMeasureSearchViewModel paginate)
        {
            GetData getData = new GetData();

            IQueryable<UnitOfMeasureModel> queryable = null;
            List<UnitOfMeasureModel> unitOfMeasureList = new List<UnitOfMeasureModel>();
            UnitOfMeasureModel unitOfMeasure = null;
            if (!string.IsNullOrEmpty(paginate.Description) 
                || !string.IsNullOrEmpty(paginate.ShortName)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.Standard)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var unitOfMeasures = _unitOfWork.UnitOfMeasure;
                var unitOfMeasures = _unitOfWork.UnitOfMeasure.getUnitOfMeasureData();
                foreach (var item in unitOfMeasures)
                {
                    unitOfMeasure = new UnitOfMeasureModel();
                    unitOfMeasure.UnitOfMeasureId = item.UnitOfMeasureId;
                    unitOfMeasure.Description = item.Description;
                    unitOfMeasure.ShortName = item.ShortName;
                    unitOfMeasure.Standard = item.Standard;
                    unitOfMeasure.Memo = item.Memo;
                    unitOfMeasure.CreatedDate = item.CreatedDate;
                    unitOfMeasure.CreatedBy = item.CreatedBy;
                    unitOfMeasure.UpdatedDate = item.UpdatedDate;
                    unitOfMeasure.UpdatedBy = item.UpdatedBy;
                    unitOfMeasure.IsActive = item.IsActive;
                    unitOfMeasureList.Add(unitOfMeasure);
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    unitOfMeasureList = unitOfMeasureList.Where(c => c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.ShortName))
                {
                    unitOfMeasureList = unitOfMeasureList.Where(c => c.ShortName.ToUpper().Contains(paginate.ShortName.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Standard))
                {
                    unitOfMeasureList = unitOfMeasureList.Where(c => c.Standard != null &&  c.Standard.ToUpper().Contains(paginate.Standard.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    unitOfMeasureList = unitOfMeasureList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    unitOfMeasureList = unitOfMeasureList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    unitOfMeasureList = unitOfMeasureList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = unitOfMeasureList.Count();
            }
            else
            {
                var unitOfMeasures = _unitOfWork.UnitOfMeasure.getUnitOfMeasureData();
                foreach (var item in unitOfMeasures)
                {
                    unitOfMeasure = new UnitOfMeasureModel();
                    unitOfMeasure.UnitOfMeasureId = item.UnitOfMeasureId;
                    unitOfMeasure.Description = item.Description;
                    unitOfMeasure.ShortName = item.ShortName;
                    unitOfMeasure.Standard = item.Standard;
                    unitOfMeasure.Memo = item.Memo;
                    unitOfMeasure.CreatedDate = item.CreatedDate;
                    unitOfMeasure.CreatedBy = item.CreatedBy;
                    unitOfMeasure.UpdatedDate = item.UpdatedDate;
                    unitOfMeasure.UpdatedBy = item.UpdatedBy;
                    unitOfMeasure.IsActive = item.IsActive;
                    unitOfMeasureList.Add(unitOfMeasure);
                    getData.TotalRecordsCount = unitOfMeasureList.Count();
                }
                unitOfMeasureList.Add(unitOfMeasure);
                
            }
            queryable = unitOfMeasureList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.UnitOfMeasureList = DAL.Common.PaginatedList<UnitOfMeasureModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<UnitOfMeasureModel> UnitOfMeasureList { get; set; }
        }
    }

}