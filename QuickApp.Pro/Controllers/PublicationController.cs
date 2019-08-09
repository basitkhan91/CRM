using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
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
        private readonly ApplicationDbContext _context;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        ApplicationDbContext db;

		
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
			try
			{
				if (ModelState.IsValid)
				{
					if (publicationViewModel == null)
						return BadRequest($"{nameof(publicationViewModel)} cannot be null");

					DAL.Models.Publication publicationobject = new DAL.Models.Publication();
					publicationobject.PublicationRecordId = publicationViewModel.PublicationRecordId;
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
					publicationobject.EntryDate = publicationViewModel.EntryDate;
					publicationobject.revisionDate = publicationViewModel.revisionDate;
					publicationobject.nextreviewDate = publicationViewModel.nextreviewDate;
					publicationobject.ASD = publicationViewModel.ASD;
					publicationobject.publishby = publicationViewModel.publishby;
					publicationobject.location = publicationViewModel.location;
					publicationobject.revision = publicationViewModel.revision;
					publicationobject.verifiedby = publicationViewModel.verifiedby;
					publicationobject.verifieddate = publicationViewModel.verifieddate;
					publicationobject.employee = publicationViewModel.employee;
					publicationobject.docpath = publicationViewModel.docpath;
					publicationobject.CreatedDate = DateTime.Now;
					publicationobject.UpdatedDate = DateTime.Now;
					publicationobject.CreatedBy = publicationViewModel.CreatedBy;
					publicationobject.UpdatedBy = publicationViewModel.UpdatedBy;
					_unitOfWork.Publication.Add(publicationobject);
					_unitOfWork.SaveChanges();


					return Ok(publicationobject);
				}

				return Ok(ModelState);
			}
			catch (Exception ex)
			{

				throw;
			}
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

      

        
        [HttpPost("PubPNACMappingPost")]
        public IActionResult InsertPNACMapping([FromBody] PublicationPNACMappingModel PnAcMapping)
        {
		
            if (ModelState.IsValid)
            {
                if (PnAcMapping == null)
                    return BadRequest($"{nameof(PnAcMapping)} cannot be null");

                DAL.Models.PublicationPNACMappingModel pnacbject = new DAL.Models.PublicationPNACMappingModel();
                pnacbject.PublicationId = PnAcMapping.PublicationId;
                pnacbject.PartNumber = PnAcMapping.PartNumber;
                pnacbject.DashNumberId = PnAcMapping.DashNumberId;
                pnacbject.DashNumber = PnAcMapping.DashNumber;
                pnacbject.AircraftTypeId = PnAcMapping.AircraftTypeId;
                pnacbject.AircraftModelId = PnAcMapping.AircraftModelId;
                pnacbject.AircraftModel = PnAcMapping.AircraftModel;
                pnacbject.AircraftType = PnAcMapping.AircraftType;
                pnacbject.MasterCompanyId = PnAcMapping.MasterCompanyId;
                pnacbject.IsActive = PnAcMapping.IsActive;
                pnacbject.CreatedDate = DateTime.Now;
                pnacbject.UpdatedDate = DateTime.Now;
                pnacbject.CreatedBy = PnAcMapping.CreatedBy;
                pnacbject.UpdatedBy = PnAcMapping.UpdatedBy;
                _context.PublicationPNACMappingModel.Add(pnacbject);
                _context.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPost("PubPNATAMappingPost")]
        public IActionResult InsertPNATAMapping([FromBody] PublicationPNATAMappingModel PnAtaMapping)
        {
            if (ModelState.IsValid)
            {
                if (PnAtaMapping == null)
                    return BadRequest($"{nameof(PnAtaMapping)} cannot be null");
                DAL.Models.PublicationPNATAMappingModel pnatabject = new DAL.Models.PublicationPNATAMappingModel();
                pnatabject.PublicationId = PnAtaMapping.PublicationId;
                pnatabject.PartNumber = PnAtaMapping.PartNumber;
                pnatabject.ATAChapterId = PnAtaMapping.ATAChapterId;
                pnatabject.ATAChapterCode = PnAtaMapping.ATAChapterCode;
                pnatabject.ATASubChapterId = PnAtaMapping.ATASubChapterId;
                pnatabject.ATAChapterName = PnAtaMapping.ATAChapterName;
                pnatabject.ATASubChapterDescription = PnAtaMapping.ATASubChapterDescription;
                
                pnatabject.MasterCompanyId = PnAtaMapping.MasterCompanyId;
                pnatabject.IsActive = PnAtaMapping.IsActive;
                pnatabject.CreatedDate = DateTime.Now;
                pnatabject.UpdatedDate = DateTime.Now;
                pnatabject.CreatedBy = PnAtaMapping.CreatedBy;
                pnatabject.UpdatedBy = PnAtaMapping.UpdatedBy;
                _context.PublicationPNATAMappingModel.Add(pnatabject);
                _context.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpGet("GetPubPNMappedData_PNID/{PNIds}")]
        public IActionResult PubPNMappedDetails(string PNIds)
        {

            var result = _unitOfWork.Publication.GetPubPNMappingData(PNIds);
            return Ok(result);

        }


		[HttpPost("PNIMMappingPost")]
		public IActionResult CreatePNIMast([FromBody] PublicationItemMasterMapping[] IMPNMapping)
		{
			try
			{

			
				if (ModelState.IsValid)
				{
					if (IMPNMapping == null)
						return BadRequest($"{nameof(IMPNMapping)} cannot be null");
					for (int i = 0; i <= IMPNMapping.Length - 1; i++)
					{
						

						PublicationItemMasterMapping cp = new PublicationItemMasterMapping();
						cp.ItemMasterId = IMPNMapping[i].ItemMasterId;
						cp.PublicationId = IMPNMapping[i].PublicationId;
						cp.PartNumber = IMPNMapping[i].PartNumber;
						cp.PartNumberDescription = IMPNMapping[i].PartNumberDescription;
						cp.ItemClassification = IMPNMapping[i].ItemClassification;
						cp.ItemClassificationId = IMPNMapping[i].ItemClassificationId;
						cp.ItemGroupId = IMPNMapping[i].ItemGroupId;
						cp.PublicationRecordId = IMPNMapping[i].PublicationRecordId;
						cp.MasterCompanyId = IMPNMapping[i].MasterCompanyId;
						cp.CreatedBy = IMPNMapping[i].CreatedBy;
						cp.UpdatedBy = IMPNMapping[i].UpdatedBy;
						cp.CreatedDate = DateTime.Now;
						cp.UpdatedDate = DateTime.Now;
						cp.IsActive = IMPNMapping[i].IsActive;

						_context.PublicationItemMasterMapping.Add(cp);
						_context.SaveChanges();
					}
				}

				return Ok(ModelState);
				{ }

			}
			catch (Exception ex)
			{
				throw;
			}

		}

	}
}