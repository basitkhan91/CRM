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
    public class DefaultMessageController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        public DefaultMessageController(IUnitOfWork unitOfWork, ILogger<DefaultMessageController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

       
        [HttpGet("Get")]
        [Produces(typeof(List<DefaultMessageViewModel>))]
        public IActionResult Get()
        {
            var allDefaultMessageInfo = _unitOfWork.DefaultMessage.GetAllDefaultMessageData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<DefaultMessageViewModel>>(allDefaultMessageInfo));

        }


        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("DefaultMessage", id); //.GetAllCustomersData();


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
        [HttpPost("defaultmessage")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] DefaultMessageViewModel defaultMessageViewModel)
        {
            if (ModelState.IsValid)
            {
                if (defaultMessageViewModel == null)
                    return BadRequest($"{nameof(defaultMessageViewModel)} cannot be null");

                DAL.Models.DefaultMessage defaultMessageobject = new DAL.Models.DefaultMessage();
                defaultMessageobject.DefaultMessageCode = defaultMessageViewModel.DefaultMessageCode;
                defaultMessageobject.Description = defaultMessageViewModel.Description;
                
                defaultMessageobject.Memo = defaultMessageViewModel.Memo;
                defaultMessageobject.MasterCompanyId = defaultMessageViewModel.MasterCompanyId;
                defaultMessageobject.IsActive = defaultMessageViewModel.IsActive;
                defaultMessageobject.CreatedDate = DateTime.Now;
                defaultMessageobject.UpdatedDate = DateTime.Now;
                defaultMessageobject.CreatedBy = defaultMessageViewModel.CreatedBy;
                defaultMessageobject.UpdatedBy = defaultMessageViewModel.UpdatedBy;
                _unitOfWork.DefaultMessage.Add(defaultMessageobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("defaultmessage/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] DefaultMessageViewModel defaultMessageViewModel)
        {

            if (ModelState.IsValid)
            {
                if (defaultMessageViewModel == null)
                    return BadRequest($"{nameof(defaultMessageViewModel)} cannot be null");

                var existingResult = _unitOfWork.DefaultMessage.GetSingleOrDefault(c => c.DefaultMessageId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = defaultMessageViewModel.UpdatedBy;
                existingResult.DefaultMessageCode = defaultMessageViewModel.DefaultMessageCode;
                existingResult.Description = defaultMessageViewModel.Description;
                existingResult.Memo = defaultMessageViewModel.Memo;
                existingResult.IsActive = defaultMessageViewModel.IsActive;
                existingResult.MasterCompanyId = defaultMessageViewModel.MasterCompanyId;

                _unitOfWork.DefaultMessage.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("defaultmessage/{id}")]
        [Produces(typeof(DefaultMessageViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.DefaultMessage.GetSingleOrDefault(c => c.DefaultMessageId == id);


            existingResult.IsDelete = true;
            _unitOfWork.DefaultMessage.Update(existingResult);

            //_unitOfWork.DefaultMessage.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<DefaultMessageAudit>()
                .Find(x => x.DefaultMessageId == id)
                .OrderByDescending(x => x.DefaultMessageAuditId);

            var auditResult = new List<AuditResult<DefaultMessageAudit>>();

            auditResult.Add(new AuditResult<DefaultMessageAudit> { AreaName = "Default Message", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetDefaultMessage([FromBody]DefaultMessagePaginationViewModel paginate)
        {
            IQueryable<DefaultMessagePaginationViewModel> queryable = null;
            List<DefaultMessagePaginationViewModel> defaultMessageList = new List<DefaultMessagePaginationViewModel>();
            DefaultMessagePaginationViewModel defaultMessage = null;
            if (!string.IsNullOrEmpty(paginate.DefaultMessageCode)
                || !string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var defaultMessages = _unitOfWork.defaultMessage;
                var defaultMessages = _unitOfWork.DefaultMessage.GetAllDefaultMessageData();
                foreach (var item in defaultMessages)
                {
                    defaultMessage = new DefaultMessagePaginationViewModel();
                    defaultMessage.DefaultMessageId = item.DefaultMessageId;
                    defaultMessage.Description = item.Description;
                    defaultMessage.DefaultMessageCode = item.DefaultMessageCode;
                    defaultMessage.Memo = item.Memo;
                    defaultMessage.CreatedDate = item.CreatedDate;
                    defaultMessage.CreatedBy = item.CreatedBy;
                    defaultMessage.UpdatedDate = item.UpdatedDate;
                    defaultMessage.UpdatedBy = item.UpdatedBy;
                    defaultMessage.IsActive = item.IsActive;
                    defaultMessageList.Add(defaultMessage);
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    defaultMessageList = defaultMessageList.Where(c => c.Description != null && c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.DefaultMessageCode))
                {
                    defaultMessageList = defaultMessageList.Where(c => c.DefaultMessageCode != null && c.DefaultMessageCode.ToUpper().Contains(paginate.DefaultMessageCode.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    defaultMessageList = defaultMessageList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }

                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    defaultMessageList = defaultMessageList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    defaultMessageList = defaultMessageList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
            }
            else
            {
                var defaultMessages = _unitOfWork.DefaultMessage.GetAllDefaultMessageData();
                foreach (var item in defaultMessages)
                {
                    defaultMessage = new DefaultMessagePaginationViewModel();
                    defaultMessage.DefaultMessageId = item.DefaultMessageId;
                    defaultMessage.Description = item.Description;
                    defaultMessage.DefaultMessageCode = item.DefaultMessageCode;
                    defaultMessage.Memo = item.Memo;
                    defaultMessage.CreatedDate = item.CreatedDate;
                    defaultMessage.CreatedBy = item.CreatedBy;
                    defaultMessage.UpdatedDate = item.UpdatedDate;
                    defaultMessage.UpdatedBy = item.UpdatedBy;
                    defaultMessage.IsActive = item.IsActive;
                    defaultMessageList.Add(defaultMessage);
                }
                defaultMessageList.Add(defaultMessage);

            }
            queryable = defaultMessageList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                var data = DAL.Common.PaginatedList<DefaultMessagePaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(data);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

    }




}