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

                throw;
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
                //actionattributeobject.Memo = actionAttributeViewModel.Memo;
                actionattributeobject.Customer = actionAttributeViewModel.Customer;
                actionattributeobject.ItemMaster = actionAttributeViewModel.ItemMaster;
                actionattributeobject.PurchaseOrder = actionAttributeViewModel.PurchaseOrder;
                actionattributeobject.RepairOrder = actionAttributeViewModel.RepairOrder;
                actionattributeobject.SL = actionAttributeViewModel.SL;
                actionattributeobject.SalesOrder = actionAttributeViewModel.SalesOrder;
                actionattributeobject.WorkOrder = actionAttributeViewModel.WorkOrder;
                actionattributeobject.Vendor = actionAttributeViewModel.Vendor;
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
                existingResult.Customer = actionAttributeViewModel.Customer;

                //existingResult.Memo = actionAttributeViewModel.Memo;
                existingResult.ItemMaster = actionAttributeViewModel.ItemMaster;
                existingResult.PurchaseOrder = actionAttributeViewModel.PurchaseOrder;
                existingResult.RepairOrder = actionAttributeViewModel.RepairOrder;
                existingResult.SL = actionAttributeViewModel.SL;
                existingResult.SalesOrder = actionAttributeViewModel.SalesOrder;
                existingResult.WorkOrder = actionAttributeViewModel.WorkOrder;
                existingResult.Vendor = actionAttributeViewModel.Vendor;
                existingResult.SalesOrder = actionAttributeViewModel.SalesOrder;
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
            existingResult.IsDelete = true;
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
        public IActionResult GetDocumentRecords([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = (pageIndex / pageListPerPage) + 1;
            var data = DAL.Common.PaginatedList<Document>.Create(_unitOfWork.Document.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }
    }
}