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
    public class PublicationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public PublicationController(IUnitOfWork unitOfWork, ILogger<PublicationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<PublicationViewModel>))]
        public IActionResult Get()
        {
            var allpublicationinfo = _unitOfWork.Publication.GetPublications(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<PublicationViewModel>>(allpublicationinfo));

        }


        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Publication", id); //.GetAllCustomersData();


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
        [HttpPost("publicationpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] PublicationViewModel publicationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (publicationViewModel == null)
                    return BadRequest($"{nameof(publicationViewModel)} cannot be null");

                DAL.Models.Publication publicationobject = new DAL.Models.Publication();
                publicationobject.PublicationId = publicationViewModel.PublicationId;
                publicationobject.Description = publicationViewModel.Description;
                publicationobject.PartNumber = publicationViewModel.PartNumber;
                publicationobject.Memo = publicationViewModel.Memo;
                publicationobject.Platform = publicationViewModel.Platform;
                publicationobject.Model = publicationViewModel.Model;
                publicationobject.Description = publicationViewModel.Description;
                publicationobject.ATAMain = publicationViewModel.ATAMain;
                publicationobject.ATASubChapter = publicationViewModel.ATASubChapter;
                publicationobject.ATAPositionZone = publicationViewModel.ATAPositionZone;
                publicationobject.MasterCompanyId = publicationViewModel.MasterCompanyId;
                publicationobject.IsActive = publicationViewModel.IsActive;
                publicationobject.CreatedDate = DateTime.Now;
                publicationobject.UpdatedDate = DateTime.Now;
                publicationobject.CreatedBy = publicationViewModel.CreatedBy;
                publicationobject.UpdatedBy = publicationViewModel.UpdatedBy;
                _unitOfWork.Publication.Add(publicationobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("publicationpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] PublicationViewModel publicationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (publicationViewModel == null)
                    return BadRequest($"{nameof(publicationViewModel)} cannot be null");
                var existingResult = _unitOfWork.Publication.GetSingleOrDefault(c => c.PublicationRecordId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = publicationViewModel.UpdatedBy;
                existingResult.PublicationId = publicationViewModel.PublicationId;
                existingResult.Description = publicationViewModel.Description;
                existingResult.PartNumber = publicationViewModel.PartNumber;
                existingResult.Platform = publicationViewModel.Platform;
                existingResult.Memo = publicationViewModel.Memo;
                existingResult.Model = publicationViewModel.Model;
                existingResult.Description = publicationViewModel.Description;
                existingResult.ATAMain = publicationViewModel.ATAMain;
                existingResult.ATASubChapter = publicationViewModel.ATASubChapter;
                existingResult.ATAPositionZone = publicationViewModel.ATAPositionZone;
                existingResult.MasterCompanyId = publicationViewModel.MasterCompanyId;
                existingResult.IsActive = publicationViewModel.IsActive;
                existingResult.MasterCompanyId = publicationViewModel.MasterCompanyId;
                _unitOfWork.Publication.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("publicationpost/{id}")]
        [Produces(typeof(PublicationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Publication.GetSingleOrDefault(c => c.PublicationRecordId == id);

            existingResult.IsDelete = true;
            _unitOfWork.Publication.Update(existingResult);
            //_unitOfWork.Publication.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<PublicationAudit>()
                .Find(x => x.PublicationRecordId == id)
                .OrderByDescending(x => x.PublicationAuditId);

            var auditResult = new List<AuditResult<PublicationAudit>>();

            auditResult.Add(new AuditResult<PublicationAudit> { AreaName = "Publication", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }
}