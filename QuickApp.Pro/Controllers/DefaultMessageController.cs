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
        public IActionResult GetDefaultMessage([FromBody]PaginateViewModel paginate)
        {
            var pageListPerPage = paginate.rows;
            var pageIndex = paginate.first;
            var pageCount = (pageIndex / pageListPerPage) + 1;
            var data = DAL.Common.PaginatedList<DefaultMessage>.Create(_unitOfWork.DefaultMessage.GetPaginationData(), pageCount, pageListPerPage);
            return Ok(data);
        }

    }




}