using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class GlCashFlowClassificationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public GlCashFlowClassificationController(ApplicationDbContext context, IUnitOfWork unitOfWork, ILogger<GlCashFlowClassificationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
            _context = context;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<GlCashFlowClassificationViewModel>))]
        public IActionResult Get()
        {
            try
            {
                var allcashflows = _context.GlClassFlowClassification.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.GlClassFlowClassificationId).ToList();
                return Ok(allcashflows);
            }
            catch (Exception ex)
            {

            }
            return null;

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("GlClassFlowClassification", id);

            try
            {
                var resul1 = Mapper.Map<IEnumerable<GlCashFlowClassificationViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("glcashflowpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] GlCashFlowClassificationViewModel GlCashFlowClassificationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (GlCashFlowClassificationViewModel == null)
                    return BadRequest($"{nameof(GlCashFlowClassificationViewModel)} cannot be null");

                DAL.Models.GlClassFlowClassification glclassflowobject = new DAL.Models.GlClassFlowClassification();
                glclassflowobject.GlClassFlowClassificationId = GlCashFlowClassificationViewModel.GlClassFlowClassificationId;
                glclassflowobject.GLCID = GlCashFlowClassificationViewModel.GLCID;
                glclassflowobject.GLClassFlowClassificationName = GlCashFlowClassificationViewModel.GLClassFlowClassificationName;
                glclassflowobject.MasterCompanyId = GlCashFlowClassificationViewModel.MasterCompanyId;
                glclassflowobject.IsActive = GlCashFlowClassificationViewModel.IsActive;
                glclassflowobject.CreatedDate = DateTime.Now;
                glclassflowobject.UpdatedDate = DateTime.Now;
                glclassflowobject.CreatedBy = GlCashFlowClassificationViewModel.CreatedBy;
                glclassflowobject.UpdatedBy = GlCashFlowClassificationViewModel.UpdatedBy;
                _unitOfWork.GlClassFlowsClassification.Add(glclassflowobject);
                _unitOfWork.SaveChanges();
                return Ok(glclassflowobject);
            }

            return Ok(ModelState);
        }
        [HttpPut("glcashflowpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] GlCashFlowClassificationViewModel GlCashFlowClassificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (GlCashFlowClassificationViewModel == null)
                    return BadRequest($"{nameof(GlCashFlowClassificationViewModel)} cannot be null");

                var existingResult = _unitOfWork.GlClassFlowsClassification.GetSingleOrDefault(c => c.GlClassFlowClassificationId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = GlCashFlowClassificationViewModel.UpdatedBy;
                existingResult.GlClassFlowClassificationId = GlCashFlowClassificationViewModel.GlClassFlowClassificationId;
                existingResult.GLCID = GlCashFlowClassificationViewModel.GLCID;
                existingResult.GLClassFlowClassificationName = GlCashFlowClassificationViewModel.GLClassFlowClassificationName;
                existingResult.IsActive = GlCashFlowClassificationViewModel.IsActive;
                existingResult.MasterCompanyId = GlCashFlowClassificationViewModel.MasterCompanyId;

                _unitOfWork.GlClassFlowsClassification.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("glcashflowpost/{id}")]
        [Produces(typeof(GlCashFlowClassificationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.GlClassFlowClassification.GetSingleOrDefault(c => c.GlClassFlowClassificationId == id);
            existingResult.IsDelete = true;
            _unitOfWork.GlClassFlowsClassification.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult GetGLCashFlowClassificationAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<GlClassFlowClassificationAudit>()
                 .Find(x => x.GlClassFlowClassificationId == Id)
                 .OrderByDescending(x => x.GlClassFlowClassificationAuditId).ToList();

            var auditResult = new List<AuditResult<GlClassFlowClassificationAudit>>();
            auditResult.Add(new AuditResult<GlClassFlowClassificationAudit>
            {
                AreaName = "GL Cash Flow Classification",
                Memo = "",
                Result = audits
            });
            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetGlCashFlowClassification([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = (pageIndex / pageListPerPage) + 1;
            var data = DAL.Common.PaginatedList<GlClassFlowClassification>.Create(_unitOfWork.GlClassFlowClassification.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }

        [HttpPost("pagination")]
        public IActionResult GetGlCashFlowClassification([FromBody]GlClassFlowClassificationPaginationViewModel paginate)
        {
            IQueryable<GlClassFlowClassificationPaginationViewModel> queryable = null;
            List<GlClassFlowClassificationPaginationViewModel> glClasssFlowClassificationList = new List<GlClassFlowClassificationPaginationViewModel>();
            GlClassFlowClassificationPaginationViewModel glClasssFlowClassification = null;
            if (!string.IsNullOrEmpty(paginate.GLClassFlowClassificationName)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var glClasssFlowClassifications = _unitOfWork.glClasssFlowClassification;
                var glClasssFlowClassifications = _context.GlClassFlowClassification.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.GlClassFlowClassificationId).ToList();
                foreach (var item in glClasssFlowClassifications)
                {
                    glClasssFlowClassification = new GlClassFlowClassificationPaginationViewModel();
                    glClasssFlowClassification.GlClassFlowClassificationId = item.GlClassFlowClassificationId;
                    glClasssFlowClassification.GLClassFlowClassificationName = item.GLClassFlowClassificationName;
                    glClasssFlowClassification.GLCID = item.GLCID;
                    glClasssFlowClassification.CreatedDate = item.CreatedDate;
                    glClasssFlowClassification.CreatedBy = item.CreatedBy;
                    glClasssFlowClassification.UpdatedDate = item.UpdatedDate;
                    glClasssFlowClassification.UpdatedBy = item.UpdatedBy;
                    glClasssFlowClassification.IsActive = item.IsActive;
                    glClasssFlowClassificationList.Add(glClasssFlowClassification);
                }
                if (!string.IsNullOrEmpty(paginate.GLClassFlowClassificationName))
                {
                    glClasssFlowClassificationList = glClasssFlowClassificationList.Where(c => c.GLClassFlowClassificationName != null && c.GLClassFlowClassificationName.ToUpper().Contains(paginate.GLClassFlowClassificationName.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    glClasssFlowClassificationList = glClasssFlowClassificationList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    glClasssFlowClassificationList = glClasssFlowClassificationList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
            }
            else
            {
                var glClasssFlowClassifications = _context.GlClassFlowClassification.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.GlClassFlowClassificationId).ToList();
                foreach (var item in glClasssFlowClassifications)
                {
                    glClasssFlowClassification = new GlClassFlowClassificationPaginationViewModel();
                    glClasssFlowClassification.GlClassFlowClassificationId = item.GlClassFlowClassificationId;
                    glClasssFlowClassification.GLClassFlowClassificationName = item.GLClassFlowClassificationName;
                    glClasssFlowClassification.GLCID = item.GLCID;
                    glClasssFlowClassification.CreatedDate = item.CreatedDate;
                    glClasssFlowClassification.CreatedBy = item.CreatedBy;
                    glClasssFlowClassification.UpdatedDate = item.UpdatedDate;
                    glClasssFlowClassification.UpdatedBy = item.UpdatedBy;
                    glClasssFlowClassification.IsActive = item.IsActive;
                    glClasssFlowClassificationList.Add(glClasssFlowClassification);
                }
            }
            queryable = glClasssFlowClassificationList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                var data = DAL.Common.PaginatedList<GlClassFlowClassificationPaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(data);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }
    }
}


