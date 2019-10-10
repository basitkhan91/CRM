using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
    public class ReasonController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ReasonController(IUnitOfWork unitOfWork, ILogger<ReasonController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ReasonViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Reasons.GetAllReasonData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<ReasonViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Reason", id); //.GetAllCustomersData();


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
        [HttpPost("reason")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ReasonViewModel reasonViewModel)
        {
            if (ModelState.IsValid)
            {
                if (reasonViewModel == null)
                    return BadRequest($"{nameof(reasonViewModel)} cannot be null");

                DAL.Models.Reason reasonobject = new DAL.Models.Reason();
                reasonobject.ReasonForRemoval = reasonViewModel.ReasonForRemoval;
                reasonobject.ReasonCode = reasonViewModel.ReasonCode;
                reasonobject.MasterCompanyId = reasonViewModel.MasterCompanyId;
                reasonobject.Memo = reasonViewModel.Memo;
                reasonobject.IsActive = reasonViewModel.IsActive;
                reasonobject.CreatedDate = DateTime.Now;
                reasonobject.UpdatedDate = DateTime.Now;
                reasonobject.CreatedBy = reasonViewModel.CreatedBy;
                reasonobject.UpdatedBy = reasonViewModel.UpdatedBy;
                _unitOfWork.Reasons.Add(reasonobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("reason/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ReasonViewModel reasonViewModel)
        {

            if (ModelState.IsValid)
            {
                if (reasonViewModel == null)
                    return BadRequest($"{nameof(reasonViewModel)} cannot be null");

                var existingResult = _unitOfWork.Reasons.GetSingleOrDefault(c => c.ReasonId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = reasonViewModel.UpdatedBy;
                existingResult.ReasonForRemoval = reasonViewModel.ReasonForRemoval;
                existingResult.ReasonCode = reasonViewModel.ReasonCode;
                existingResult.Memo = reasonViewModel.Memo;
                existingResult.IsActive = reasonViewModel.IsActive;
                

                _unitOfWork.Reasons.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("reason/{id}")]
        [Produces(typeof(ReasonViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Reasons.GetSingleOrDefault(c => c.ReasonId == id);

            existingResult.IsDelete = true;
            _unitOfWork.Reasons.Update(existingResult);

            //_unitOfWork.Reasons.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }


        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ReasonAudit>()
                .Find(x => x.ReasonId == id)
                .OrderByDescending(x => x.ReasonAuditId);

            var auditResult = new List<AuditResult<ReasonAudit>>();

            auditResult.Add(new AuditResult<ReasonAudit> { AreaName = "Reason", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetAircraftManufacturer([FromBody]ReasonPaginationViewModel paginate)
        {
            GetData getData = new GetData();
            IQueryable<ReasonPaginationViewModel> queryable = null;
            List<ReasonPaginationViewModel> ReasonList = new List<ReasonPaginationViewModel>();
            ReasonPaginationViewModel Reason = null;
            if (!string.IsNullOrEmpty(paginate.ReasonCode)
                || !string.IsNullOrEmpty(paginate.ReasonForRemoval)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var Reasons = _unitOfWork.Reason;
                var Reasons = _unitOfWork.Reasons.GetAllReasonData();
                foreach (var item in Reasons)
                {
                    Reason = new ReasonPaginationViewModel();
                    Reason.ReasonId = item.ReasonId;
                    Reason.ReasonCode = item.ReasonCode;
                    Reason.ReasonForRemoval = item.ReasonForRemoval;
                    Reason.Memo = item.Memo;
                    Reason.CreatedDate = item.CreatedDate;
                    Reason.CreatedBy = item.CreatedBy;
                    Reason.UpdatedDate = item.UpdatedDate;
                    Reason.UpdatedBy = item.UpdatedBy;
                    Reason.IsActive = item.IsActive;
                    ReasonList.Add(Reason);
                }
                
                if (!string.IsNullOrEmpty(paginate.ReasonCode))
                {
                    ReasonList = ReasonList.Where(c => c.ReasonCode != null && c.ReasonCode.ToUpper().Contains(paginate.ReasonCode.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.ReasonForRemoval))
                {
                    ReasonList = ReasonList.Where(c => c.ReasonForRemoval != null && c.ReasonForRemoval.ToUpper().Contains(paginate.ReasonForRemoval.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    ReasonList = ReasonList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }

               
                getData.TotalRecordsCount = ReasonList.Count();
            }
            else
            {
                var Reasons = _unitOfWork.Reasons.GetAllReasonData();
                foreach (var item in Reasons)
                {
                    Reason = new ReasonPaginationViewModel();
                    Reason.ReasonId = item.ReasonId;
                    Reason.ReasonCode = item.ReasonCode;
                    Reason.ReasonForRemoval = item.ReasonForRemoval;
                    Reason.Memo = item.Memo;
                    Reason.CreatedDate = item.CreatedDate;
                    Reason.CreatedBy = item.CreatedBy;
                    Reason.UpdatedDate = item.UpdatedDate;
                    Reason.UpdatedBy = item.UpdatedBy;
                    Reason.IsActive = item.IsActive;
                    ReasonList.Add(Reason);
                    getData.TotalRecordsCount = ReasonList.Count();
                }
            }
            queryable = ReasonList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.ReasonList = DAL.Common.PaginatedList<ReasonPaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<ReasonPaginationViewModel> ReasonList { get; set; }
        }
        #region Individual grids code

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(ReasonModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<ReasonModel> dynamicGridData = new DynamicGridData<ReasonModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<ReasonModel> ReasonList = new List<ReasonModel>();
            ReasonModel Reason = null;
            var Reasons = _unitOfWork.Reasons.GetAllReasonData();
            foreach (var item in Reasons)
            {
                Reason = new ReasonModel();
                Reason.ReasonId = item.ReasonId;
                Reason.ReasonCode = item.ReasonCode;
                Reason.ReasonForRemoval = item.ReasonForRemoval;
                Reason.Memo = item.Memo;
                Reason.CreatedDate = item.CreatedDate;
                Reason.CreatedBy = item.CreatedBy;
                Reason.UpdatedDate = item.UpdatedDate;
                Reason.UpdatedBy = item.UpdatedBy;
               // Reason.IsActive = item.IsActive;
                ReasonList.Add(Reason);
            }
            dynamicGridData.ColumnData = ReasonList;
            return Ok(dynamicGridData);
        }
        #endregion
    }
}




  