using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class DocumentController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public DocumentController(IUnitOfWork unitOfWork, ILogger<DocumentController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<DocumentViewModel>))]
        public IActionResult Get()
        {
            var allActionattributes = _unitOfWork.Document.GetDocuments(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<DocumentViewModel>>(allActionattributes));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHistory(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Document", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<DocumentViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }

        [HttpPost("documentpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] DocumentViewModel actionAttributeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (actionAttributeViewModel == null)
                    return BadRequest($"{nameof(actionAttributeViewModel)} cannot be null");

                DAL.Models.Document actionattributeobject = new DAL.Models.Document();
                actionattributeobject.DocumentCode = actionAttributeViewModel.DocumentCode;
                actionattributeobject.Description = actionAttributeViewModel.Description;
                actionattributeobject.Memo = actionAttributeViewModel.Memo;
                actionattributeobject.Link = actionAttributeViewModel.Link;
                actionattributeobject.MasterCompanyId = actionAttributeViewModel.MasterCompanyId;
                actionattributeobject.IsActive = actionAttributeViewModel.IsActive;
                actionattributeobject.CreatedDate = DateTime.Now;
                actionattributeobject.UpdatedDate = DateTime.Now;
                actionattributeobject.CreatedBy = actionAttributeViewModel.CreatedBy;
                actionattributeobject.UpdatedBy = actionAttributeViewModel.UpdatedBy;
                _unitOfWork.Document.Add(actionattributeobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("documentpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] DocumentViewModel actionAttributeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (actionAttributeViewModel == null)
                    return BadRequest($"{nameof(actionAttributeViewModel)} cannot be null");

                var existingResult = _unitOfWork.Document.GetSingleOrDefault(c => c.DocumentId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = actionAttributeViewModel.UpdatedBy;
                existingResult.DocumentCode = actionAttributeViewModel.DocumentCode;
                existingResult.Description = actionAttributeViewModel.Description;

                existingResult.Memo = actionAttributeViewModel.Memo;
                existingResult.Link = actionAttributeViewModel.Link;
                existingResult.IsActive = actionAttributeViewModel.IsActive;
                existingResult.MasterCompanyId = actionAttributeViewModel.MasterCompanyId;

                _unitOfWork.Document.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("documentpost/{id}")]
        [Produces(typeof(DocumentViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Document.GetSingleOrDefault(c => c.DocumentId == id);
            existingResult.IsDeleted = true;
            _unitOfWork.Document.Update(existingResult);

            //_unitOfWork.Document.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<DocumentAudit>()
                .Find(x => x.DocumentId == id)
                .OrderByDescending(x => x.DocumentAuditId);

            var auditResult = new List<AuditResult<DocumentAudit>>();

            auditResult.Add(new AuditResult<DocumentAudit> { AreaName = "Document", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetDocumentRecords([FromBody]DocumentPaginationViewModel paginate)
        {
            IQueryable<DocumentPaginationViewModel> queryable = null;
            List<DocumentPaginationViewModel> documentList = new List<DocumentPaginationViewModel>();
            DocumentPaginationViewModel document = null;
            if (!string.IsNullOrEmpty(paginate.DocumentCode)
                || !string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var documents = _unitOfWork.document;
                var documents = _unitOfWork.Document.GetDocuments();
                foreach (var item in documents)
                {
                    document = new DocumentPaginationViewModel();
                    document.DocumentId = item.DocumentId;
                    document.DocumentCode = item.DocumentCode;
                    document.Description = item.Description;
                    document.CreatedDate = item.CreatedDate;
                    document.CreatedBy = item.CreatedBy;
                    document.UpdatedDate = item.UpdatedDate;
                    document.UpdatedBy = item.UpdatedBy;
                    document.IsActive = item.IsActive;
                    document.Memo = item.Memo;
                    document.Link = item.Link;
                    documentList.Add(document);
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    documentList = documentList.Where(c => c.Description != null && c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.DocumentCode))
                {
                    documentList = documentList.Where(c => c.DocumentCode != null && c.DocumentCode.ToUpper().Contains(paginate.DocumentCode.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    documentList = documentList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    documentList = documentList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
            }
            else
            {
                var documents = _unitOfWork.Document.GetDocuments();
                foreach (var item in documents)
                {
                    document = new DocumentPaginationViewModel();
                    document.DocumentId = item.DocumentId;
                    document.DocumentCode = item.DocumentCode;
                    document.Description = item.Description;
                    document.CreatedDate = item.CreatedDate;
                    document.CreatedBy = item.CreatedBy;
                    document.UpdatedDate = item.UpdatedDate;
                    document.UpdatedBy = item.UpdatedBy;
                    document.IsActive = item.IsActive;
                    document.Memo = item.Memo;
                    document.Link = item.Link;
                    documentList.Add(document);
                }
                documentList.Add(document);

            }
            queryable = documentList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                var data = DAL.Common.PaginatedList<DocumentPaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(data);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }
    }
}